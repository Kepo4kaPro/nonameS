export const state = () => ({
  bg_color: '#fff',
  basketCount: 0,
  sizeX: false,
});

export const mutations = {
  setColor(state, color) {
    state.bg_color = color;
  },
  updateBasket(state){
    state.basketCount = Object.keys(JSON.parse(localStorage.getItem('cart'))).length
  },
  setSizeX(state, val) {
    state.sizeX = val;
  },
};

export const actions = {
  setColor({commit}, color) {
    commit('setColor', color);
  },
  updateBasket({commit}){
    commit('updateBasket');
  },
  updateSizeX({commit}, val){
    commit('setSizeX', val);
  }
};

export const getters = {
  data: s => s
};
