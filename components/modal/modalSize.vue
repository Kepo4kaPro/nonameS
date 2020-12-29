<template>
    <div v-if="data" class="modalSize">

      <p v-for="value in data.description"> {{value}} </p>

      <img :src="img" alt="">

      <table class="main-table">
        <tr>
          <td><span>Размер</span></td>
          <td v-for="value in data.sizes.dimen">
            <span>{{value}}</span>
          </td>
        </tr>

        <tr v-for="val_dat in data.sizes.sizes">
          <td>{{val_dat}}</td>
          <td v-for="value in data.sizes.data[val_dat]">
            {{value}}
          </td>
        </tr>
      </table>

    </div>
</template>

<script>
    export default {
      data() {
          return {
            data: null,
            img: null
          }
      },
      props:['props'],
      async created() {
        if (!this.$store.getters["vmodals/data"] || !this.$store.getters["vmodals/data"][this.props]) {
          await this.$store.dispatch('vmodals/fetch', this.props);
        }
        this.data = this.$store.getters["vmodals/data"][this.props];
        this.img = require(`../../assets/pct/sizer/png/${this.props}.png`);
      }
    }
</script>

<style scoped>
  .modalSize{
    font-size: 18px;
    position: relative;
    width: 100%;
    text-align: center;
  }
  p{
    font-weight: 100;
    color: #7b7b7b;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
  .modalSize img{
    width: 90%;
    object-fit: cover;
    margin: .4em 5%;
  }
  .main-table{
    width: 100%;
  }

  table {
    text-align: center;
  }

  table span {
    font-weight: bold;
  }

  table th, table td{
    padding: .4em .6em;
    text-transform: uppercase;
  }

  table tr:nth-child(2n) {background: #e8edff;}

  @media only screen and (max-width: 669px){
    .modalSize{
      font-size: calc(85.5vw/(540/25));
    }
  }

</style>
