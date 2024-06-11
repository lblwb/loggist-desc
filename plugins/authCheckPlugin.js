import {useAuthStore} from "~/stores/auth/index";

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();

    // authStore.checkInitialAuth();

    const intervalId = setInterval(async () => {
        try {
            await authStore.fetchUserData();
        } catch (error) {
            authStore.logoutUser();
            clearInterval(intervalId);
            const router = useRouter();
            router.push('/login');
        }
    }, 10000);
});