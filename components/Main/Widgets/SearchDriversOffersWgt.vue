<script setup lang="ts">

import * as notivue from "notivue";
import {useAuthModalStore} from "~/stores/auth/modal/singIn";
import {useAuthStore} from "~/stores/auth";
import SelectBtnCityList from "~/components/Main/Form/SelectBtnCityList.vue";
import SelectBtnCount from "~/components/Main/Form/SelectBtnCount.vue";
import {useNewDelvOrderStore} from "~/stores/delivery/orders/create";

const authStore = useAuthStore();
const authModalStore = useAuthModalStore();
const createNewOrderStore = useNewDelvOrderStore()
//
const router = useRouter();
const route = useRoute();

// Список городов
const cities = [
  {id: 1, name: 'Москва'},
  {id: 2, name: 'Санкт-Петербург'},
  {id: 3, name: 'Новосибирск'},
  // Добавьте остальные города по мере необходимости
];


interface NewOrderFormData {
  cityFrom: { value: string | null };
  cityTo: { value: string | null };
  weight: { value: number | null };
  size: { value: number | null };
  textMsg: { value: String | null }
}

// Состояние выбранного города
const selectedCity = ref(null);

const data = ref({
  active: true,
  // Forms
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
  }
});

// Функция для исключения выбранного города из списка
const citiesExcept = (selectedCity) => {
  return cities.filter(city => !selectedCity || city.id !== selectedCity.id);
};

// Computed-свойство для валидации всех полей формы
const isFormValid = computed(() => {
  const {cityFrom, cityTo, weight, size, textMsg} = data.value.form;

  // Проверяем, что все поля имеют значения
  return (
      cityFrom.value !== null &&
      cityTo.value !== null &&
      weight.value !== null &&
      size.value !== null &&
      textMsg.value.trim() !== '' && textMsg.value.length > 100
  );
});

async function sendNewOrder() {
  try {
    if (authStore.checkAuthUser) { // Ensure checkAuthUser is a method call
      // Extract raw data from the reactive object
      const dataForm = toRaw(data.value);

      console.log(dataForm);

      if (dataForm && dataForm.form) { // Ensure dataForm and dataForm.form are not null
        // Send the form data to create a new order
        let resultOrder = await createNewOrderStore.fetchNewOrderForm({
          form: dataForm.form
        });


        console.log("result ORder:", resultOrder);

        if (resultOrder !== null && resultOrder.idx !== undefined && resultOrder.idx !== null) {
          navigateTo({
            name: 'delivery-orders-info-id',
            params: {id: resultOrder.idx}
          });
        } else {
          throw new Error("Not redirect / not avial id");
        }
        // Uncomment and adjust the router redirection as needed
        // router.push({
        //   name: 'delivery-orders-info-id',
        //   params: { id: 'new_uuid' }
        // });

      } else {
        throw new Error("Form data is null");
      }
    } else {
      // Show the sign-in modal if the user is not authenticated
      authModalStore.setStatusShowModalSignIn(true);
    }
  } catch (e) {
    console.error("Error creating new order:", e);
    notivue.push.warning({
      title: 'Заявка - Поиск перевозчика',
      message: 'Ошибка при создании заявки. Попробуйте позже!',
      duration: 5000,
    });
  }
}


