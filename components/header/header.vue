<template>
  <header class="header" style="color: white">
    <component :is="HeaderPC" v-if="sizeX && sizeX > 1023"/>
    <NuxtLink to="/">
      <div class="conten-box">
        <div class="name-box">
          <div class="content-area">
            NoNAME
          </div>
        </div>
      </div>
    </NuxtLink>
  </header>
</template>

<script>
  export default {
    computed:{
      sizeX(){
        return this.$store.getters["global/data"].sizeX
      }
    },
    methods:{
      HeaderPC(){
        return import("~/components/header/headerPC")
      }
    }
  }
</script>

<style scoped>

  .header{
    width: 100%;
    min-height: 65px;
    background: black;
    position: relative;
  }

  .conten-box{
    margin-top: -1px;
    left: 90px;
    cursor: pointer;
    top: 35px;
    user-select: none;
  }

  @media only screen and (max-width: 1023px){
    .contentv{
      display: none;
    }
  }


</style>
