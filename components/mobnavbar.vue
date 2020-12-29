<template>
  <div class="navbar">





    <ul class="default-navbar">
      <div class="link">
        <font-awesome-icon v-bind:icon="bars.isShow && !bars.isAnimH ? 'caret-square-down' : 'bars'" v-on:click="showPageBars()"/></div>
      <div class="link" style="transition: .25s" :class="search.isAnim ? 'activeS' : ''" @click="activeSearch()"> <font-awesome-icon icon="search" /> </div>
      <div class="link"  @click="activeFilters()"> <font-awesome-icon icon="filter" /> </div>
      <div class="link" v-on:click="showm_basket()">
        <font-awesome-icon icon="shopping-basket" />
        <span v-if="basketCount" >{{basketCount | basket}}</span>
      </div>
      <div class="link" @click="open_account()"> <font-awesome-icon icon="user" /></div>
    </ul>

    <div v-if="bars.isShow" class="navigation">
      <div class="background" v-bind:class="{show: bars.isAnim, hide: bars.isAnimH}">
        <ul class="default-pages">
          <NuxtLink
            v-for="link in links"
            :key="link.name"
            class="link"
            :to="link.to">
            <li @click="closeBars()">{{link.name}}</li>
          </NuxtLink>
        </ul>
      </div>
    </div>



    <div v-if="search.isShow" :class="search.isAnim ? 'show' : ''" class="searchBox">
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

    <div v-if="filter.isShow" :class="filter.isAnim ? 'show' : ''" class="searchBox">
      <div class="sort-block">
          <div class="icon-s" :class="sortP === 0 ? 'active' : ''" @click="setSort(0)">
            <font-awesome-icon icon="sort-down" />
          </div>
          <div class="icon-s" :class="sortP === 1 ? 'active' : ''" @click="setSort(1)">
            <font-awesome-icon icon="sort-alpha-down" />
          </div>
          <div class="icon-s" :class="sortP === 2 ? 'active' : ''" @click="setSort(2)">
            <font-awesome-icon icon="sort-alpha-up" />
          </div>
          <div class="icon-s" :class="sortP === 3 ? 'active' : ''" @click="setSort(3)">
            <font-awesome-icon icon="sort-amount-up-alt" />
          </div>
          <div class="icon-s" :class="sortP === 4 ? 'active' : ''" @click="setSort(4)">
            <font-awesome-icon icon="sort-amount-down" />
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {StaticLinks} from "../static/links";
    export default {
      data(){
        return{
          bars:{
            isShow: false,
            isAnim: false,
            isAnimH: false
          },
          search:{
            isShow: false,
            isAnim: false,
          },
          filter:{
            isShow: false,
            isAnim: false,
          }
        }
      },
      computed:{
        basketCount(){
          return this.$store.getters["global/data"].basketCount;
        },
        links(){
          return StaticLinks;
        },
        sortP(){
          return this.$store.getters["catalogs/data"].sort
        },
        account(){
          return this.$store.getters["account/data"];
        }
      },
      methods:{
        open_account(){
          if(this.account)
            this.$router.push('/account');
          else
            this.$store.dispatch('modalv/setModal', {name: "login"});
        },
        setSort(mode){
          this.$store.dispatch('catalogs/setSort', mode);
        },
        showm_basket(){
          this.$store.dispatch('modalv/setModal', {name: "basket"});
        },
        showPageBars(){
          if(!this.bars.isShow){
            //Close
            if(this.filter.isShow){
              this.closeFilters()
            }
            if(this.search.isShow){
              this.closeSearch()
            }
            let self = this;
            this.bars.isShow = true;
            setTimeout(function () {
              self.bars.isAnim = true
            }, 10)
          }else this.closeBars()

        },
        closeBars(){
          if(!this.bars.isAnimH){
            let self = this;
            this.bars.isAnimH = true;
            setTimeout(function () {
              self.bars.isShow = false;
              self.bars.isAnim = false;
              self.bars.isAnimH = false
            }, 500)
          }
        },
        activeSearch(){
          if(!this.search.isShow){

            //Close
            if(this.filter.isShow){
              this.closeFilters()
            }
            if(this.bars.isShow){
              this.closeBars()
            }

            let self = this;
            this.search.isShow = true;
            setTimeout(function () {
              self.search.isAnim = true;
            }, 10)
          }else this.closeSearch()
        },
        closeSearch(){
          if(this.search.isAnim){
            let self = this;
            this.search.isAnim = false;
            setTimeout(function () {
              self.search.isShow = false;
            }, 250)
          }
        },
        activeFilters(){
          if(!this.filter.isShow){

            //Close
            if(this.search.isShow){
              this.closeSearch()
            }
            if(this.bars.isShow){
              this.closeBars()
            }


            let self = this;
            this.filter.isShow = true;
            setTimeout(function () {
              self.filter.isAnim = true;
            }, 10)
          }else this.closeFilters();
        },
        closeFilters(){
          if(this.filter.isAnim){
            let self = this;
            this.filter.isAnim = false;
            setTimeout(function () {
              self.filter.isShow = false;
            }, 250)
          }
        }
      }
    }
</script>

<style scoped>
  .navbar{
    position: fixed;
    bottom: 0;
    width: 100%;
    min-height: 48px;
    height: 10vw;
    background-color: #000;
    box-shadow: 0 0 2px #fff;
    z-index: 999;
    font-size: 24px;
  }
  .navigation{
    position: absolute;
    top: calc(-100vh + 48px);
    height: calc(100vh - 48px);
    width: 100%;
    overflow: hidden;
  }

  .search-block{
    margin: 0 .7%;
    height: 100%;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-in{
    width: 100%;
  }

  .searchBox{
    position: absolute;
    height: 0;
    width: 100%;
    top: 0;
    background-color: #000;
    transition: .25s;
    overflow: hidden;
  }

  .searchBox.show{
    top: -2em;
    height: 100%;
    border-bottom: solid 1px white;
    box-shadow: 0 0 2px #fff;
  }

  .sort-block{
    padding: 0 10%;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon-s{
    cursor: pointer;
    transition: background-color .25s, color .25s;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    color: #fff;
    margin: .05em;
    width: 1.5em;
    height: 1.5em;
    border-radius: .3em;
  }
  .icon-s.active{
    background-color: #fff;
    color: #000;
  }



  .default-pages{
    z-index: 2;
    font-size: 32px;
  }
  .default-pages li{
    margin: .4em;
  }
  .background{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0;
    width: 0;
    background-color: black;
    border-radius: 0 100% 0 0;
    opacity: 0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 50% 50% 10% 0;
  }
  .background.show{
    height: 150%;
    width: 150%;
    border-bottom: solid 1px white;
    transition: .75s;
    opacity: 1;
  }
  .background.hide{
    transition: .5s;
    opacity: 0;
  }

  .default-navbar{
    height: 100%;
    width: 95%;
    margin: 0 2.5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .link{
    text-align: center;
    list-style: none;
    color: white;
    text-decoration: none;
    position: relative;
  }

  .link.activeS{
    margin-top: -.15em;
    transform: rotate(45deg);
  }

  .default-navbar .link span{
    position: absolute;
    transform: translate(-50%, -50%);
    background-color: #fff;
    color: #000;
    font-size: .6em;
    padding: .1em .2em;
    border-radius: .4em;
    border: solid #000 .2em;
    top: .3em;
    left: 2em;
  }

  .default-navbar li{
    list-style: none;
  }

  @media only screen and (min-width: 481px){
    .navbar{
      font-size: 5vw;
    }
    .search-block{
      font-size: 3vw;
    }
  }

</style>
