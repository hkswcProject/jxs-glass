<template>
  <div>
    <div class="page-header-main">
      <mt-header title="提交订单" fixed>
        <a href="javascript:void(0);" slot="left" @click="goBack">
          <mt-button icon="back">返回</mt-button>
        </a>
      </mt-header>
    </div>
    <div class="container hasBtmBar">
      <div :style="'overflow:auto;height:'+divHeight">
        <!-- 顾客信息 -->
        <div class="panel-wrap">
          <div class="panel-body">
            <div class="customer-info">
              <span class="iconfont icon-weizhixiangqing"></span>
              <div class="info-wrap">
                <div class="base-info">
                  <span>顾客名称：{{orderData.customerName}}</span>
                  <span>{{orderData.customerPhone}}</span>
                </div>
                <span>档口位置：{{orderData.shopName}}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 验光数据 -->
        <div class="panel-wrap">
          <div class="panel-body">
            <div class="detail-data">
              <div class="itemTitle">验光数据</div>
              <div class="itemBody">
                <div class="price-data">
                  <div class="item-name" v-if="orderData.optometryTypeId==1">普通验光</div>
                  <div class="item-name" v-if="orderData.optometryTypeId==2">渐进验光</div>
                  <div class="item-name" v-if="orderData.optometryTypeId==3">视功能检查</div>
                  <div class="item-name" v-if="orderData.optometryTypeId==4">无需验光</div>
                  <span class="price">￥{{orderData.optometryAmount?orderData.optometryAmount.toFixed(2):'0.00'}}</span>
                </div>
                <div class="testing-data">
                  <div class="data-item">
                    <span class="item-name">右眼近视度数</span>
                    <span class="deg">{{orderData.myopicRight?orderData.myopicRight:''}}</span>
                  </div>
                  <div class="data-item">
                    <span class="item-name">左眼近视度数</span>
                    <span class="deg">{{orderData.myopicLeft?orderData.myopicLeft:''}}</span>
                  </div>
                  <div class="data-item">
                    <span class="item-name">右眼散光度数</span>
                    <span class="deg">{{orderData.astigmiaRight?orderData.astigmiaRight:''}}</span>
                  </div>
                  <div class="data-item">
                    <span class="item-name">左眼散光度数</span>
                    <span class="deg">{{orderData.astigmiaLeft?orderData.astigmiaLeft:''}}</span>
                  </div>
                  <div class="data-item">
                    <span class="item-name">右眼轴位</span>
                    <span class="deg">{{orderData.axialRight?orderData.axialRight:''}}</span>
                  </div>
                  <div class="data-item">
                    <span class="item-name">左眼轴位</span>
                    <span class="deg">{{orderData.axialLeft?orderData.axialLeft:''}}</span>
                  </div>
                  <div class="data-item">
                    <span class="item-name">瞳距</span>
                    <span class="deg">{{orderData.eyePd?orderData.eyePd+'mm':''}}</span>
                  </div>
                  <div class="data-item">
                    <span class="item-name">瞳高</span>
                    <span class="deg">{{orderData.eyeVd?orderData.eyeVd+'mm':''}}</span>
                  </div>
                  <div class="data-item">
                    <span class="item-name">ADD</span>
                    <span class="deg">{{orderData.eyeAdd?orderData.eyeAdd:''}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 镜片信息 -->
        <div class="panel-wrap" v-if="orderData.goodsId">
          <div class="panel-body">
            <div class="detail-data">
              <div class="itemTitle">镜片</div>
              <div class="itemBody">
                <div class="price-data">
                  <div class="item-name">{{orderData.good.funcName}} /
                    {{orderData.good.goodsName}}
                  </div>
                  <span class="price">￥{{orderData.goodsAmount.toFixed(2)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 加工服务 -->
        <div class="panel-wrap" v-if="orderData.frameTypeId">
          <div class="panel-body">
            <div class="detail-data">
              <div class="itemTitle">加工服务</div>
              <div class="itemBody">
                <div class="price-data" v-if="orderData.varietyId">
                  <div class="item-name">镜片品种</div>
                  <span>{{orderData.varietyName}}</span>
                </div>
                <div class="price-data" v-if="orderData.frameTypeId">
                  <div class="item-name" v-show="orderData.frameTypeId==1">全框</div>
                  <div class="item-name" v-show="orderData.frameTypeId==2">半框</div>
                  <div class="item-name" v-show="orderData.frameTypeId==3">无框</div>
                  <span class="price">￥{{orderData.varietyPrice.toFixed(2)}}</span>
                </div>
                <div class="price-data" v-if="orderData.frameName">
                  <div class="item-name">镜框型号</div>
                  <span>{{orderData.frameName}}</span>
                </div>
                <div class="price-data" v-if="orderData.isSideCut">
                  <div class="item-name">切边</div>
                  <span class="price">￥{{orderData.sideCutPrice.toFixed(2)}}</span>
                </div>
                <div class="price-data" v-if="orderData.isHighScatter">
                  <div class="item-name">高散</div>
                  <span class="price">￥{{orderData.highScatterPrice.toFixed(2)}}</span>
                </div>
                <div class="price-data" v-if="orderData.isSuper10d">
                  <div class="item-name">超10D</div>
                  <span class="price">￥{{orderData.super10dPrice.toFixed(2)}}</span>
                </div>
                <div class="price-data" v-if="orderData.isSuper20d">
                  <div class="item-name">超20D</div>
                  <span class="price">￥{{orderData.super20dPrice.toFixed(2)}}</span>
                </div>
                <div class="price-data" v-if="orderData.isFullFrame">
                  <div class="item-name">全框抛光</div>
                  <span class="price">￥{{orderData.fullFramePrice.toFixed(2)}}</span>
                </div>
                <div class="price-data" v-if="orderData.isTortoiseShell">
                  <div class="item-name">玳瑁（动物制品）</div>
                  <span class="price">￥{{orderData.tortoiseShellPrice.toFixed(2)}}</span>
                </div>
              </div>
              <div class="itemTitle">备注</div>
              <div class="itemBody">
                <p>{{orderData.orderRemark}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部支付 -->
      <div class="btmBar">
        <div class="btnWrap">
          <span class="total">合计：<strong
            class="price">{{orderData.orderAmount?orderData.orderAmount.toFixed(2):'0.00'}}</strong></span>
          <a href="javascript:void(0);" @click="subOrder" class="paymentBtn">马上支付</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {Toast, Indicator} from 'mint-ui';
  import wexinPay from '@/utils/wexinPay';

  export default {
    name: 'ImmediatePay',
    created() {
      this.$nextTick(function(){
        this.divHeight = window.innerHeight - 85 + 'px';
      });

    },
    data() {
      return {
        orderId: '',
        divHeight: 0
      }
    },
    methods: {
      //提交数据
      subOrder() {
        if (this.orderId) {
          Indicator.open('提交中...');
          this.goPay();
        } else {
          var order = this.orderData;
          var params = {
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            optometryTypeId: order.optometryTypeId,
            myopicLeft: order.myopicLeft ? order.myopicLeft : '',
            myopicRight: order.myopicRight ? order.myopicRight : '',
            astigmiaLeft: order.astigmiaLeft ? order.astigmiaLeft : '',
            astigmiaRight: order.astigmiaRight ? order.astigmiaRight : '',
            axialLeft: order.axialLeft ? order.axialLeft : '',
            axialRight: order.axialRight ? order.axialRight : '',
            eyePd: order.eyePd ? order.eyePd : '',
            eyeVd: order.eyeVd ? order.eyeVd : '',
            eyeAdd: order.eyeAdd ? order.eyeAdd : '',
            orderServiceId: order.orderServiceId,
            goodsId: order.goodsId,
            varietyId: order.varietyId,
            varietyName: order.varietyName,
            frameTypeId: order.frameTypeId,
            frameName:order.frameName,
            isSideCut: order.isSideCut ? 1 : 0,
            isHighScatter: order.isHighScatter ? 1 : 0,
            isSuper10d: order.isSuper10d ? 1 : 0,
            isSuper20d: order.isSuper20d ? 1 : 0,
            isFullFrame: order.isFullFrame ? 1 : 0,
            isTortoiseShell: order.isTortoiseShell ? 1 : 0,
            optometryAmount: order.optometryAmount,
            goodsAmount: order.goodsAmount,
            varietyPrice: order.varietyPrice,
            sideCutPrice: order.sideCutPrice,
            highScatterPrice: order.highScatterPrice,
            super10dPrice: order.super10dPrice,
            super20dPrice: order.super20dPrice,
            fullFramePrice: order.fullFramePrice,
            tortoiseShellPrice: order.tortoiseShellPrice,
            machiningAmount: order.machiningAmount,
            orderRemark: order.orderRemark,
            orderAmount: order.orderAmount,
            openId: order.openId
          }
          Indicator.open('提交中...');
          this.axios({
            url: '/api/order/submit',
            method: 'post',
            data: params
          }).then((res) => {
            if (res.code == "0") {
              this.orderId = res.data.orderId;
              this.goPay();
            }
          }).catch((res) => {
            Indicator.close();
          })
        }
      },
      goPay() {
        var that = this;
        this.axios({
          url: '/api/wxPay/prepayInfoJSSDK',
          method: 'post',
          data: {
            openId: window.sessionStorage.getItem("openId"),
            orderId: this.orderId
          }
        }).then((res) => {
          Indicator.close();
          wexinPay(res.data, function () {
            Toast("支付成功！")
            setTimeout(() => {
              that.$router.push({
                name: 'Order',
                params: {
                  fromIndex: true
                }
              });
            }, 1000)
          }, function () {
            Toast("支付失败！")
          });
        }).catch((res) => {
          Indicator.close();
        });
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    beforeDestroy() {
      Indicator.close();
    },
    computed: {
      ...mapState({
        orderData: state => state.order
      })
    }
  }
</script>

<style>

</style>
