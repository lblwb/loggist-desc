// stores/shop/products/index.ts

// @ts-ignore
import {defineStore} from 'pinia';


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

export const useDeliveryOrders = defineStore('delivery_offers', {
    state: () => ({
        orders: {
            pending: {
                data: [] as DeliveryOrders[],
                count: 0
            },

            single: {
                data: {} as DeliveryOrders
            }
            // count: 0
        }
    }),

    actions: {
        async fetchPendingOrders(payload: { params: any } = {
            params: {destination: null, date: null, min_amount: 0, max_amount: 0}
        }) {
            try {

                let req_params = {
                    date: null,
                    destination: null
                }

                // alert(payload.params.date)

                if (payload.params.destination !== null) {
                    req_params.destination = payload.params.destination;
                }


                if (payload.params.date !== null) {
                    req_params.date = payload.params.date;
                }

                if (payload.params.date !== null) {
                    req_params.date = payload.params.date;
                }

                // @ts-ignore
                const {orders} = await useNuxtApp()
                    .$api<DeliveryOrdersData[]>('/api/orders/search/pendings', {
                        params: req_params
                    })
                //
                // console.log(products);
                // @ts-ignore
                this.orders.pending.data = orders;
                return orders;
            } catch (e) {
                console.error('Error fetching Offers:', e);
                return [];
            }
        },
        async fetchOrderBySlug(slugName: string) {
            try {
                // @ts-ignore
                const {order} = await useNuxtApp()
                    .$api<DeliveryOrdersData[]>(`/api/orders/show/${slugName}`)
                //
                // @ts-ignore
                this.orders.single.data = order;
                return order;
            } catch (e) {
                console.error('Error fetching single offer:', e);
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
        async GetPendingOrdersItems(state: any): Promise<Array<any>> {
            // @ts-ignore
            return state.orders !== null && state.orders.pending.data !== null ? state.orders.pending.data : [];
        },

        async GetOrderSingleItem(state: any): Promise<any> {
            return state.orders && state.orders.single !== null && state.orders.single.data !== null ? state.orders.single.data : null;
        }
    }
})