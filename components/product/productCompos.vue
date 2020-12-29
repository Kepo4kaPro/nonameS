<template>
  <div class="composition">
    Состав:
    <div class="container">

      <div v-for="(value, index) in data"
           class="block"
           v-bind:style="{width: data[index].part + '%'}"
           v-bind:class="[data[index].name]">
        {{data[index].part}}%<span> - {{data[index].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['data'],
    mounted() {
      console.log(this.data);
    }
  }
</script>

<style scoped>
  .composition{
    position: relative;
    font-size: 25px;
    width: 100%;
    height: 6.25em;
    background-color: #d7d7d7;
    border-radius: .4em;
    margin: .4em 0;
    padding: .2em;
  }
  .container{
    width: 100%;
    height: 78.5%;
    margin-top: .1em;
    border-radius: .4em;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }



  .block.cotton{
    background-image: linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url("~assets/clap.jpg");
  }
  .block.polyester{
    background-image: linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url("~assets/polyestr.jpg");
  }


  .block{
    height: 100%;
    border-radius: .4em;
    border: .15em solid transparent;
    transition: .25s;
    background-clip: padding-box;
    white-space: nowrap;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    min-width: 55px;
  }
  .block span{
    font-weight: 500;
    display: none;
  }

  .container:hover .block{
    width: 2% !important;
  }
  .container:hover .block{
    color: transparent;
    min-width: 0;
  }

  .container:hover .block:hover span{
    display: contents;
  }

  .container:hover .block:hover{
    width: 100% !important;
    color: white;
  }

  @media only screen and (max-width: 479px){
    .composition{
      font-size: 5vw;
    }
  }
</style>
