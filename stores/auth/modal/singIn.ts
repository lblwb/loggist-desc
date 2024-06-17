import {defineStore} from "pinia";

export const useAuthModalStore = defineStore('auth-modal-store', {
    state: () => {
        // @ts-ignore
        return {
            modal: {
                singIn: {
                    show: false
                }
            }
        };
    },
    getters: {
        getStatusModalSignIn(state): boolean {
            return state.modal.singIn.show;
        },
    },
    actions: {
        // Modal SignIn
        toggleShowModalSignIn() {
            this.modal.singIn.show = !this.modal.singIn.show;
        },
        setStatusShowModalSignIn(status: boolean) {
            this.modal.singIn.show = status;
        },
        //  Modal SignUp
    }
});