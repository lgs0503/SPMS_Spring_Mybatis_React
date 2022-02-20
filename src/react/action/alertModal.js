import { SHOW_ALERT_MODAL, HIDE_ALERT_MODAL } from './type';

export const showAlertModal = (text, callback) => {
    return {
        type: SHOW_ALERT_MODAL,
        payload: {
            show: true,
            text,
            callback
        }
    };
};

export const hideAlertModal = () => {
    return {
        type: HIDE_ALERT_MODAL
    };
};