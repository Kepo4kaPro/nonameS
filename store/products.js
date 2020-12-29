export const state = () => ({
  products: {}
});

export const mutations = {
  setProduct(state, data) {
    let new_posts = {...state.products};
    new_posts[data.id] = data.product;
    state.products = new_posts;
  }
};

export const actions = {
  async fetch({commit}, id) {
    const data = {
      product : await this.$axios.$get('product/'+id),
      id: id
    };
    commit('setProduct', data);
  },
};

export const getters = {
  data: s => s.products
};