// let data_form = ref({});
</script>
<template>
  <div class="searchDriversOffer">
    <div class="searchDriversOfferBlock">
      <div class="searchDriversOfferHeading">
        <div class="searchDriversOfferHeadingTitle">
          Начните поиск перевозчика:
        </div>
      </div>
      <!--      {{data}}-->
      <div class="searchDriversOfferForm">
        <div class="searchDriversOfferFormBody" style="margin-bottom: 36px">
          <div class="searchDriversOfferFormWrapper"
               style="display: flex; flex-flow: row wrap; gap:14px; margin-bottom: 24px; overflow-y: auto; overflow-x: hidden">
            <!--            {{ selectedCity }}-->
            <!--            <div class="searchDriversOfferFormInput">-->
            <SelectBtnCityList v-model:citySelected="data.form.cityFrom.value"
                               :selectDefTitle="'Пункт отправки'"
                               :cities="cities"
            />
            <!--              <div class="searchDriversOfferFormInputBlock">-->
            <!--                <div class="searchDriversOfferFormInputWrapper">-->
            <!--                  <div class="searchDriversOfferFormInputIcon">-->
            <!--                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
            <!--                      <path-->
            <!--                          d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"-->
            <!--                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
            <!--                      <path d="M12 17L11 13L7 12L16 8L12 17Z" stroke="currentColor" stroke-width="2"-->
            <!--                            stroke-linecap="round"-->
            <!--                            stroke-linejoin="round"/>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                  <div class="searchDriversOfferFormInputTitle">-->
            <!--                    Пункт отправления-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->

            <SelectBtnCityList v-model:citySelected="data.form.cityTo.value"
                               :selectDefTitle="'Пункт назначения'"
                               :citySelected="data.form.cityTo.value"
                               :cities="citiesExcept(data.form.cityFrom.value)"
            />
            <!--            <div class="searchDriversOfferFormInput">-->
            <!--              <div class="searchDriversOfferFormInputBlock">-->
            <!--                <div class="searchDriversOfferFormInputWrapper">-->
            <!--                  <div class="searchDriversOfferFormInputIcon">-->
            <!--                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
            <!--                      <path-->
            <!--                          d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"-->
            <!--                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
            <!--                      <path d="M12 17L11 13L7 12L16 8L12 17Z" stroke="currentColor" stroke-width="2"-->
            <!--                            stroke-linecap="round"-->
            <!--                            stroke-linejoin="round"/>-->
            <!--                    </svg>-->
            <!--                  </div>-->
            <!--                  <div class="searchDriversOfferFormInputTitle">-->
            <!--                    Пункт назначения-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->

            <SelectBtnCount placeholderText="Вес груза" v-model:sizeCount="data.form.weight.value" qtyName="КГ">
              <template #Icon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                  <path
                      d="M8.99988 6C8.99988 6.79565 9.31595 7.55871 9.87856 8.12132C10.4412 8.68393 11.2042 9 11.9999 9C12.7955 9 13.5586 8.68393 14.1212 8.12132C14.6838 7.55871 14.9999 6.79565 14.9999 6C14.9999 5.20435 14.6838 4.44129 14.1212 3.87868C13.5586 3.31607 12.7955 3 11.9999 3C11.2042 3 10.4412 3.31607 9.87856 3.87868C9.31595 4.44129 8.99988 5.20435 8.99988 6Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path
                      d="M6.8349 9H17.1649C17.3991 8.99996 17.6259 9.08213 17.8057 9.23216C17.9855 9.3822 18.107 9.59059 18.1489 9.821L19.7859 18.821C19.8121 18.9651 19.8064 19.1133 19.769 19.2549C19.7317 19.3966 19.6637 19.5283 19.5698 19.6408C19.4759 19.7532 19.3585 19.8437 19.2258 19.9058C19.0931 19.9679 18.9484 20 18.8019 20H5.1979C5.05141 20 4.9067 19.9679 4.77401 19.9058C4.64131 19.8437 4.52388 19.7532 4.43001 19.6408C4.33615 19.5283 4.26813 19.3966 4.23079 19.2549C4.19345 19.1133 4.18768 18.9651 4.2139 18.821L5.8509 9.821C5.89283 9.59059 6.01429 9.3822 6.19411 9.23216C6.37393 9.08213 6.60071 8.99996 6.8349 9Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>
            </SelectBtnCount>

            <SelectBtnCount placeholderText="Объем груза" v-model:sizeCount="data.form.size.value" qtyName="м2">

              <template #Icon>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                  <path
                      d="M9 8V10M6 8V11M12 8V11M18 8V11M15 8V10M19.875 8C20.496 8 21 8.512 21 9.143V14.857C21 15.488 20.496 16 19.875 16H4C3.73478 16 3.48043 15.8946 3.29289 15.7071C3.10536 15.5196 3 15.2652 3 15V9.143C3 8.512 3.504 8 4.125 8H19.875Z"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </template>

            </SelectBtnCount>

            <!--            {{ data.form }}-->


          </div>
          <div class="searchDriversOfferFormWrapper" style="overflow: hidden;box-sizing: border-box;">
            <textarea placeholder="Опишите что требуется в заявке"
                      style="width: 100%;max-width: 100%;border: 1px solid rgb(238, 238, 238);border-radius: var(--main-border-radius);min-height: 8vh;max-height: 12vh;font-size: 14px;padding: 16px;box-sizing: border-box;display: inline-flex;overflow-x: hidden; overflow-y: auto"
                      v-model="data.form.textMsg.value"></textarea>

          </div>
          <div class="textValidate">
            <div class="textValidateOk" v-if="data.form.textMsg.value.trim() && data.form.textMsg.value.length > 100">
              Отлично
            </div>
            <div class="textValidateBad" v-else>
              Описание должно быть не менее 100 символов (Заполните поле!)
            </div>
          </div>
        </div>
        <div class="searchDriversOfferFormFooter">
          <div class="searchDriversOfferFormBtn" v-if="data.active">
            <button :disabled="!isFormValid"
                    style="" @click="sendNewOrder">
              <span class="searchDriversOfferFormBtnWrapper"
                    style="">
                <span class="searchDriversOfferFormBtnIcon" style="display: flex;">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M5.5 17C5.5 17.5304 5.71071 18.0391 6.08579 18.4142C6.46086 18.7893 6.96957 19 7.5 19C8.03043 19 8.53914 18.7893 8.91421 18.4142C9.28929 18.0391 9.5 17.5304 9.5 17M5.5 17C5.5 16.4696 5.71071 15.9609 6.08579 15.5858C6.46086 15.2107 6.96957 15 7.5 15C8.03043 15 8.53914 15.2107 8.91421 15.5858C9.28929 15.9609 9.5 16.4696 9.5 17M5.5 17H3.5V6C3.5 5.73478 3.60536 5.48043 3.79289 5.29289C3.98043 5.10536 4.23478 5 4.5 5H13.5V17M9.5 17H15.5M15.5 17C15.5 17.5304 15.7107 18.0391 16.0858 18.4142C16.4609 18.7893 16.9696 19 17.5 19C18.0304 19 18.5391 18.7893 18.9142 18.4142C19.2893 18.0391 19.5 17.5304 19.5 17M15.5 17C15.5 16.4696 15.7107 15.9609 16.0858 15.5858C16.4609 15.2107 16.9696 15 17.5 15C18.0304 15 18.5391 15.2107 18.9142 15.5858C19.2893 15.9609 19.5 16.4696 19.5 17M19.5 17H21.5V11M21.5 11H13.5M21.5 11L18.5 6H13.5"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </span>
                <span class="searchDriversOfferFormBtnTitle" style="
