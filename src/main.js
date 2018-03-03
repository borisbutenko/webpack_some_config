import Vue from 'vue';
import App from './components/App';

window.vm = new Vue({
  el: '#app',

  render: cb => cb(App),

  created() {
    console.log(`I'm created!`);
  }
});