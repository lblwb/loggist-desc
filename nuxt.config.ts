// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    app: {
        head: {
            title: "Decs—Logistics",
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    devtools: {
        enabled: true,
        timeline: {
            enabled: true
        }
    },
    runtimeConfig: {
        public: {
            baseURL: "http://127.0.0.1:8000",
        },
        app: {
            baseURL: "/"
        },
    },
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    ['defineStore', 'definePiniaStore'],
                ],
            },
        ],
        // '@nuxtjs/axios',
        //'@nuxt/image',
        '@sidebase/nuxt-auth',

    ],
    plugins: [
        "~/plugins/fetchApi.js",
        "~/plugins/authCheckPlugin.js"
    ],
    mode: 'universal',
    target: 'static',
    ssr: false,
    spaLoadingTemplate: true,

    nitro: {
        static: true,
    },

    //
    image: {
        // Options
    },

    auth: {
        isEnabled: true,
        baseURL: process.env.AUTH_ORIGIN,
        provider: {
            type: 'local'
        },
        pages: {
            login: "auth-login",
        },
        endpoints: {
            signIn: {path: '/api/login', method: 'post'},
            signOut: {path: '/api/logout', method: 'post'},
            signUp: {path: '/api/register', method: 'post'},
            getSession: {path: '/api/session', method: 'get'}
        },
        token: {
            signInResponseTokenPointer: "/",
            type: "Bearer",
            cookieName: "tkn",
            headerName: "tkn",
            // maxAgeInSeconds: number,
            // sameSiteAttribute: string,
        },
        globalAppMiddleware: {
            isEnabled: false
        }
    },
    // components: {
    //     Cursor: '~/components/Common/Cursor.vue', // Adjust the path if needed
    // },
})