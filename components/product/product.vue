<template>
    <nuxt-link no-prefetch class="product" :to="`/product/${data.id}`">
      <img :src="getPct" alt="">
      <div class="name_correct">
        <div class="name">{{data.name}}</div>
      </div>
      <div class="price">{{data.price | price-rub}}</div>
      <div class="target">
        перейти
      </div>
    </nuxt-link>
</template>

<script>
    import getPict from "../../static/getPict";
    export default {
      props:['data'],
      computed: {
        getPct(){
          return getPict('webp', this.data.main_pict)
        }
      }
    }
</script>

<style scoped>
  .product{
    color: #000 !important;
    text-decoration: none;
    width: 430px;
    height: 510px;
    font-size: 24px;
    cursor: pointer;
    position: relative;
    margin: 1.45em .5em;
    border-radius: 1.25em;
    transition: background-color .4s;
    overflow: hidden;
  }
  .product:hover{
    background: rgba(0,0,0,0.5);
  }

  .product:hover .name{
    color: #F5F5F5;
  }

  .name{
    transition: color .5s;
    float: right;
    min-width: 42%;
    text-align: center;
    padding: .5em 0;
  }

  .name_correct{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 63%;
  }

  .price{
    position: absolute;
    bottom: 0;
    right: 0;
    width: 35%;
    padding: .5em 0;
    background: black;
    color: white;
    text-align: center;
    border-radius: 1.25em 0 0 0;
  }

  img{
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    width: 80%;
    pointer-events: none;
    user-select: none;
  }

  .target{
    position: absolute;
    color: black;
    left: 50%;
    top: 60%;
    background-color: #F5F5F5;
    opacity: 0;
    width: 50%;
    padding: 4% 0;
    text-align: center;
    border-radius: 30px;
    transform: translate(-50%, -50%);
    transition: opacity .25s, top .25s;
  }

  .product:hover .target{
    opacity: 1;
    top: 50%;
  }

  @media only screen and (max-width: 1599px) and (min-width: 1280px){
    .product {
      width: calc((85vw - 72px)/3);
      height: calc((85vw - 72px)/3*510/430);
      font-size: calc((85vw - 72px)/3*24/430);
      margin: calc((85vw - 72px)/3*35/430) calc((85vw - 72px)/3*12/430);
    }
  }

  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .product{
      width: calc((87.5vw - 48px)/2);
      height: calc((87.5vw - 48px)/2*510/430);
      font-size: calc((85vw - 48px)/2*24/430);
      margin: calc((85vw - 48px)/2*35/430) calc((85vw - 48px)/2*12/430);
    }
  }

  @media only screen and (max-width: 768px) {
    img{
      width: 83.5%;
    }
  }


  @media only screen and (max-width: 479px) {
    .product {
      width: 90vw;
      height: 106.74vw;
      font-size: 5.023vw;
      margin: 7.29vw 2.5vw;
    }
  }
</style>
