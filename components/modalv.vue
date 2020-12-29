<template>
    <div v-if="is_show"
         v-bind:class="{show: show_a, hide: hide_a}"
         v-bind:style="{overflowY: ove_r ? 'auto' : 'hidden', marginTop: martop +'px'}"
         class="modalBG">
      <div class="modal_v" v-on:click="closeV()"></div>
      <div class="scollecr">
        <div class="modal-content">
          <font-awesome-icon class="close_mv" icon="times" v-on:click="closeV()" />


          <template v-if="modData.com">
            <ModalSize v-if="modData.com === 'ModalSize'" :props="modData.props" v-on:close="closeV()"/>
            <ModalBasket v-if="modData.com === 'ModalBasket'" v-on:close="closeV()"/>
            <ModalOgin  v-if="modData.com === 'ModalOgin'"  v-on:close="closeV()"/>
          </template>


        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        martop: 100,
        show_a:false,
        hide_a:false,
        ove_r: false
      }
    },
    mounted() {
      window.addEventListener('resize', this.onResize);
      window.onpopstate = event => {
        if(this.show_a){
          this.closeV();
        }
      };
    },
    methods: {
      ModalSize() {return import("~/components/modal/modalSize") },
      ModalBasket() {return import("~/components/modal/modalBasket") },
      ModalOgin() {return import("~/components/modal/modalOgin") },

      onResize(){
        if(this.show_a){
          this.martop = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
        }
      },
      closeV(){
        document.documentElement.style.overflow = 'auto';
        let self = this;
        this.show_a = false;
        this.hide_a = true;
        this.ove_r = false;
        setTimeout(function () {
          self.$store.dispatch('modalv/closeModal');
        }, 350);
      },
      showm(){
        this.martop = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
        this.hide_a = false;
        let self = this;
        setTimeout(function () {
          self.show_a = true;
        }, 1);
        setTimeout(function () {
          self.ove_r = true;
        }, 500);
        document.documentElement.style.overflow = 'hidden';
      }
    },
    computed : {
      is_show(){
        return this.$store.getters["modalv/data"].is_show;
      },
      modData(){
        let modal = this.$store.getters["modalv/data"].modalData.name;
        switch (modal) {
            case 'sizer': {
              return {
                com : 'ModalSize',
                props : this.$store.getters["modalv/data"].modalData.cat
              };
            }break;
            case 'basket': {
              return {
                com : 'ModalBasket'
              };
            }break;
          case 'login': {
            return {
              com : 'ModalOgin'
            };
          }break;
        }

      }
    },
    watch: {
      is_show: function (value) {
        if(value){
          this.showm();
        }
      }
    },
  }
</script>

<style scoped>
  .modalBG{
    font-size: 36px;
    z-index: 99;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .75);
    opacity: 0;
    transition: opacity .35s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scollecr{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .modalBG.show{
    transition: opacity 1s;
    opacity: 1;
  }

  .modalBG.show .modal-content{
    animation: show-m 1s ;
  }

  .modalBG.hide .modal-content{
    animation: hide-m .35s ;
  }

  .modal_v{
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .modal-content{
    overflow: hidden;
    padding: 2.5% 5%;
    position: relative;
    z-index: 99;
    border-radius: .55em;
    width: 600px;
    max-width: 90vw;
    background-color: white;
    margin: 5vw 0;
  }

  .close_mv{
    z-index: 99;
    position: absolute;
    top: .3em;
    right: .4em;
    cursor: pointer;
    transition: none;
  }

  @keyframes hide-m {
    0% {
      transform: scale(1);
    }
    100%{
      transform: scale(0.85);
    }
  }

  @keyframes show-m {
    0% {
      opacity: .1;
      transform: scale(2);
    }
    45% {
      transform: scale(0.985);
    }
    90% {
      transform: scale(1);
    }
    100% {
      opacity: 1;
    }
  }

  .block{
    width: 100%;
    height: 100px;
    background-color: black;
  }

  @media only screen and (max-width: 1023px)  {
    .modal-content{
      margin-bottom: max(calc(5vw + 48px), calc(5vw + 10vw));
    }
  }

  @media only screen and (max-width: 669px){
    .modalBG{
      font-size: calc(90vw/(540/36));
    }
  }

</style>
