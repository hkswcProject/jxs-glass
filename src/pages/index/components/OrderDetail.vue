<template>
  <div>
    <div class="page-header-main">
      <mt-header title="我的订单" fixed>
      </mt-header>
    </div>

    <div  class="container" :class="{'hasBtmBar':hasBtmBar}"  >
      <div :style="'overflow:auto;-webkit-overflow-scrolling:touch;height:'+divHeight">
        <!-- 订单信息 -->
        <div class="panel-wrap noMargin">
          <div class="panel-body">
            <div class="order-info">
              <span class="iconfont icon-dingdanjihe"></span>
              <div class="info-wrap">
                <ul>
                  <li>订单编号：{{orderData.orderSn}}</li>
                  <li>下单时间：{{orderData.confirmTime|fmtTime}}</li>
                  <li v-if="orderData.machStatus==1">正在加工：{{orderData.machStartTime|fmtTime}}</li>
                  <li v-if="orderData.machStatus==9">加工时间：{{orderData.machStartTime|fmtTime}} — {{orderData.machEndTime|fmtTime}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
                  <div class="item-name">{{orderData.funcName}} / {{orderData.goodsName}}</div>
                  <span class="price">￥{{orderData.goodsAmount?orderData.goodsAmount.toFixed(2):'0.00'}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 加工服务 -->
        <div class="panel-wrap">
          <div class="panel-body">
            <div class="detail-data">
              <div class="itemTitle" v-if="orderData.frameTypeId">加工服务</div>
              <div class="itemBody"  v-if="orderData.frameTypeId">
                <div class="price-data"  v-if="orderData.varietyId">
                  <div class="item-name">镜片品种</div>
                  <span>{{orderData.varietyName}}</span>
                </div>
                <div class="price-data"  v-if="orderData.frameTypeId">
                  <div class="item-name" v-show="orderData.frameTypeId==1">全框</div>
                  <div class="item-name" v-show="orderData.frameTypeId==2">半框</div>
                  <div class="item-name" v-show="orderData.frameTypeId==3">无框</div>
                  <span class="price">￥{{orderData.varietyPrice?orderData.varietyPrice.toFixed(2):'0.00'}}</span>
                </div>
                <div class="price-data" v-if="orderData.frameName">
                  <div class="item-name">镜框名称</div>
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
                <div class="price-data"  v-if="orderData.isHighScatter">
                  <div class="item-name">高散</div>
                  <span class="price">￥{{orderData.highScatterPrice?orderData.highScatterPrice.toFixed(2):'0.00'}}</span>
                </div>
                <div class="price-data"  v-if="orderData.isSuper10d">
                  <div class="item-name">超10D</div>
                  <span class="price">￥{{orderData.super10dPrice?orderData.super10dPrice.toFixed(2):'0.00'}}</span>
                </div>
                <div class="price-data"  v-if="orderData.isSuper20d">
                  <div class="item-name">超20D</div>
                  <span class="price">￥{{orderData.super20dPrice?orderData.super20dPrice.toFixed(2):'0.00'}}</span>
                </div>
                <div class="price-data"  v-if="orderData.isFullFrame">
                  <div class="item-name">全框抛光</div>
                  <span class="price">￥{{orderData.fullFramePrice?orderData.fullFramePrice.toFixed(2):'0.00'}}</span>
                </div>
                <div class="price-data"  v-if="orderData.isTortoiseShell">
                  <div class="item-name">玳瑁（动物制品）</div>
                  <span class="price">￥{{orderData.tortoiseShellPrice?orderData.tortoiseShellPrice.toFixed(2):'0.00'}}</span>
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
        <!-- 总费用 -->
        <div class="payment-wrap">
          <ul class="pay_list">
            <li><span class=""></span><span>验光价格：￥{{orderData.optometryAmount?orderData.optometryAmount.toFixed(2):'0.00'}}</span></li>
            <li><span class=""></span><span>镜片价格：￥{{orderData.goodsAmount?orderData.goodsAmount.toFixed(2):'0.00'}} x {{orderData.orderTotal}} = {{orderData.goodsAmount?(orderData.goodsAmount*orderData.orderTotal).toFixed(2):'0.00'}}</span></li>
            <li><span class=""></span><span>加工服务：￥{{orderData.machiningAmount?orderData.machiningAmount.toFixed(2):'0.00'}} x {{orderData.orderTotal}} = {{orderData.machiningAmount?(orderData.machiningAmount*orderData.orderTotal).toFixed(2):'0.00'}}</span></li>
            <li><span class=""></span><span>快递服务：￥{{orderData.expressAmount?orderData.expressAmount.toFixed(2):'0.00'}}</span></li>
            <li><span class=""></span><span>总额：￥{{orderData.orderAmount?orderData.orderAmount.toFixed(2):'0.00'}}</span></li>
            <template  v-for="item in orderData.payInfoList">
              <li v-if="item.isPay==1"><span  class="pay_info">{{item.payTime}}  {{item.payRemark}}</span><span>已付：￥{{item.orderAmount?item.orderAmount.toFixed(2):'0.00'}}</span></li>
              <li v-if="item.orderTypeId==9"><span  class="pay_info">{{item.payTime}}  {{item.payRemark}}</span><span>退款：￥{{item.orderAmount?item.orderAmount.toFixed(2):'0.00'}}}</span></li>
            </template>
            <li><span>实付款：￥{{orderData.orderActualAmount?orderData.orderActualAmount.toFixed(2):'0.00'}}</span></li>

          </ul>
          <ul v-if="orderData.obligationsAmount">
            <li>
              <span  class="pay_info">{{orderData.obligationsPayRemark}}</span><span><strong>待付款：<span style="color:red;">￥{{orderData.obligationsAmount?orderData.obligationsAmount.toFixed(2):'0.00'}}</span></strong></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 底部支付 -->
    <div class="btmBar" v-if="orderData.orderStatus==0">
      <div class="btnWrap" >
        <a href="javascript:void(0);" @click="goPay" class="paymentBtn-mid" style="width:100%">去支付</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast, MessageBox,Indicator} from 'mint-ui';
  import wexinPay from '@/utils/wexinPay';
  import {getParam} from '@/utils/utils';
  export default {
    name: 'OrderDetail',
    data() {
      return {
        orderId: '',
        openId:'',
        hasBtmBar:false,
        divHeight:0,
        orderData:{}
      };
    },
    created(){
      this.orderId = getParam(this,"orderId");
      this.openId = getParam(this,"openId");
      this.$nextTick(function(){
        this.divHeight=window.innerHeight-40+'px';
        this.getOrderInfo();
      });
    },
    methods: {
      getOrderInfo(){
        Indicator.open('正在加载...');
        setTimeout(() => {
          this.axios({
            url: '/api/order/detail',
            data: {
              openId:this.openId,
              orderId: this.orderId
            },
            method: 'post'
          }).then((res) => {
            Indicator.close();
            if (res.data) {
              this.orderData = res.data;
              if(this.orderData.orderStatus==0||this.orderData.orderStatus==10){
                this.divHeight = window.innerHeight-85+'px';
                this.hasBtmBar = true;
              }
              for(let item of this.orderData.payInfoList){
                if(item.isPay==0){
                  this.orderData.obligationsAmount = item.orderAmount;
                  this.orderData.obligationsPayRemark = item.payRemark;
                }
              }
            }
          }).catch((response) => {
            Indicator.close();
          })
        }, 500);
      },
      goPay() {
        var that = this;
        this.axios({
          url: '/api/wxPay/prepayInfoJSSDK',
          method: 'post',
          data: {
            openId:this.openId,
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
      }
    },
    computed: {
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
    },
    beforeDestroy(){
      Indicator.close();
    }
  };
</script>

<style type="text/css">
  .payment-wrap .pay_info{
    float:left;
  }
</style>
