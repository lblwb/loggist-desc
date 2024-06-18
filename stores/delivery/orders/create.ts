// stores/shop/products/index.ts

// @ts-ignore
import {defineStore} from 'pinia';
import * as notivue from "notivue";


interface NewOrderFormData {
    cityFrom: { value: string | null };
    cityTo: { value: string | null };
    weight: { value: number | null };
    size: { value: number | null };
    textMsg: { value: String | null }
}

export const useNewDelvOrderStore = defineStore('new_delivery_order', {
    state: () => ({
        new_order: {
            form: <NewOrderFormData>{
                cityFrom: {
                    value: null
                },
                cityTo: {
                    value: null
                },
                weight: {
                    value: null
                },
                size: {
                    value: null
                },
                textMsg: {
                    value: ""
                }
            },
            // count: 0
        }
    }),

    actions: {
        async fetchNewOrderForm(payload: { form: any }) {
            try {

                console.log("fetchNewOrderForm paylaod:", payload);

                // Создаем новый объект для хранения данных
                let jsonData: Object<string> = {};

                // Проверяем наличие payload и payload.form
                if (payload && payload.form && payload.form !== undefined) {
                    // Заполняем данные из FormData в объект jsonData
                    jsonData['cargo_inf_to'] = payload.form.cityTo.value ? payload.form.cityTo.value.name : null;
                    jsonData['cargo_inf_from'] = payload.form.cityFrom.value ? payload.form.cityFrom.value.name : null;
                    jsonData['cargo_inf_wht'] = payload.form.weight.value;
                    jsonData['cargo_inf_size'] = payload.form.size.value;
                    jsonData['cargo_deliv_start_at'] = '2024-12-20 10:00:00'; // TODO: Фиксировать начало доставки
                    jsonData['cargo_deliv_end_at'] = '2024-12-20 10:00:00'; // TODO: Фиксировать конец доставки
                    jsonData['description'] = payload.form.textMsg.value;
                } else {
                    throw "Create new Order -> No Data";
                }


                //
                // if (payload.form !== null) {
                //     payload.form.forEach((key: any, value: any | Blob) => {
                //         bodyData.set(key, value)
                //     });
                // } else {
                //     throw "Not avail form data from create new order!";
                // }


                // @ts-ignore
                // @ts-ignore
                const data = await useNuxtApp()
                    .$api<any[]>("/api/orders/request/new", {
                        method: 'POST',
                        // baseURL: getBaseUrlApi,
                        body: jsonData,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                console.log(data);

                if (data.success) {
                    // alert('Заявка успешно создана!');

                    notivue.push.success({
                        title: 'Заявка - Поиск перевозчика',
                        message: 'Успешно создана - ожидайте отклики!',
                        duration: 4000,
                    });

                    return data.order;
                } else {
                    // alert('Ошибка при создании заявки!');

                    notivue.push.warning({
                        title: 'Заявка - Поиск перевозчика',
                        message: 'Ошибка при создании заявки. Попробуйте позже!',
                        duration: 5000,
                    });

                    throw 'Error create new order!';
                }
                //

            } catch (e) {
                console.error('Error fetch -> create new Order:', e);
                return e;
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
        },

        async GetOffersOrderSingleItem(state: any): Promise<any> {
            return state.orders && state.orders.single !== null && state.orders.single.offers.data !== null ? state.orders.single.offers.data : null;
        }
    }
})