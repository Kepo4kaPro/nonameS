<template>
  <div class="catalog">
    <div class="heading-box">
      <component :is="FilterH" v-if="sizeX && sizeX > 1023"/>
      <h2 class="heading">{{data.name}}</h2>
    </div>
    <div class="container" :class="isHiddenC ? 'hidden' : ''">
      <template v-for="item in this.content">
        <Product :data="item"/>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        isHiddenC: false,
        content: null
      }
    },
    computed: {
      sizeX(){
        return this.$store.getters["global/data"].sizeX
      },
      data(){
        return this.$store.getters["catalogs/data"]['catalogs'][this.$route.params.id];
      },
      sortT(){
        return this.$store.getters["catalogs/data"].sort
      }
    },
    created(){
      this.changeP();
    },
    methods:{
      FilterH(){
        return import("~/components/header/filterH")
      },
      changeP: function () {
        let arr = [...this.data.content];
        switch (this.sortT) {
          case 0 : {
            this.content = arr;
            break;
          }
          case 1 : {
            this.content = arr.sort((a, b) => a.name > b.name ? 1 : -1);
            break;
          }
          case 2 : {
            this.content = arr.sort((a, b) => b.name > a.name ? 1 : -1);
            break;
          }
          case 3 : {
            this.content = arr.sort((a, b) => a.price - b.price);
            break;
          }
          case 4 : {
            this.content = arr.sort((a, b) => b.price - a.price);
            break;
          }
        }
      }
    },
    watch: {
      sortT : function () {
        if(!this.isHiddenC) {
          let self = this;
          this.isHiddenC = true;
          setTimeout(function () {
            self.isHiddenC = false;
            self.changeP();
          }, 250)
        }
      }
    },
    async fetch({store, params}) {
      if (!store.getters["catalogs/data"] || !store.getters["catalogs/data"][params.id]) {
        await store.dispatch('catalogs/fetch', params.id);
      }
      store.dispatch('global/setColor', '#fff');
    },
    transition: 'transition-main',
    beforeDestroy() {
      let scrollChanc = 10;
      let time = 0;
      let timeInt = setInterval(() => {
        time+=0.005;
        let mathinc = Math.sin(Math.acos(time));
        if(mathinc){
          window.scrollBy(0,-Math.round(scrollChanc*mathinc))
        }
        if(time>=0.5){
          clearInterval(timeInt);
        }
      },1 )
    }
  }

</script>

<style scoped>
  .transition-main-leave-active{
    transition: .5s;
  }

  .transition-main-leave-active {
    opacity: 0;
  }

  .heading{
    font-size: 38px;
    font-weight: 500;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .heading-box{
    position: relative;
    height: 84px;
    margin-top: 15px;
  }

  .catalog{
    width: 100%;
    max-width: 1362px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .container{
    display: flex;
    flex-wrap: wrap;
    transition: opacity .25s;
  }
  .container.hidden{
    opacity: 0;
  }

  @media only screen and (min-width: 1600px) {
    .container, .heading-box {
      width: 1362px
    }
  }

  @media only screen and (max-width: 1599px) and (min-width: 1280px){
    .container, .heading-box {
      width: 85vw;
    }
  }

  @media only screen and (max-width: 1279px) and (min-width: 1024px){
    .container, .heading-box {
      width: 908px;
    }
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .container, .heading-box {
      width: 87.5vw;
    }
  }

  @media only screen and (max-width: 767px) and (min-width: 480px) {
    .container, .heading-box {
      width: 430px;
    }
  }

  @media only screen and (max-width: 479px){
    .container, .heading-box {
      width: 90vw;
    }
  }
</style>
