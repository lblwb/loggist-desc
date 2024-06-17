import { useAuthStore } from "~/stores/auth/index";
import * as notivue from "notivue";

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    const router = useRouter();
    authStore.checkInitialAuth();

    // Fetch user data immediately after checking initial auth state
    authStore.fetchUserData().catch((error) => {
        authStore.logoutUser();
        notivue.push.warning({
            title: "Аккаунт",
            message: "Произведен выход",
            duration: 2000,
        });
        router.push({ name: 'index' });
    });

    const intervalId = setInterval(async () => {
        try {
            await authStore.fetchUserData();
        } catch (error) {
            authStore.logoutUser();
            notivue.push.warning({
                title: "Аккаунт",
                message: "Сессия не актуальна!",
                duration: 2000,
            });
            clearInterval(intervalId);
            router.push({ name: 'index' });
        }
    }, 25000);
});
