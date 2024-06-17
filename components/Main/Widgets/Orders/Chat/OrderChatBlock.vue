<script setup lang="ts">
const props = defineProps({
  orderId: {
    default: null,
    type: String
  },
  offerChat: {
    default: null,
    type: Object
  }
});

let data = reactive({
  chat: {
    input: {
      text: ""
    },
    msg: {
      data: [
        // {msg: "Здравствуйте, поможете упаковать груз?"},
        // {msg: "Добрый день, хорошо)", other: true},
        // {msg: "Спасибо)))"},
        // {msg: "Хорошего дня!"},
      ]
    }
  }
});

function pushNewMessage() {
  const chat_msg_text = data.chat.input.text;
  //
  console.log()
  if (chat_msg_text !== null && chat_msg_text.length > 0) {
    data.chat.msg.data.push({msg: chat_msg_text});
    //
    data.chat.input.text = "";
  } else {
    alert('Введите текст сообщение!');
  }
}


async function fetchOfferChatMessages(OrderId: string) {
  if (OrderId == null) {
    throw "Not order id"
  }
  //
  try {
    // @ts-ignore
    const {messages} = await useNuxtApp()
        .$api<any>(`/api/orders/${OrderId}/chat/msg/get`)
    // @ts-ignore
    data.chat.msg.data = messages;
    // return offers;
  } catch (e) {
    console.error('Error fetching single offer->chat->msg:', e);
    return [];
  }
}

onMounted(async () => {
  await fetchOfferChatMessages(props.orderId);
})
</script>
<template>
  <div class="deliveryBodyOfferMessanger" style="flex: 1; display: flex; align-items: stretch;">
    <div class="offerMessangerBlock"
         style="background: #fff; width: 100%; border-radius: var(--main-border-radius); overflow: hidden; padding: 24px;">
      <div class="offerMessangerBlockHeading">
        <div class="offerMessangerBlockHeadingTitle cargsItemHeadingTitle">
          Чат с перевозчиком
        </div>
      </div>
      <div class="offerMessangerBlockBody">
        <div class="offerMessangerBlockBodyMsg">
          <div class="offerMessangerBlockBodyMsgWrapper" style="max-height: 33vh;
    overflow-y: auto;
    overflow-x: hidden;">
            <div class="offerMessangerBlockBodyMsgItem" v-for="chat_item in data.chat.msg.data"
                 :class="{__Other: chat_item.other}">
              {{ chat_item.other ? 'Перевозчик:' : 'Вы:' }} {{ chat_item.text }}
            </div>
          </div>

        </div>


        <div class="offerMessangerBlockBodyBottom"
             style="position:absolute; right: 0; left: 0; bottom: 16px; margin: 0 24px;">
          <div class="offerMessangerBlockBodyBottomForm"
               style="border:solid 1px #eee; border-radius:var(--main-border-radius);padding: 8px 10px; width: 100%;">
            <div class="offerMessangerBlockBodyBottomFormWrapper" style="display: flex;">
              <div class="offerMessangerBlockFooterFormInputBox"
                   style="display: flex; align-items: center; width: 100%;">
                <div class="formInputBoxWrapper" style="display: flex; align-items: center; gap: 6px; width: 100%;">
                  <div class="formInputBoxIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M8 9H16M8 13H14M18 4C18.7956 4 19.5587 4.31607 20.1213 4.87868C20.6839 5.44129 21 6.20435 21 7V15C21 15.7956 20.6839 16.5587 20.1213 17.1213C19.5587 17.6839 18.7956 18 18 18H13L8 21V18H6C5.20435 18 4.44129 17.6839 3.87868 17.1213C3.31607 16.5587 3 15.7956 3 15V7C3 6.20435 3.31607 5.44129 3.87868 4.87868C4.44129 4.31607 5.20435 4 6 4H18Z"
                          stroke="#C3C3C3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div class="formInputBoxInput" style="">
                    <!--                    {{ data.chat.input.text }}-->
                    <input v-model="data.chat.input.text" @keyup.enter="pushNewMessage"
                           placeholder="Введите сообщение"/>
                  </div>
                </div>
              </div>
              <div class="offerMessangerBlockFooterFormAction" style="display: flex; align-items: center;">
                <div class="footerFormActionBtn">
                  <button style="" @click="pushNewMessage">
                    <span class="footerFormActionBtnIcon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15" stroke="#FF5E00" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round"/>
</svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.deliveryBodyCargsItem .deliveryBodyCargsItemBlock {
  background: #FFFFFF;
  padding: 24px;
  width: 100%;
  height: auto;
  border-radius: var(--main-border-radius)
}

.CargoWidgetBlock .CargoWidgetBlockWrapper {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 8px;
}

.cargsItemHeadingTitle {
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: #000000;
  margin-bottom: 24px;
}


/**/

.deliveryBodyOfferMessanger {
  position: relative;
}

.offerMessangerBlockBodyMsgWrapper {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-items: flex-start;
}

.offerMessangerBlockBodyMsgItem {
  display: flex;
  padding: 8px 12px;
  background: #EEEEEE;
  max-width: 24vw;
  width: auto;
  box-sizing: border-box;
  border-radius: var(--main-border-radius);
  font-size: 15px;
  font-weight: 500;
  color: #000;
  margin-bottom: 18px;
  line-height: 24px;
}


.offerMessangerBlockBodyMsgItem.__Other {
  background: var(--brand-fcs-color);
}

.formInputBoxInput {
  width: 100%;
  display: flex;
}

.formInputBoxInput input {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  border: none;
  min-height: auto;
  max-height: 3vh;
  font-size: 16px;
  box-sizing: border-box;
  text-underline: none;
}

.offerMessangerBlockFooterFormAction .footerFormActionBtn {
}

.offerMessangerBlockFooterFormAction .footerFormActionBtn button {
  border: none;
  background: transparent;
  cursor: pointer;
}

.offerMessangerBlockFooterFormAction .footerFormActionBtn button:hover,
.offerMessangerBlockFooterFormAction .footerFormActionBtn button:focus {
  opacity: 0.6;
}

.offerMessangerBlockFooterFormAction .footerFormActionBtn button .footerFormActionBtnIcon {
  display: flex;
  align-items: center;
}

.offerMessangerBlockFooterFormAction .footerFormActionBtn button .footerFormActionBtnIcon svg {
  display: flex;
}
</style>