<template>
  <div class="select-trigger">
    <button @click="toggleSelect" class="select-button">
      <span class="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
    stroke="#FF5E00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 17L11 13L7 12L16 8L12 17Z" stroke="#FF5E00" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round"/>
</svg>

      </span>
      <span>{{ selectedOption !== null ? selectedOption.name : 'Пункт назначения' }}</span>
      <i :class="['arrow', isOpen ? 'up' : 'down']"></i>
    </button>
    <ul v-if="isOpen" class="options" @mouseleave="hiddenSelect">
      <li v-for="option in options" :key="option.id" @click="selectOption(option)">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      options: [
        {id: 1, name: 'Москва'},
        {id: 2, name: 'Санкт-Петербург'},
        {id: 3, name: 'Новосибирск'},
      ],
      selectedOption: null
    };
  },
  methods: {
    toggleSelect() {
      this.isOpen = !this.isOpen;
    },
    hiddenSelect(){
        this.isOpen = false;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
    }
  }
};
</script>

<style scoped>
.select-trigger {
  position: relative;
}

.select-button {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #EAEAEA;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  font-size: 16px;
    min-width: 14vw;
}

.select-button .icon {
  margin-right: 10px;
  display: flex;
}

.arrow {
  margin-left: auto;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.arrow.up {
  border-bottom: 5px solid black;
}

.arrow.down {
  border-top: 5px solid black;
}

.options {
  list-style: none;
  padding: 0;
  margin: 5px 0 0;
  border: 1px solid #ccc;
  border-top: none;
  background-color: #fff;
  border-radius: 10px;
  color: #000;
  position: absolute;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  overflow: hidden;
}

.options li {
  padding: 10px 15px;
  cursor: pointer;
}

.options li:hover {
  background-color: #f5f5f5;
}
</style>