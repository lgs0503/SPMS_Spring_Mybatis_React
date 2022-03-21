import { SHOW_LOADING, HIDE_LOADING } from '../action/type';

const loading = (
    state = {
        show: false
    },
    action
) => {
    const { type } = action;
    switch (type) {
        case SHOW_LOADING:
            return {
                show: true
            };
        case HIDE_LOADING:
            return {
                show: false
            };
        default:
            return state;
    }
};

export default loading;