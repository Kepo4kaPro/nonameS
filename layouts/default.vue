<template>
  <div style="transition: 1s" v-bind:style="{ backgroundColor: bg_color}">
    <Header/>
    <div class="page">
        <Nuxt />
    </div>
    <component :is="mobnavbar" v-if="sizeX && sizeX <= 1023"/>
    <Footer />
    <modalv v-if="isModalR"/>
    <animstart/>
  </div>
</template>


<script>
  export default {
    computed: {
      bg_color(){
        return this.$store.getters["global/data"].bg_color;
      },
      sizeX(){
        return this.$store.getters["global/data"].sizeX
      },
      isModalR(){
        return this.$store.getters["modalv/data"].is_render;
      }
    },
    methods: {
      mobnavbar(){
        return import("~/components/mobnavbar")
      },
      modalv(){
        return import("~/components/modalv")
      },
      onResize() {
        this.$store.dispatch('global/updateSizeX', window.innerWidth);
      }
    },
    mounted() {
      let token = localStorage.getItem('Authorization');
      if(token){
        this.$axios.defaults.headers.Authorization = token;
        this.$store.dispatch('account/fetch');
      }
      this.onResize();
      this.$store.dispatch('global/updateBasket');
      window.addEventListener('resize', this.onResize, {passive: true});
    }
  }
</script>

<style>
  @font-face {
    font-family: Futura;
    src: url('~assets/fonts/futuramediumc.otf') format('truetype');
    font-display: swap;
  }
  ::-webkit-scrollbar
  {
    width: 0;
  }

  input[type="submit"]{
    cursor: pointer;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Futura, sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: none;
  }
  h1{
    margin: .95em 0 0;
    text-align: center;
    font-size: 45px;
    font-weight: 500;
  }
  .page{
    min-height: calc(100vh - (200px + 65px));
    display: flex;
    justify-content: center;
  }
  .input-box{
    width: 100%;
    position: relative;
    font-size: 1em;
  }
  .input-box input{
    width: 100%;
    height: 2.9em;
    border: none;
    background-color: #d7d7d7;
    font-size: 1em;
    border-radius: 0.4em;
    color: #333333;
    font-weight: 700;
    padding: .58em .41em 0 .41em;
    font-family: sans-serif;
  }
  .input-box .placeholder{
    position: absolute;
    top: 0;
    left: 1em;
    font-weight: 700;
    font-size: .66em;
    font-family: sans-serif;
    line-height: 4.37em;
    user-select: none;
    pointer-events: none;
    color: #565656;
    transition: top .25s, left .25s, color .25s;
  }
  .input-box input:not(:placeholder-shown) ~ .placeholder,
  .input-box input:focus ~ .placeholder {
    left: .625em;
    top: -1em;
  }
  .input-box input:not(:placeholder-shown):invalid ~ .placeholder{
    color: #c32b36;
  }

  .search-in{
    width: 100%;
  }
  .search-key{
    position: absolute;
    right: .45em;
    height: 2.4em;
    width: 2.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    border-radius: .25em;
    color: #fff;
  }
  .search-key-input{
    position: absolute;
    background: none;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
