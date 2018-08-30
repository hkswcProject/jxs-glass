<template>
  <div>
    <div class="page-header-main">
      <mt-header title="我的订单" fixed>
        <router-link v-if="fromIndex" to="/index" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
  <div class="container">
    <div class="page-navbar">
      <mt-navbar class="page-part" v-model="selected" fixed style="top:40px;">
        <mt-tab-item id="1">全部</mt-tab-item>
        <mt-tab-item id="2">待付款</mt-tab-item>
        <mt-tab-item id="3">待加工</mt-tab-item>
        <mt-tab-item id="4">加工中</mt-tab-item>
        <mt-tab-item id="5">已完成</mt-tab-item>
        <mt-tab-item id="6">已取消</mt-tab-item>
      </mt-navbar>
      <mt-tab-container>
        <oi-one :orderStatus="orderStatusOne" :intView="selected==1" v-show="selected==1"></oi-one>
        <oi-two :orderStatus="orderStatusTwo" :intView="selected==2" v-show="selected==2"></oi-two>
        <oi-three :orderStatus="orderStatusThree" :intView="selected==3" v-show="selected==3"></oi-three>
        <oi-four :orderStatus="orderStatusFour"  :intView="selected==4" v-show="selected==4"></oi-four>
        <oi-five :orderStatus="orderStatusFive" :intView="selected==5" v-show="selected==5"></oi-five>
        <oi-six :orderStatus="orderStatusSix" :intView="selected==6" v-show="selected==6"></oi-six>
      </mt-tab-container>

    </div>
  </div>
  </div>
</template>

<script>
  import OrderItem from '@/components/OrderItem';
  import {getParam} from '@/utils/utils';
  export default {
    name: 'Order',
    data() {
      return {
        openId:'',
        selected: '1',
        fromIndex:false,
        orderStatusOne: -1,
        orderStatusTwo:0,
        orderStatusThree:1,
        orderStatusFour:2,
        orderStatusFive:9,
        orderStatusSix:10
      };
    },
    components:{
      'oi-one': OrderItem,
      'oi-two': OrderItem,
      'oi-three': OrderItem,
      'oi-four': OrderItem,
      'oi-five': OrderItem,
      'oi-six': OrderItem
    },
    created(){
      this.openId = getParam(this,'openId');
      if(this.openId){
        window.sessionStorage.removeItem("openId")
        window.sessionStorage.setItem("openId",this.openId);
      }
      this.fromIndex = this.$route.params.fromIndex;
      this.selected = '1';
    },
    methods: {

    }
  };
</script>

<style lang="less">
  @mainColor : #e52d11;
  .mint-tab-container-wrap {
    padding-top: 60px;
  }

  .mint-navbar {
    border-bottom: 1px solid #ececec;
  }

  .mint-tab-item {
    padding: 0 !important;

  &
  .is-selected {
    border-bottom: none !important;
    color: @mainColor !important;

  .mint-tab-item-label {
    border-bottom: 3px solid @mainColor;
  }

  }
  }

  .mint-tab-item-label {
    font-size: 14px;
    display: inline-block;
    padding: 17px 3px;
  }

  .mint-navbar.is-fixed {
    top: 40px;
  }
  .more_loading{
    text-align: center;
  }
  .more_loading span{
    width: 100%;
    text-align: center;
  }
</style>
