export const state = () => ({
  modals: {}
});

export const mutations = {
  setModalS(state, data) {
    state.modals[data.id] = data['vmodal'];
  }
};

export const actions = {
  async fetch({commit}, id) {
    const data = {
      vmodal : await this.$axios.$get('vmodals_sizes/'+id),
      id: id
    };
    commit('setModalS', data);
  },
};

export const getters = {
  data: s => s.modals
};
