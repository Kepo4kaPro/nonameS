import Vue from 'vue'

Vue.filter('basket', function (value) {
  return value >= 99 ? 99 : Math.floor(value);
});
