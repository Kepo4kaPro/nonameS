export const state = () => ({
  catalogs: {},
  sort: 0
});

export const mutations = {
  setCatalog(state, data) {
    state.catalogs[data['id']] = data.catalog;
  },
  setSortType(state, type){
    state.sort = type
  }
};

export const actions = {
  async fetch({commit}, id) {
    const data = {
      catalog : await this.$axios.$get('catalog/'+id),
      id: id
    };
    commit('setCatalog', data);
  },
  setSort({commit}, type){
    commit('setSortType', type);
  }
};

export const getters = {
  data: s => s
};
