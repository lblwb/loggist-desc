import {defineStore} from 'pinia';

const tokenCookieJwt = useCookie('__token');

interface UserData {
    username: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
    state: () => {
        // @ts-ignore
        return {
            signInStatus: false,
            access_token: null as string | null,
            userData: null,
        };
    },
    getters: {
        getBaseUrlApi(): string {
            const config = useRuntimeConfig();
            return config.public.baseURL;
        },
        async GetUserData(): Promise<any> {
            return this.userData ? this.userData : null;
        },
        checkAuthUser(state): boolean {
            return !!state.access_token;
        }
    },
    actions: {
        setLocStorageToken(tokenValue: string): void {
            localStorage.setItem('jwt', tokenValue);
        },
        clearLocStorageToken(): void {
            localStorage.removeItem('jwt');
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

                // @ts-ignore
                const responseToken = response.access;

                if (responseToken) {
                    this.signInStatus = true;
                    this.setToken(responseToken);
                    //
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
        },

        /**
         * Check User Auth
         */
        checkInitialAuth() {
            const token = this.checkAuthUser;
            if (token) {
                this.setStoreToken(token);
                this.signInStatus = true;
            } else {
                const router = useRouter();
                router.push({name: 'auth-login'});
            }
        },
        /**
         * Fetch User Data
         */
        async fetchUserData() {
            try {
                const response = await $fetch('/api/user/data', {
                    method: 'GET',
                    baseURL: this.getBaseUrlApi,
                    headers: {
                        Authorization: `Bearer ${this.access_token}`
                    }
                });
                // @ts-ignore
                this.userData = response.user;
                return response;
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                throw error;
            }
        }
    }
});
