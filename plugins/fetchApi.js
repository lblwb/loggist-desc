import {useAuthStore} from "~/stores/auth/index";


export default defineNuxtPlugin((nuxtApp) => {
    // const { session } = useUserSession()
    const authStore = useAuthStore(nuxtApp.$pinia);
    const config = useRuntimeConfig();
    const $api = $fetch.create({
        baseURL: config.public.baseURL,
        onRequest({request, options, error}) {
            if (authStore.checkAuthUser) {
                // Add Authorization header
                options.headers = options.headers || {}
                options.headers.Authorization = `Bearer ${authStore.getToken}`
            }
        },
        onResponseError({response}) {
            if (response.status === 401) {
                return navigateTo({name: 'index'})
            }
        }
    })
    // Expose to useNuxtApp().$api
    return {
        provide: {
            api: $api
        }
    }
})