export const state = () => ({
  data: false
});

export const mutations = {
  setData(state, data) {
    state.data = data;
  },
  setNull(state){
    state.data = false;
  }
};

export const actions = {
  async fetch({commit}) {
    const data = await this.$axios.$get('account/');
    commit('setData', data);
  },
  setNull({commit}) {
    commit('setNull');
  }
};

export const getters = {
  data: s => s.data
};
