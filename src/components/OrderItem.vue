<template>
  <mt-tab-container-item v-if="intView" :style="'height:'+divHeight" style="overflow: auto;" v-infinite-scroll="loadOrderList"
                         infinite-scroll-distance="10" :infinite-scroll-immediate-check="true">
    <template v-for="item in orderList">
      <a href="javascript:void(0);" @click="goPage(item.orderId)">
        <div class="widge">
          <div class="widge-title">
            <time>{{item.confirmTime|fmtTime}}</time>
            <span class="state invalid" v-if="item.orderStatus==0">待付款
            </span>
            <span class="state invalid" v-if="item.orderStatus==1">待加工</span>
            <span class="state invalid" v-if="item.orderStatus==2">加工中</span>
            <span class="state invalid" v-if="item.orderStatus==9">已完成
                <i class="iconfont icon-lajixiang" @click.stop="delOrder(item.orderId)"></i>
            </span>
            <span class="state invalid" v-if="item.orderStatus==10">已取消
                <i class="iconfont icon-lajixiang" @click.stop="delOrder(item.orderId)"></i>
            </span>
          </div>
          <div class="widge-body">
            <ul>
              <li>{{item.customerName}}{{item.customerPhone?' , '+item.customerPhone:''}}
                【
                <template v-if="item.optometryTypeId==1">普通验光</template>
                <template v-if="item.optometryTypeId==2">渐进验光</template>
                <template v-if="item.optometryTypeId==3">视功能检查</template>
                <template v-if="item.optometryTypeId==4">无需验光</template>
                <template v-if="item.orderServiceId==1">、购置镜片</template>
                <template v-if="item.orderServiceId==2">、加工镜片</template>
                】
              </li>
              <li>
                <template v-if="item.funcName">{{item.funcName}}</template>
                <template v-if="item.goodsName"> / {{item.goodsName}}</template>
              </li>
            </ul>
            <p class="remarks" v-if="item.orderRemark">备注：{{item.orderRemark}}</p>
          </div>
          <div class="widge-footer">
            <span class="order-number">订单号：{{item.orderSn}}</span>
            <span class="total" v-if="item.orderStatus!=0">实付款：<strong class="price">￥{{item.orderActualAmount?item.orderActualAmount.toFixed(2):'0.00'}}</strong></span>
            <span class="total" v-if="item.orderStatus==0">待付款：<strong class="price" style="color: red">￥{{item.pendingPayAmount?item.pendingPayAmount.toFixed(2):'0.00'}}</strong></span>
          </div>
        </div>
      </a>
    </template>

    <div class="more_loading">
      <mt-spinner type="fading-circle" :size="25" v-show="!allLoaded"></mt-spinner>
    </div>
  </mt-tab-container-item>
</template>
<script>
  import {Toast, MessageBox,Indicator} from 'mint-ui';
  export default {
    name: "orderItem",
    mounted(){

    },
    data() {
      return {
        divHeight: 0,
        pageNum: 1,
        pageSize: 10,
        //滚动加载
        loading: false,
        queryLoading: false,
        allLoaded: false,
        orderList: [],
      }
    },
    props: {
      intView:  {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      orderStatus: {
        type: Number,
        default: function () {
          return -1;
        }
      }
    },
    created(){
      this.divHeight = window.innerHeight - 88 + 'px';
      if(this.intView){
        this.loadOrderList();
      }
    },
    methods: {
      loadOrderList(){
        if (this.allLoaded) {
          return;
        }
        if (this.loading) {
          return;
        }
        this.loading = true;
        setTimeout(() => {

          this.axios({
            url: '/api/order/list',
            data: {
              openId: window.sessionStorage.getItem("openId"),
              orderStatus: this.orderStatus == -1 ? '' : this.orderStatus,
              pageNum: this.pageNum,
              pageSize: this.pageSize
            },
            method: 'post'
          }).then((res) => {
            if (res.data && res.data.dataList) {
              this.orderList = this.orderList.concat(res.data.dataList);
              this.pageNum += 1;
              this.allLoaded = this.orderList.length == res.data.totalCount;
            }else{
              this.allLoaded =true;
            }
            this.loading = this.allLoaded;
          }).catch((response) => {
            console.log(response);
          })
        }, 500);
      },
      delOrder(orderId){
        MessageBox.confirm('确定删除订单?').then(action => {
          Indicator.open('正在删除...');
          this.axios({
            url: '/api/order/delete',
            data: {
              openId: window.sessionStorage.getItem("openId"),
              orderId: orderId
            },
            method: 'post'
          }).then((res) => {
            Indicator.close();
              if (res.code == '0') {
                for(let i=0;i<this.orderList.length;i++){
                    if(orderId == this.orderList[i].orderId){
                      this.orderList.splice(i,1);
                    }
                }
              } else {
                Toast('订单删除失败');
              }
          }).catch((response) => {
             Indicator.close();
          })
        });
      },
      goPage(orderId){
        this.$router.push({
            name:'Payment',
            params:{
                orderId:orderId
            }
        });
      }
    },
    watch:{
      intView(val,oldVal){
        if(val){
          this.pageNum =1;
          this.loading =false;
          this.queryLoading = false;
          this.allLoaded = false;
          this.orderList =[];
          this.loadOrderList();
        }
      }
    },
    beforeDestroy(){
      Indicator.close();
    }
  };
</script>
