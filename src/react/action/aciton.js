import {SHOW_ALERT_MODAL, HIDE_ALERT_MODAL, SHOW_LOADING, HIDE_LOADING} from './type';

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

export const showLoading = () => {
    return {
        type: SHOW_LOADING
    };
};

export const hideLoading = () => {
    return {
        type: HIDE_LOADING
    };
};