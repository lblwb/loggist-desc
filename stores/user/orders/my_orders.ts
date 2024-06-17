// @ts-ignore
import {defineStore} from 'pinia';
import {useAuthStore} from "~/stores/auth";


interface DeliveryOrders {
    idx: string;
    cargo_type: string;
    cargo_inf_to: string;
    cargo_inf_from: string;
    cargo_inf_size: string;
    cargo_inf_wht: string;
    cargo_deliv_start_at: Date | null;
    cargo_deliv_end_at: Date | null;
    status: string;
    description: string;
    client: {
        username: string;
    };
    courier: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}

interface DeliveryOrdersData {
    orders: DeliveryOrders[];
    success: boolean;
}

interface DeliveryOrdersData {
    order: DeliveryOrders;
    success: boolean;
}

export const useUserMyOrders = defineStore('user_my_orders', {
    state: () => ({
        user: {
            my_orders: {
                data: [] as DeliveryOrders[],
                count: 0
            }
        }
    }),

    actions: {
        async fetchMyUserOrders() {
            try {
                const auth = useAuthStore();
                const auth_token = await auth.getToken;
                // @ts-ignore
                const {orders} = await useNuxtApp()
                    .$api<DeliveryOrdersData[]>('/api/orders/by_user', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${auth_token}`
                        }
                    })
                //
                // console.log(products);
                // @ts-ignore
                this.user.my_orders.data = orders;
                return orders;
            } catch (e) {
                console.error('Error fetching User ->  My Orders:', e);
                return [];
            }
        },
    },
    getters: {
        /**
         * Get Count Cart Elements
         */
        // GetAllPrdCount(state: any): number {
        //     console.log(state.products.all.data);
        //     // @ts-ignore
        //     return state.products !== null && state.products.all !== null && state.products.all.data !== null ? (state.products.all.data).length : 0;
        // },
        async GetMyOrdersItems(state: any): Promise<Array<any>> {
            // @ts-ignore
            return state.user.my_orders.data !== null ? state.user.my_orders.data : [];
        },
    }
})