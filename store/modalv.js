export const state = () => ({
  is_render: false,
  is_show: false,
  modalData: null
});

export const mutations = {
  setModal(state, modal) {
    if(!state.is_show){
      state.is_show = true;
      state.modalData = modal;
    }
  },
  renderModal(state) {
    state.is_render = true;
  },
  closeModal(state){
    state.is_show = false;
    state.modalData = null;
  }
};

export const actions = {
  setModal({commit, getters}, data){
    if(!getters.is_render){
      commit('renderModal');
      setTimeout(()=>{
        commit('setModal', data);
      }, 10)
    }else commit('setModal', data);
  },
  closeModal({commit}){
    commit('closeModal');
  }
};

export const getters = {
  data: s => s
};
