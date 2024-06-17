import {defineStore} from 'pinia';
// @ts-ignore
import {useCookie} from '#app';

//STORE KEY
const TOKEN_KEY = '__token'; // Define the token key constant


//
const tokenCookieJwt = useCookie(TOKEN_KEY);

interface UserData {
    username: string;
    password: string;
}

interface AuthState {
    access_token: string | null;
    signInStatus: boolean;
    userData: any | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        access_token: null,
        signInStatus: false,
        userData: null,
    }),
    getters: {
        getBaseUrlApi(): string {
            const config = useRuntimeConfig();
            return config.public.baseURL;
        },
        getUserData(state: AuthState) {
            console.log(state.userData);
            return state.userData ? state.userData : null;
        },
        getToken(state: AuthState) {
            return state.access_token;
        },
        checkAuthUser(state: AuthState): boolean {
            return !!state.access_token;
        }
    },
    actions: {
        setLocStorageToken(tokenValue: string): void {
            localStorage.setItem(TOKEN_KEY, tokenValue); // Use the constant
        },
        clearLocStorageToken(): void {
            localStorage.removeItem(TOKEN_KEY); // Use the constant
        },
        setCookieStorageToken(tokenValue: string): void {
            tokenCookieJwt.value = tokenValue;
        },
        clearCookieStorageToken(): void {
            tokenCookieJwt.value = '';
        },
        setStoreToken(tokenValue: string): void {
            this.access_token = tokenValue;
        },
        clearStoreToken(): void {
            this.access_token = null;
        },
        setToken(tokenValue: string): string {
            this.setLocStorageToken(tokenValue);
            this.setCookieStorageToken(tokenValue);
            this.setStoreToken(tokenValue);
            return tokenValue;
        },

        async authUser(userData: UserData): Promise<any> {
            try {
                const response = await $fetch('/api/token/', {
                    method: 'POST',
                    baseURL: this.getBaseUrlApi,
                    body: {
                        ...userData,
                        returnSecureToken: true
                    }
                });

                const responseToken = response.access;

                if (responseToken) {
                    this.signInStatus = true;
                    this.setToken(responseToken);
                    await this.fetchUserData();
                    return response;
                } else {
                    return response;
                }
            } catch (error) {
                this.signInStatus = false;
                console.error(error);
                throw error;
            }
        },

        logoutUser(): void {
            this.clearLocStorageToken();
            this.clearCookieStorageToken();
            this.clearStoreToken();
            this.userData = null;
            this.signInStatus = false;
        },

        checkInitialAuth(): void {
            const token = localStorage.getItem(TOKEN_KEY) || tokenCookieJwt.value; // Use the constant
            if (token) {
                this.setStoreToken(token);
                this.signInStatus = true;
                this.fetchUserData().catch((error) => {
                    console.error('Failed to fetch user data:', error);
                    this.logoutUser();
                });
            } else {
                const router = useRouter();
                router.push({name: 'auth-login'});
            }
        },

        async fetchUserData() {
            try {
                const response = await $fetch('/api/user/data', {
                    method: 'GET',
                    baseURL: this.getBaseUrlApi,
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });

                this.userData = response.user;
                this.signInStatus = true;
                return response;
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                throw error;
            }
        }
    }
});
