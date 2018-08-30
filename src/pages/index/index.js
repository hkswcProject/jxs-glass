// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from '@/store'
import router from './router'
import 'mint-ui/lib/style.css'
import http from '@/http'

// 导入Mint ui
import {Cell, Field, Navbar, TabItem, TabContainer, TabContainerItem, Popup, Button, Header,Checklist,Picker,Spinner,InfiniteScroll } from 'mint-ui'

Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Popup.name, Popup);
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Checklist.name, Checklist);
Vue.component(Picker.name, Picker);
Vue.component(Spinner.name, Spinner);
Vue.use(InfiniteScroll);

Vue.config.productionTip = false
Vue.use(http);
/* eslint-disable no-new */
Vue.filter('fmtTime', function (value) {
  if(value){
    return value.substring(0, value.lastIndexOf(':'));
  }else{
    return "";
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
