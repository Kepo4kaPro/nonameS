<template>
    <div class="main-basket">
        <div class="li-products">
          Список товаров:
          <div v-bind:class="Object.keys(data).length === 0 ? '' : 'delite'" class="td-product demo-p">
              Перейти к каталогу
          </div>
          <div
            v-for="(value, index) in data"
            v-if="products[value.id]"
            v-bind:class="{delite: value.delite}"
            class="td-product">

            <font-awesome-icon class="close_mv" icon="times" v-on:click="delite(index)"/>
            <div class="img-box" v-on:click="gou_product(value.id)">
              <img :src="getPict(value.id)" alt="">
            </div>
            <div class="descript-box">
               <p class="name">{{products[value.id].name}}</p>
              <div class="bottom-box">
                  <div class="size-box">{{products[value.id].sizes[value.size]['s']}}</div>
                  <div class="len-size">
                    <font-awesome-icon class="len-size-i" icon="minus" v-on:click="shcnge_coll(index,-1)"/>
                    <p>{{value.count}}</p>
                    <font-awesome-icon class="len-size-i" icon="plus" v-on:click="shcnge_coll(index,1)"/>
                  </div>
                  <div class="price-box">
                    {{Math.round(products[value.id].price*products[value.id].sizes[value.size]['x']) | price-rub}}
                  </div>
              </div>
            </div>
          </div>
          <p>Итого : <span class="total-price">{{total | price-rub}}</span></p>
          <form class="promo-block" v-on:submit.prevent="">
            <div class="promo-in">
              <div class="input-box">
                <input type="text" placeholder=" " required>
                <div class="placeholder">Промокод</div>
              </div>
            </div>
            <input class="sub-black promo-key" type="submit" value="Применить">
          </form>
          <div class="submit-basket">
            <input class="sub-black" type="submit" value="Купить" :disabled="!data || Object.keys(data).length < 1">
          </div>
        </div>
    </div>
</template>

<script>
    import getPict from "../../static/getPict";
    export default {
      data(){
        return{
          data: {
          },
        }
      },
      async created() {
        this.data = JSON.parse(localStorage.getItem('cart'));
        let keys = Object.keys(this.data);
        for(let i=0; i<keys.length; i++){
          let id = this.data[keys[i]].id;
          if (!this.$store.getters["products/data"] || !this.$store.getters["products/data"][id]) {
            await this.$store.dispatch('products/fetch', id);
          }
        }
        this.$store.dispatch('global/updateBasket');
      },
      computed:{
        products(){
          return this.$store.getters["products/data"];
        },
        total(){
          let price = 0;
          let keys = Object.keys(this.data);
          for (let i=0; i<keys.length; i++){
            let val = this.data[keys[i]];
            console.log(this.products[val.id].count);
            price+= this.products[val.id].price*val.count;
          }
          return price;
        }
      },
      methods:{
        getPict(id){
          return getPict('webp', this.products[id].main_pict)
        },
        gou_product(id){
          this.$emit('close');
          this.$router.replace({ path: '/product/'+id});
        },
        shcnge_coll(index,val){
          this.data[index].count+=val;
          if(this.data[index].count<=0){
            this.data[index].count = 1;
          }else if(this.data[index].count>=10){
            this.data[index].count = 9;
          }
          this.save_card();
        },
        delite(index){
          let self = this;
          let data = this.data[index];
          data['delite'] = true;
          this.$set(this.data, index, data );
          setTimeout(function () {
            self.$delete(self.data, index);
            self.save_card();
          },  250);
        },
        save_card(){
          localStorage.setItem('cart', JSON.stringify(this.data));
          this.$store.dispatch('global/updateBasket');
        }
      }
    }
</script>

<style scoped>

  .submit-basket{
    margin-top: .5em;
  }

  .total-price{
    float: right;
    font-weight: 700;
  }

  .promo-block{
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    margin: .5em 0 0 0;
  }
  .promo-in{
    width: 75%;
  }

  .sub-black{
    width: 100%;
    height: 2.9em;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 0.4em;
    font-size: 1em;
    transition: background-color .25s;
  }
  .sub-black:disabled{
    background-color: #383838;
    cursor: unset;
  }

  .sub-black.promo-key{
    width: 23.5%;
  }

  .main-basket{
    width: 100%;
  }
  .li-products{
    width: 100%;
    font-size: 24px;
  }
  .td-product{
    font-size: 25px;
    width: 100%;
    height: 6em;
    border-radius: 0.4em;
    margin: 0.5em 0;
    background-color: #d7d7d7;
    position: relative;
    overflow: hidden;
    display: flex;
    max-height: 150px;
  }

  .demo-p{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    transition: .25s;
  }

  .td-product.delite{
    transition: .25s;
    margin: 0;
    max-height: 0;
    opacity: 0;
  }

  .close_mv{
    z-index: 99;
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
  }

  .img-box{
    height: 6em;
    width: 6em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .descript-box{
    position: relative;
    height: 6em;
    width: 15.6em;
  }

  .name{
    width: 100%;
    height: 2em;
    font-size: 1.2em;
    padding: .5em .2em;
  }
  .bottom-box{
    height: 3.6em;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .price-box{
    text-align: center;
    background-color: #000;
    color: #fff;
    width: 5em;
    padding: .5em 0;
    border-radius: 0.4em 0 0 0;
  }

  .len-size{
    height: 1.9em;
    width: 4em;
    margin: .2em;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .len-size p {
    font-size: 1.2em;
  }
  .len-size-i{
    cursor: pointer;
    user-select: none;
  }

  .size-box{
    text-transform: uppercase;
    background-color: #000;
    color: #fff;
    width: 2.2em;
    height: 1.9em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.4em;
    margin: .2em;
  }


  .img-box img{
    height: 90%;
    object-fit: cover;
  }

  @media only screen and (max-width: 669px){
    .td-product{
      font-size: calc(85.5vw/(540/25));
    }
    .sub-black, .input-box, .li-products, .promo-block{
      font-size: calc(85.5vw/(540/24));
    }
  }

</style>
