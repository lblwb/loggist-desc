<template>
  <div class="cargoBody">
    <div class="deliveryInfoHeading" style="margin-bottom: 64px">
      <div class="deliveryInfoHeadingTitle CargoHeadingTitle" style="">
        Услуги
      </div>
      <div class="deliveryInfoHeadingDesc CargoHeadingDesc">

      </div>
    </div>
    <div class="deliveryInfoBody">
      <div class="list-services" style="
    display: flex;
    flex-flow: row wrap;
    gap: 16px;
">
        <div class="item-list">
          <a href="/">
            <div class="icon-list">
              <img data-lazyload="" src="~/assets/images/services/upd_icon-17.svg" class=" lazyloaded "
                   loading="lazy" data-src="/local/templates/index_new/img/upd_icon-17.svg" alt="image description"
                   width="51" height="44">
            </div>
            <div class="decs-list">
              <strong class="title">Международные морские <br>перевозки</strong>
            </div>
          </a>
        </div>
        <div class="item-list">
          <a href="/">
            <div class="icon-list">
              <img data-lazyload="" src="~/assets/images/services/upd_icon-18.svg" class=" lazyloaded "
                   loading="lazy" data-src="/local/templates/index_new/img/upd_icon-18.svg" alt="image description"
                   width="52" height="41">
            </div>
            <div class="decs-list">
              <strong class="title">Международные железнодорожные перевозки</strong>
            </div>
          </a>
        </div>
        <div class="item-list">
          <a href="/">
            <div class="icon-list">
              <img data-lazyload="" src="~/assets/images/services/upd_icon-19.svg" class=" lazyloaded "
                   loading="lazy" data-src="/local/templates/index_new/img/upd_icon-19.svg" alt="image description"
                   width="45" height="45">
            </div>
            <div class="decs-list">
              <strong class="title">Международные авиационные перевозки</strong>
            </div>
          </a>
        </div>
        <div class="item-list">
          <a href="/">
            <div class="icon-list">
              <img data-lazyload="" src="~/assets/images/services/upd_icon-20.svg" class=" lazyloaded "
                   loading="lazy" data-src="/local/templates/index_new/img/upd_icon-20.svg" alt="image description"
                   width="52" height="51">
            </div>
            <div class="decs-list">
              <strong class="title">Таможенное оформление</strong>
            </div>
          </a>
        </div>
      </div>
      <!--      -->
      <div class="blockDeliveryAmount" style="font-size: 17px; color: #000; max-width: 60vw">
        <h2>Стоимость доставки</h2>
        <p>
          Цена на услуги транспортной компании зависит от целого ряда факторов: габариты и характер груза, расстояние,
          вид
          транспорта, таможенное оформление, различные налоги и сборы. Рассчитать предварительную стоимость доставки
          конкретного груза можно, заполнив специальную форму (калькулятор). В ней вы укажете пункт отправления и пункт
          назначения, дополнительные услуги, характер и параметры груза. На основе полученных данных система произведет
          автоматический расчет стоимости доставки. Однако, это будут предварительные данные, окончательный счет можно
          узнать из коммерческого предложения, которое по вашему запросу оформит представитель нашей компании.
        </p>
        <p>
          Являясь 4PL-оператором, Decs Logistics имеет колоссальный опыт и экспертизу в широком спектре транспортной
          логистики и складской обработке грузов. Мы перевозим грузы любым видом транспорта, по всему миру, под всеми
          таможенными режимами, так же осуществляем все необходимые процедуры на пути движения груза.
        </p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "services"
}
</script>

<style scoped>


.item-list {
  display: flex;
  gap: 10px;
  flex: auto;
}

.list-services .item-list a {
  text-decoration: none;
  /*display: block; *!*/
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  background: #fff;
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -ms-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  padding: 25px 10px 25px 15px;
  display: flex;
  flex-wrap: row wrap;
  align-items: center;
  gap: 25px;
  border-radius: var(--main-border-radius);
  overflow: hidden;
}

.decs-list {
  overflow: hidden;
  display: flex;
}

.icon-list{
  color: var(--brand-primary-color);
}

.decs-list .title {
  color: #252628;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.015em;
  max-width: 16vw;
  display: flex;
  align-items: center;
}
</style>