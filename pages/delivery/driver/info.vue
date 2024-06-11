<template>
  <div class="cargoBody">
    <div class="deliveryInfoHeading" style="margin-bottom: 64px">
      <div class="deliveryInfoHeadingTitle CargoHeadingTitle" style="">
        Отправителю
      </div>
      <div class="deliveryInfoHeadingDesc CargoHeadingDesc">
        Найдите надежного перевозчика легко и быстро, сэкономив время и деньги!
      </div>
    </div>
    <div class="deliveryBody">
      <div class="deliveryBodySearch">
        <SearchDriversOffersWgt/>
      </div>
    </div>
  </div>
</template>

<script>
import SearchDriversOffersWgt from "~/components/Main/Widgets/SearchDriversOffersWgt.vue";

export default {
  name: "delivery-info",
  components: {
    SearchDriversOffersWgt
  }
}
</script>

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
</style>