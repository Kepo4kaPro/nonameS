<template>
  <div class="filter-block">
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
    <div class="sort-block"></div>
  </div>
</template>

<script>
    export default {
     computed: {
       sortP(){
         return this.$store.getters["catalogs/data"].sort
       }
     },
     methods: {
        setSort(mode){
          this.$store.dispatch('catalogs/setSort', mode);
        }
      }
    }
</script>

<style scoped>
  .filter-block{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40px;
  }

  .sort-block{
    display: flex;
    align-items: center;
  }

  .icon-s{
    cursor: pointer;
    transition: background-color .25s, color .25s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    background-color: transparent;
    color: #000;
    margin: .05em;
    width: 1.5em;
    height: 1.5em;
    border-radius: .3em;
  }


  .icon-s.active{
    background-color: #000;
    color: #fff;
  }
</style>
