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
                  <div class="page-cell-table-wrap">
                    <div class="page-cell-table">
                      <div class="page-cell-header">
                        <div class="page-cell-tr">
                          <div class="page-cell-item"></div>
                          <div class="page-cell-item">度数</div>
                          <div class="page-cell-item">散光</div>
                          <div class="page-cell-item">轴位</div>
                        </div>
                      </div>
                      <div class="page-cell-body">
                        <div class="page-cell-tr">
                          <div class="page-cell-item">右眼</div>
                          <div class="page-cell-item">{{orderData.myopicRight?orderData.myopicRight:''}}</div>
                          <div class="page-cell-item">{{orderData.astigmiaRight?orderData.astigmiaRight:''}}</div>
                          <div class="page-cell-item">{{orderData.axialRight?orderData.axialRight:''}}</div>
                        </div>
                        <div class="page-cell-tr">
                          <div class="page-cell-item">左眼</div>
                          <div class="page-cell-item">{{orderData.myopicLeft?orderData.myopicLeft:''}}</div>
                          <div class="page-cell-item">{{orderData.astigmiaLeft?orderData.astigmiaLeft:''}}</div>
                          <div class="page-cell-item">{{orderData.axialLeft?orderData.axialLeft:''}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="page-cell">
                    <mt-cell title="瞳距" :value="orderData.eyePd?orderData.eyePd+'mm':''"></mt-cell>
                    <mt-cell title="瞳高" :value="orderData.eyeVd?orderData.eyeVd+'mm':''"></mt-cell>
                    <mt-cell title="ADD" :value="eyeAddStr"></mt-cell>
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
                  <span style="word-break:break-all; width:240px;">{{orderData.frameName}}</span>
                </div>
                <div class="price-data" v-if="orderData.isSideCut==1">
                  <div class="item-name">特殊服务</div>
                  <span class="price">￥{{orderData.sideCutPrice.toFixed(2)}}</span>
                </div>
                <div class="price-data" v-if="orderData.isSideCut==1">
                  <div class="item-name">要求描述</div>
                  <span style="word-break:break-all; width:240px;text-align: right;">{{orderData.sideCutRemark}}</span>
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
              <div class="itemTitle" v-if="orderData.isExpress==1">快递服务
                <span class="price" style="float: right;margin-right:14px;">￥{{orderData.expressAmount.toFixed(2)}}</span>
              </div>
              <div class="itemBody" v-if="orderData.isExpress==1">
                <div class="price-data" >
                  <div class="item-name">快递地址</div>
                  <span style="word-break:break-all; width:240px;text-align: right;">{{orderData.expressAddress}}</span>
                </div>
              </div>
              <div class="itemTitle">备注</div>
              <div class="itemBody">
                <p>{{orderData.orderRemark}}</p>
              </div>
              <div class="itemTitle">数量
                <span class="price" style="float: right;margin-right:14px;">{{orderData.orderTotal}}</span>
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
            eyeAddLeft: order.eyeAddLeft ? order.eyeAddLeft : '',
            eyeAddRight: order.eyeAddRight ? order.eyeAddRight : '',
            orderServiceId: order.orderServiceId,
            goodsId: order.goodsId,
            varietyId: order.varietyId,
            varietyName: order.varietyName,
            frameTypeId: order.frameTypeId,
            frameName:order.frameName,
            isHighScatter: order.isHighScatter ? 1 : 0,
            isSuper10d: order.isSuper10d ? 1 : 0,
            isSuper20d: order.isSuper20d ? 1 : 0,
            isFullFrame: order.isFullFrame ? 1 : 0,
            isTortoiseShell: order.isTortoiseShell ? 1 : 0,
            optometryAmount: order.optometryAmount,
            goodsAmount: order.goodsAmount,
            varietyPrice: order.varietyPrice,
            isSideCut: order.isSideCut,
            sideCutPrice: order.sideCutPrice,
            sideCutRemark:order.sideCutRemark,
            highScatterPrice: order.highScatterPrice,
            super10dPrice: order.super10dPrice,
            super20dPrice: order.super20dPrice,
            fullFramePrice: order.fullFramePrice,
            tortoiseShellPrice: order.tortoiseShellPrice,
            machiningAmount: order.machiningAmount,
            isExpress:order.isExpress,
            expressAmount:order.expressAmount,
            expressAddress:order.expressAddress,
            orderRemark: order.orderRemark,
            orderTotal:order.orderTotal,
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
            }else{
              Indicator.close();
              Toast(res.msg)
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
      }),
      eyeAddStr(){
        let htmlArray = new Array();
        if (this.orderData.eyeAddRight != null) {
          htmlArray.push("右眼：" + this.orderData.eyeAddRight)
        }
        if (this.orderData.eyeAddLeft != null) {
          htmlArray.push("左眼：" + this.orderData.eyeAddLeft)
        }
        return htmlArray.join(" , ");
      }
    }
  }
</script>

<style>

</style>
