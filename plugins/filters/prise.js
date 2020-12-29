import Vue from 'vue'

Vue.filter('price-rub', function (value) {
  return String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ") + ' RUB';
});
