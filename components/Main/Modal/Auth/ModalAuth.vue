<template>
  <Modal :isVisible="isVisible" @close="closeModal">
    <div class="auth-form">
      <h2>{{ isLoginMode ? 'Авторизация' : 'Регистрация' }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Логин</label>
          <input type="text" id="username" v-model="username" required/>
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" required/>
        </div>
        <button type="submit">{{ isLoginMode ? 'Войти' : 'Регистрация' }}</button>
      </form>
      <p @click="toggleMode">{{ isLoginMode ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войти' }}</p>
    </div>
  </Modal>
</template>

<script setup>
import {useAuthStore} from "~/stores/auth/index";
import {ref} from 'vue';
import * as notivue from "notivue";

const authStore = useAuthStore();

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const isLoginMode = ref(true);
const username = ref('');
const password = ref('');

const submitForm = async () => {
  if (isLoginMode.value) {
    // Обработчик логина
    // console.log('Логин:', username.value, 'Пароль:', password.value);

    try {
      const auth = await authStore.authUser({
        username: username.value,
        password: password.value
      });

      // await authStore.fetchUserData();

      if (auth !== null) {
        // console.log(auth);
        notivue.push.success({
          title: "Аккаунт",
          message: "Успешный вход!",
          duration: 2000,
        });
      }
    } catch (e) {
      notivue.push.error({
        title: "Аккаунт",
        message: "Произошла ошибка при авторизации, по пробуйте позже!",
        duration: 2000,
      });
    }


  } else {
    // Обработчик регистрации
    //console.log('Регистрация:', username.value, 'Пароль:', password.value);
  }
  closeModal();
};

const closeModal = () => {
  emit('close');
};

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value;
};
</script>

<style scoped>
.auth-form {
  text-align: center;
}

.auth-form h2 {
  margin-bottom: 20px;
  color: #FF5722;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 16px 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background: var(--brand-fcs-color);
  color: var(--brand-primary-color);
  border: none;
  border-radius: 5px;
  padding: 14px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

button:hover {
  background: var(--brand-primary-color);
  color: var(--btn-primary-text-color);
}

p {
  margin-top: 15px;
  color: #FF5722;
  cursor: pointer;
  padding: 10px;
}
</style>
