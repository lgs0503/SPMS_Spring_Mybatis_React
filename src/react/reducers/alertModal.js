import { SHOW_ALERT_MODAL, HIDE_ALERT_MODAL } from '../action/type';

const alertModal = (
    state = {
        show: false,
        text: null,
        callback: null
    },
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case SHOW_ALERT_MODAL:
            return {
                show: true,
                text: payload.text,
                callback: payload.callback
            };
        case HIDE_ALERT_MODAL:
            return {
                show: false,
                text: null,
                callback: null
            };
        default:
            return state;
    }
};

export default alertModal;