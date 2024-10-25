import { createStore } from 'vuex';

const store = createStore({
    modules: {
    },
    state: {
        loading: false,
    },
    getters: {
        isTestMode: (state) => {
            return import.meta.env.VITE_APP_TEST_MODE === 'true';
        },
        isLoading: state => state.loading
    },
    mutations: {
        setLoading(state, status) {
            state.loading = status;
        },
    },
    actions: {
        setLoading({ commit }, status) {
            commit('setLoading', status);
        },
    }
});

export default store;
