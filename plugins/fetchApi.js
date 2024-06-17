// @ts-ignore
// export const useMyFetch = (request, opts) => {
//     const config = useRuntimeConfig();
//     console.log(config.public.baseURL);
//     return useFetch(request, { baseURL: config.public.baseURL, ...opts })
// }

export default defineNuxtPlugin(() => {
    // const { session } = useUserSession()
    const config = useRuntimeConfig();
    const $api = $fetch.create({
        baseURL: config.public.baseURL,
        onRequest({request, options, error}) {
            // if (session.value?.token) {
            //     // Add Authorization header
            //     options.headers = options.headers || {}
            //     options.headers.Authorization = `Bearer ${session.value?.token}`
            // }
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