font-family: 'Inter',sans-serif;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 19px;
letter-spacing: 0.02em;
color: var(--brand-primary-color);
">
                  Получить предложение на доставку
                </span>
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.searchDriversOfferBlock {
  background: #fff;
  padding: 32px 24px;
  max-width: 56vw;
  border-radius: var(--main-border-radius);
}

.searchDriversOfferHeading {
  margin-bottom: 36px;
}

.searchDriversOfferHeadingTitle {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.04em;
  color: #555555;
}

.searchDriversOfferFormInput {
  border: solid 1px #F8F8F8;
  padding: 8px 16px;
  border-radius: var(--main-border-radius);
  display: flex;
  align-items: center;
  cursor: pointer;
}

.searchDriversOfferFormInput .searchDriversOfferFormInputIcon {
  display: flex;
  color: #FF9863;
}

.searchDriversOfferFormInput .searchDriversOfferFormInputTitle {
  color: #000000;
}

.searchDriversOfferFormInput.__Active {
  background: var(--brand-fcs-color);
  color: var(--brand-primary-color);
}

.searchDriversOfferFormInput:hover,
.searchDriversOfferFormInput:focus {
  opacity: 0.7;
}

.searchDriversOfferFormInput.__Active .searchDriversOfferFormInputTitle {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.02em;
  color: #FF5E00;
}

.searchDriversOfferFormInput .searchDriversOfferFormInputWrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.searchDriversOfferFormBtn {

}

.searchDriversOfferFormBtn button {
  width: 100%;
  background: var(--brand-fcs-color);
  color: var(--brand-primary-color);
  border: solid 1px transparent;
  border-radius: var(--main-border-radius);
  padding: 10px;
  cursor: pointer;
}

.searchDriversOfferFormBtn button:disabled {
  opacity: 0.6;
}

.searchDriversOfferFormBtn .searchDriversOfferFormBtnWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.searchDriversOfferFormBtn button:hover,
.searchDriversOfferFormBtn button:focus {
  opacity: 0.7;
}

.textValidateOk {
  margin-top: 10px;
  color: limegreen;
}

.textValidateBad {
  margin-top: 10px;
  color: orange;
}

</style>