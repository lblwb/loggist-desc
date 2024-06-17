// middleware/auth.js

import {useAuthStore} from '~/stores/auth';
import * as notivue from "notivue";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    // Initial authentication check
    authStore.checkInitialAuth();

    // If the user is not authenticated
    if (authStore.checkAuthUser) {
        const token = authStore.getToken;

        // If there is no token, navigate to login page
        if (!token) {
            return navigateTo({name: 'index'});
        }

        // Attempt to fetch user data
        try {
            await authStore.fetchUserData();
        } catch (error) {
            // On error, logout user and navigate to login page
            authStore.logoutUser();
            notivue.push.warning({
                title: "Аккаунт",
                message: "Успешный выход",
                duration: 2000,
            });
            return navigateTo({name: 'index'});
        }
    } else {
        // If user is authenticated but session has expired, logout and notify
        authStore.logoutUser();
        notivue.push.warning({
            title: "Аккаунт",
            message: "Сессия истекла",
            duration: 2000,
        });
        return navigateTo({name: 'index'});
    }
});
