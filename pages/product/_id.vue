<template>
    <div class="main">
      <h1>{{data.name}}</h1>
      <div class="page">
        <div class="block">
          <Preview :def_url="data.others_pict"/>
        </div>
        <div class="block">
          <div class="costs">
              {{price | price-rub}}
          </div>
          <div class="text-box">
            <p>
              композиционная форма, которую используют в литературоведении и лингвистике для подробной характеристики предметов или явлений в целях создания художественного образа.
              Эту композиционную форму разделяют на описание предметов, описание процессов
            </p>
          </div>
          <ProductCompos :data="data.composition"/>
          <div class="select_price">
            Размер:
            <div class="con_sizes">
              <div class="sizes-bar">
                <div v-for="(value, index) in data.sizes"
                     v-bind:class="[index === select_size ? 'active' : '', data.sizes[index]['x'] ? '' : 'disable']"
                     v-on:click="change_size(index)"
                     class="seize_block">
                  {{data.sizes[index]['s']}}
                </div>
              </div>
              <div class="calcs-bar">
                <div class="seize_block calc_size" v-on:click="showm_size()"><font-awesome-icon class="icon_next" icon="calculator" /> <span>Размерная таблица</span></div>
              </div>
            </div>
          </div>
          <div class="cart-box">
            <div class="cart-block" v-on:click="add_cart()"><font-awesome-icon icon="cart-plus" /><p>Добавить в карзину</p></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data: function () {
      return {
        select_size: 1
      }
    },
    methods: {
      change_size(value){
        if(this.data.sizes[value]['x']){
          this.select_size = value;
        }
      },
      showm_size(){
        this.$store.dispatch('modalv/setModal', {name: "sizer", cat: this.data.catalog});
      },
      add_cart(){
        let id = this.$route.params.id;
        let size = this.select_size;

        let arrCard = localStorage.getItem('cart');
        if(!arrCard){
          arrCard = {}
        }else{
          arrCard = JSON.parse(arrCard)
        }
        let keys = Object.keys(arrCard);
        let is_copy;

        for(let i=0; i<keys.length; i++){
          if(arrCard[keys[i]].id === id && arrCard[keys[i]].size === size){
            arrCard[keys[i]].count++;
            is_copy = true;
            break;
          }
        }
        if(!is_copy){
          let newCard = {};
          newCard[0] = {
            id: id,
            size: size,
            count: 1,
            delite: false
          };
          for(let i=0; i<keys.length; i++){
            newCard[i+1] = arrCard[keys[i]];
          }

          localStorage.setItem('cart', JSON.stringify(newCard));
        }else{
          localStorage.setItem('cart', JSON.stringify(arrCard));
        }
        this.$store.dispatch('modalv/setModal', {name: "basket"});
      }
    },
    computed: {
      data(){
        return this.$store.getters["products/data"][this.$route.params.id];
      },
      price(){
        return Math.round(this.data.price*this.data.sizes[this.select_size]['x']);
      }
    },
    async fetch({store, params}) {
      if (!store.getters["products/data"] || !store.getters["products/data"][params.id]) {
        await store.dispatch('products/fetch', params.id);
      }
      store.dispatch('global/setColor', '#EBE6E8');
    }
  }
</script>

<style scoped>

  .select_price{
    font-size: 25px;
    background-color: #d7d7d7;
    border-radius: 0.4em;
    margin: 0.4em 0;
    padding: .2em;
  }
  .cart-box{
    font-size: 25px;
    margin: 2em 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-block{
    cursor: pointer;
    background-color: #000;
    border-radius: 0.4em;
    color: #fff;
    padding: .5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cart-block p{
    margin-left: 10px;
  }

  .con_sizes{
    display: flex;
    justify-content: space-between;
  }

  .sizes-bar{
    display: flex;
  }


  .seize_block{
    text-transform: uppercase;
    height: 1.8em;
    width: 1.8em;
    border-radius: .4em;
    background: white;
    margin: .2em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color .25s, background-color .25s;
  }

  .seize_block.active{
    background: black;
    color: white;
  }

  .seize_block.disable{
    background: white;
    color: #9b9b9b;
    cursor: default;
  }


  .seize_block.calc_size{
    text-transform: none;
    background-color: black;
    width: auto;
    color: white;
    padding: .5em;
  }

  .icon_next{
    margin-right: 10px;
  }

  .costs{
    background-color: black;
    max-height: 52px;
    width: 100%;
    border-radius: 10px;
    color: white;
    font-size: 24px;
    padding: .5em;
    text-align: center;
  }

  .text-box p{
    font-size: 18px;
    margin: 25px 0;
    text-align: justify;
    font-weight: 300;
    color: #7b7b7b;
  }

  .page{
    max-width: 1500px;
    width: 90vw;
    display: flex;
    justify-content: space-between;
  }
  .block{
    width: 100%;
    margin: 10px;

  }

  @media only screen and ( min-width: 1024px) and ( max-width: 1525px) {
    .seize_block.calc_size span{
      display: none;
    }
    .icon_next{
      margin-right: 0;
    }
  }

  @media only screen and ( max-width: 739px) {
    .seize_block.calc_size span{
      display: none;
    }
    .icon_next{
      margin-right: 0;
    }
  }

  @media only screen and (max-width: 1023px){
    .page{
      flex-direction: column;
      justify-content: flex-start;
    }
    .block{
      margin: 10px 0;
    }
  }
  @media only screen and (min-width: 1280px){
    .costs{
      margin-top: 50px;
    }
  }

  @media only screen and (max-width: 501px){
    .cart-block{
      width: 100%;
    }
    .select_price{
      font-size: 5vw;
    }
  }

  @media only screen and (max-width: 501px){
    .cart-block{
      width: 100%;
      font-size: 5vw;
    }
    .select_price{
      font-size: 5vw;
    }
  }

</style>
