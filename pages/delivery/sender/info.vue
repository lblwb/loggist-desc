<script setup lang="ts">
import {useDeliveryOrders} from "~/stores/delivery/orders";
import SelectBtnAmountRange from "~/components/Main/Form/SelectBtnAmountRange.vue";
import SelectDateBtnPicker from "~/components/Main/Form/SelectDateBtnPicker.vue";
import SelectBtnCityList from "~/components/Main/Form/SelectBtnCityList.vue";
import CargoOrdersBlockItem from "~/components/Main/Widgets/Orders/Block/CargoOrdersBlockItem.vue";

const storeDeliveryOrders = useDeliveryOrders();

const router = useRouter();
const route = useRoute();


let data = reactive({
  cargo_orders: [],
});


onMounted(async () => {
  await storeDeliveryOrders.fetchPendingOrders();
  //
  const pendingOrdersItems = await storeDeliveryOrders.GetPendingOrdersItems;
  if (pendingOrdersItems !== null) {
    data.cargo_orders = pendingOrdersItems;
  } else {
    data.cargo_orders = [];
  }
})
</script>
<template>
  <div class="cargoBody">
    <div class="deliveryInfoHeading" style="margin-bottom: 64px">
      <div class="deliveryInfoHeadingTitle CargoHeadingTitle" style="">
        Перевозчику
      </div>
      <div class="deliveryInfoHeadingDesc CargoHeadingDesc">
        Найдите надежного отправителя легко и быстро, заработав!
      </div>
    </div>
    <div class="deliveryBody">

      <div class="deliveryBodyCargoFilter" style="margin-bottom: 36px">
        <div class="deliveryBodyCargoFilterWrapper" style="display: flex; flex-flow: row wrap; gap: 0 6px;">
          <div class="deliveryBodyCargoFilterInput">
            <SelectBtnCityList/>
          </div>
          <div class="deliveryBodyCargoFilterInput">
            <SelectDateBtnPicker/>
          </div>
          <div class="deliveryBodyCargoFilterInput">
            <SelectBtnAmountRange/>
          </div>
        </div>

      </div>

      <div class="deliveryBodyCargs">
        <div class="deliveryBodyCargsItems" v-if="data.cargo_orders !== [] &&  data.cargo_orders !== null">
          <div class="deliveryBodyCargsItemsWrapper" style="display: flex; flex-flow: row wrap; gap: 15px;">
            <CargoOrdersBlockItem :order="order" v-for="order in data.cargo_orders" v-bind:key="order.idx" />
          </div>
        </div>

        <div class="deliveryBodyCargsNotFound" v-else>
          <strong>Обновление:</strong>
          Скоро тут будут заявки...
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

.deliveryInfoHeading .deliveryInfoHeadingTitle {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: 0.02em;
  color: #000000;
  margin-bottom: 24px;
}

.deliveryInfoHeading .deliveryInfoHeadingDesc {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 36px;
  letter-spacing: 0.04em;
  color: #686767;
}

.deliveryBodyCargsNotFound {
  color: #000;
}

</style>