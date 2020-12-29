<template>
  <div class="header-box">
    <div class="contentv">
      <ul class="default-header">
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          class="link"
          :to="link.to">
          <li>{{link.name}}</li>
        </NuxtLink>
      </ul>
      <div class="privat">
        <div class="icon_next" @click="activeSearch()" :class="search.isAnim ? 'showS' : ''">
          <font-awesome-icon icon="search" />
        </div>
        <div class="icon_next" v-on:click="showm_basket()">
          <font-awesome-icon icon="shopping-basket"/>
          <span v-if="basketCount" >{{basketCount | basket}}</span>
        </div>
        <div class="icon_next" v-on:click="open_account()">
          <font-awesome-icon icon="user" />
        </div>
      </div>
    </div>
    <div v-if="search.isShow" class="search-panel" :class="search.isAnim ? 'show' : ''">
      <form class="search-block" v-on:submit.prevent="">
        <div class="search-in">
          <div class="input-box">
            <input type="text" placeholder=" " required>
            <div class="placeholder">Что ищем?</div>
          </div>
        </div>
        <div class="search-key">
          <font-awesome-icon icon="search" />
          <input class="search-key-input" type="submit" value="">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {StaticLinks} from "../../static/links";
    export default {
      data(){
        return {
          search:{
            isShow: false,
            isAnim: false,
          }
        }
      },
      computed:{
        basketCount(){
          return this.$store.getters["global/data"].basketCount;
        },
        account(){
          return this.$store.getters["account/data"];
        },
        links(){
          return StaticLinks;
        }
      },
      methods:{
        open_account(){
          if(this.account)
            this.$router.push('/account');
          else
            this.$store.dispatch('modalv/setModal', {name: "login"});
        },
        showm_basket(){
          this.$store.dispatch('modalv/setModal', {name: "basket"});
        },
        activeSearch(){
          let self = this;
          if(!this.search.isShow){
            this.search.isShow = true;
            setTimeout(function () {
              self.search.isAnim = true;
            }, 10)
          }else if(this.search.isAnim){
            this.search.isAnim = false;
            setTimeout(function () {
              self.search.isShow = false;
            }, 250)
          }
        }
      }
    }
</script>

<style scoped>
  .contentv{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-panel{
    width: 100%;
    height: 0;
    background: #000;
    border-top: solid 1px #fff;
    transition: .25s;
    overflow: hidden;
  }

  .search-panel.show{
    height: 70px;
  }

  .search-block{
    position: relative;
    width: 750px;
    margin: 0 auto;
    height: 100%;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .default-header{
    margin: 0 200px;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 65px;
    font-size: 15px;
    color: #fff;
    text-transform: uppercase;
  }

  .default-header li{
    list-style: none;
    position: relative;
    margin: 0 20px;
  }

  .default-header li:hover::before,
  .default-header li:hover::after{
    width: 75%;
    opacity: 1;
  }

  .default-header li::before,
  .default-header li::after
  {
    transition: width .75s, opacity .75s;
    position: absolute;
    content: '';
    height: 2px;
    width: 0;
    background-color: white;
    opacity: 0;
  }

  .default-header li::before{
    top: -5px;
    right: 0;
  }

  .default-header li::after{
    top: 20px;
    left: 0;
  }

  .default-header .link{
    color: white;
    text-decoration: none;
  }

  .privat{
    position: absolute;
    height: 100%;
    top: 50%;
    right: 50px;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .icon_next{
    position: relative;
    font-size: 24px;
    margin: 0 10px;
    cursor: pointer;
    transition: transform .25s;
  }

  .icon_next.showS{
    transform: rotate(45deg);
  }

  .icon_next span{
    position: absolute;
    background-color: #fff;
    color: #000;
    font-size: 14px;
    padding: 1px 2px;
    border-radius: 5px;
    top: -15px;
    left: 26px;
  }

  @media only screen and (max-width: 1399px){
    .privat{
      right: -30px;
    }
  }
</style>
