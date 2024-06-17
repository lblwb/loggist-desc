<script setup lang="ts">

import {useAuthStore} from "~/stores/auth";
import {useUserMyOrders} from "~/stores/user/orders/my_orders";

const storeAuth = useAuthStore();
const storeUserMyOrders = useUserMyOrders();

definePageMeta({
  middleware: 'auth'
});

const data = reactive({
  user: {
    profile: null,
    my_orders: []
  }
})

function formatLastLogin(dateString: string | number | Date) {
  const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
  return new Date(dateString).toLocaleDateString('ru-RU', options);
}

const formatDate = (dateString) => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(dateString).toLocaleDateString('ru-RU', options);
};

const statusClass = (status: any) => {
  switch (status) {
    case 'pending_accept':
      return 'Ожидает вашего подтверждения';
    case 'pending':
      return 'Ожидает новых предложений';
    default:
      return 'Ожидает';
  }
};

onMounted(async () => {
  await storeAuth.fetchUserData();
  await storeUserMyOrders.fetchMyUserOrders();
  //
  data.user.profile = await storeAuth.getUserData;
  data.user.my_orders = await storeUserMyOrders.GetMyOrdersItems;
})
</script>
<template>
  <div class="bodyProfile">
    <div class="user-page" v-if="data.user.profile !== null">
      <div class="userPageHeading" style="margin-bottom: 56px;">
        <div class="userPageHeadingTitle">
          <h1>Информация о пользователе</h1>
        </div>
      </div>

      <div class="user-info" style="font-size: 16px; gap: 0 16px;">
        <div class="userInfoItem" style="margin-bottom: 16px">
          <strong>Логин:</strong> {{ data.user.profile.username }}
        </div>

        <div class="userInfoItem" style="margin-bottom: 16px">
          <strong>Последний вход:</strong> {{ formatLastLogin(data.user.profile.last_login) }}
        </div>

        <div class="userInfoItem" style="margin-bottom: 16px">
          <strong>Активен:</strong> <span
            :class="{ active:  data.user.profile.is_active, inactive: ! data.user.profile.is_active }">{{
            data.user.profile.is_active ? 'Да' : 'Нет'
          }}
        </span>
        </div>
      </div>
    </div>
    <!--    {{ data.user.my_orders }}-->


    <div class="requests" style="margin-bottom: 56px">
      <div class="requestsHeading" style="margin-bottom: 24px">
        <div class="requestsHeadingTitle" style=" font-weight: 500; color: #000;">
            <h2>Мои заявки</h2>
        </div>
      </div>
      <div class="requestsWrapper">
        <div class="request-card" v-for="request in data.user.my_orders">
          <div class="request-details">
            <div class="detail">
              <span class="icon">✈️</span>
              <span>Дата: {{ formatDate(request.cargo_deliv_start_at) }}</span>
            </div>
            <div class="detail">
              <span class="icon">⚖️</span>
              <span>Вес груза: {{ request.cargo_inf_wht }} тонн</span>
            </div>
            <div class="detail">
              <span class="icon">📏</span>
              <span>Объем груза: {{ request.cargo_inf_size }} куб. м</span>
            </div>
            <div class="wrapper" style="display: flex; flex-flow: column; gap: 12px; ">
              <div class="detail_info">
                <span class="icon">🏢</span>
                <span>Тип груза: {{ request.cargo_type }}</span>
              </div>
              <div class="detail_info">
                <span class="icon">📍</span>
                <span>Отправка груза: {{ request.cargo_inf_from }} - {{ request.cargo_inf_to }}</span>
              </div>
            </div>

          </div>
          <div class="request-status">
            <div :class="statusClass(request.status)">
              <span class="icon">✈️</span>
              <span class="status-pending">Статус: {{ statusClass(statusText) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<style scoped>
.user-page {
  color: #000;
  margin-bottom: 56px;
}

.user-info p {
  margin: 5px 0;
}

.active {
  color: green;
}

.inactive {
  color: red;
}

.request-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #fff;
}

.request-details {
  display: flex;
  gap: 20px;
  color: #000000;
}

.detail {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border: solid 1px #F8F8F8;
  border-radius: var(--main-border-radius);
}

.icon {
  margin-right: 5px;
  color: #FF5722;
}

.request-status {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 8px 10px;
  border: solid 1px #F8F8F8;
  border-radius: var(--main-border-radius);
}

.status-pending {
  color: #FF5722;
}
</style>