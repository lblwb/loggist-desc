<script setup lang="ts">
const msgWrapper = ref(null);

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

async function pushNewMessage() {
  const chat_msg_text = data.chat.input.text;
  //
  console.log(chat_msg_text);
  if (chat_msg_text !== null && chat_msg_text.length > 0) {

    //
    // data.chat.msg.data.push({text: chat_msg_text});

    if (props.orderId !== null && chat_msg_text !== null) {
      await fetchOrdChatSendMsg(props.orderId, chat_msg_text);
      await fetchOfferChatMessages(props.orderId);
    }

    //
    data.chat.input.text = "";

    scrollChatToBottom();
  } else {
    alert('Введите текст сообщение!');
  }
}

async function scrollChatToBottom() {
  if (msgWrapper.value) {
    msgWrapper.value.scrollTop = msgWrapper.value.scrollHeight + 100;
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

async function fetchOrdChatSendMsg(OrderId: string, MessageText: null) {
  if (OrderId == null) {
    throw "Not order id"
  }
  //
  try {
    // @ts-ignore
    const {messages} = await useNuxtApp()
        .$api<any>(`/api/orders/${OrderId}/chat/new_message`, {
          method: "POST",
          body: {
            message: MessageText
          }
        })
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
  await scrollChatToBottom();
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
          <div class="offerMessangerBlockBodyMsgWrapper" style="" ref="msgWrapper">
            <div class="offerMessangerBlockBodyMsgItem" v-for="chat_item in data.chat.msg.data"
                 :class="{__Other: chat_item.other}" v-if="data.chat.msg.data && data.chat.msg.data.length > 0">
              {{ chat_item.other ? 'Перевозчик:' : 'Вы:' }} {{ chat_item.text }}
            </div>

            <div class="offerMessangerBlockBodyMsgNotChat" v-else>
              <div class="offerMessangerBlockBodyMsgItem" style="color: #000; background: var(--brand-fcs-color)">
                <div class="Icon" style="margin-right: 14px; display: flex;">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 16V12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12V16M3 12H4M12 3V4M20 12H21M5.6 5.6L6.3 6.3M18.4 5.6L17.7 6.3M6 17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16H17C17.2652 16 17.5196 16.1054 17.7071 16.2929C17.8946 16.4804 18 16.7348 18 17V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H7C6.73478 20 6.48043 19.8946 6.29289 19.7071C6.10536 19.5196 6 19.2652 6 19V17Z"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="Text">
                  <strong>Обращаем ваше внимание:</strong> Пожалуйста, не передавайте личные данные, также будьте
                  осторожны при общении.

                </div>

              </div>
              <div class="offerMessangerBlockBodyMsgItem" style="color: #000; background: var(--brand-fcs-color)">
                <div class="Icon" style="margin-right: 14px; display: flex;">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5 17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19C7.53043 19 8.03914 18.7893 8.41421 18.4142C8.78929 18.0391 9 17.5304 9 17M5 17C5 16.4696 5.21071 15.9609 5.58579 15.5858C5.96086 15.2107 6.46957 15 7 15C7.53043 15 8.03914 15.2107 8.41421 15.5858C8.78929 15.9609 9 16.4696 9 17M5 17H3V6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H13V17M9 17H15M15 17C15 17.5304 15.2107 18.0391 15.5858 18.4142C15.9609 18.7893 16.4696 19 17 19C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17M15 17C15 16.4696 15.2107 15.9609 15.5858 15.5858C15.9609 15.2107 16.4696 15 17 15C17.5304 15 18.0391 15.2107 18.4142 15.5858C18.7893 15.9609 19 16.4696 19 17M19 17H21V11M21 11H13M21 11L18 6H13"
                        stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="Text">
                  <strong>При общении соблюдайте личные границы:</strong> Обращайтесь друг к другу с уважением.
                </div>

              </div>

              <div class="offerMessangerBlockBodyMsgItem" style="color: #000; background: var(--brand-fcs-color)">
                <div class="Icon" style="margin-right: 14px; display: flex;">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11 12V4.5C11 4.10218 10.842 3.72064 10.5607 3.43934C10.2794 3.15804 9.89782 3 9.5 3C9.10218 3 8.72064 3.15804 8.43934 3.43934C8.15804 3.72064 8 4.10218 8 4.5V13L6.53018 11.53C6.23572 11.2359 5.85143 11.0486 5.43834 10.9978C5.02526 10.9471 4.60706 11.0359 4.25018 11.25C3.91513 11.4509 3.67166 11.7745 3.57157 12.1522C3.47147 12.5298 3.52263 12.9315 3.71418 13.272C5.59318 16.612 6.68818 18.521 7.00018 19L7.19618 19.3C7.7427 20.1299 8.48676 20.811 9.36157 21.2823C10.2364 21.7535 11.2145 22.0002 12.2082 22H12.0002H14.0002C15.5915 22 17.1176 21.3679 18.2428 20.2426C19.368 19.1174 20.0002 17.5913 20.0002 16V11.5C20.0002 11.1022 19.8421 10.7206 19.5608 10.4393C19.2795 10.158 18.898 10 18.5002 10C18.1024 10 17.7208 10.158 17.4395 10.4393C17.1582 10.7206 17.0002 11.1022 17.0002 11.5M11 11.5V9.5C11 9.10218 11.158 8.72064 11.4393 8.43934C11.7206 8.15804 12.1022 8 12.5 8C12.8978 8 13.2794 8.15804 13.5607 8.43934C13.842 8.72064 14 9.10218 14 9.5V12M14 10.5C14 10.1022 14.158 9.72064 14.4393 9.43934C14.7206 9.15804 15.1022 9 15.5 9C15.8978 9 16.2794 9.15804 16.5607 9.43934C16.842 9.72064 17 10.1022 17 10.5V12M5 3L4 2M4 7H3M14 3L15 2M15 6H16"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="Text">
                  <strong>В случае возникновения проблемы</strong> нажите -> "Апелляция"
                </div>
              </div>

              <div class="offerMessangerBlockBodyMsgItem" style="color: #000; background: var(--brand-fcs-color)">
                <div class="Icon" style="margin-right: 14px; display: flex;">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 14L21 3M10 14L13.4996 21C13.5435 21.0957 13.6139 21.1769 13.7025 21.2338C13.7912 21.2906 13.8943 21.3209 13.9996 21.3209C14.1049 21.3209 14.208 21.2906 14.2966 21.2338C14.3853 21.1769 14.4557 21.0957 14.4996 21L21 3M10 14L2.99958 10.5C2.90384 10.4561 2.82271 10.3857 2.76583 10.2971C2.70895 10.2084 2.67871 10.1053 2.67871 10C2.67871 9.89468 2.70895 9.79158 2.76583 9.70295C2.82271 9.61431 2.90384 9.54387 2.99958 9.5L21 3"
                        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="Text">
                  <strong>Чтобы начать беседу</strong> "Введите сообщение", нажатиме отправить (enter)
                </div>
              </div>


            </div>


          </div>

        </div>


        <div class="offerMessangerBlockBodyBottom"
             style="position:absolute; right: 0; left: 0; bottom: 16px; margin: 0 24px;">
          <div class="offerMessangerBlockBodyBottomForm"
               style="border:solid 1px #eee; border-radius:var(--main-border-radius);padding: 8px 10px; width: 100%; background: #fff">
            <div class="offerMessangerBlockBodyBottomFormWrapper" style="display: flex;">
              <div class="offerMessangerBlockFooterFormInputBox"
                   style="display: flex; align-items: center; width: 100%; background: #fff">
                <div class="formInputBoxWrapper" style="display: flex; align-items: center; gap: 6px; width: 100%;">
                  <div class="formInputBoxIcon" style="display: flex">
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
  min-height: 38vh;
  max-height: 42vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.offerMessangerBlockBodyMsgItem {
  display: flex;
  padding: 10px 12px;
  background: #EEEEEE;
  max-width: 26vw;
  width: auto;
  box-sizing: border-box;
  border-radius: var(--main-border-radius);
  font-size: 15px;
  font-weight: 500;
  color: #000;
  margin-bottom: 18px;
  line-height: 23px;
}


.offerMessangerBlockBodyMsgItem.__Other {
  background: var(--brand-fcs-color);
}

.offerMessangerBlockBodyMsgWrapper .offerMessangerBlockBodyMsgItem:last-child {
  margin-bottom: 56px;
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