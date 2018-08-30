<template>
<div>
  <div v-show="!selectGoodVisable">
    <div class="page-header-main">
      <mt-header title="配镜中心" fixed>
      </mt-header>
    </div>
    <div class="container hasBtmBar" >
      <div class="page-field" :style="'overflow:'+overflow+';height:'+divHeight">
        <!-- 客户信息 -->
        <div class="page-part">
          <mt-field label="商铺名称" :value="shopName" type="text" readonly disableClear></mt-field>
          <mt-field label="客人名称" v-model="customerName" placeholder="请输入客户姓名" type="text" class="mint-cell-sm"></mt-field>
          <mt-field label="客人电话" v-model="customerPhone" placeholder="请输入手机号" type="text"></mt-field>
        </div>
        <!-- 板块 -->
        <div class="panel-wrap">
          <div class="panel-title">请填写验光数据</div>
          <div class="panel-body">
            <nav class="tabWrap">
              <a href="javascript:void(0);" :class="{'cur': optometryTypeId == 1}" @click="setOptometryType(1)">普通验光</a>
              <a href="javascript:void(0);" :class="{'cur': optometryTypeId == 2}" @click="setOptometryType(2)">渐进验光</a>
              <a href="javascript:void(0);" :class="{'cur': optometryTypeId == 3}" @click="setOptometryType(3)">视功能检查</a>
              <a href="javascript:void(0);" :class="{'cur': optometryTypeId == 4}" @click="setOptometryType(4)">无需验光</a>
            </nav>
            <!-- 普通验光 -->
            <div class="tab-Content">
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
                    <div class="page-cell-tr"  @click="rightPickerVisible=true">
                      <div class="page-cell-item">右眼</div>
                      <div class="page-cell-item">{{myopicRight}}</div>
                      <div class="page-cell-item">{{astigmiaRight}}</div>
                      <div class="page-cell-item">{{axialRight}}</div>
                    </div>
                    <div class="page-cell-tr" @click="leftPickerVisible=true">
                      <div class="page-cell-item">左眼</div>
                      <div class="page-cell-item">{{myopicLeft}}</div>
                      <div class="page-cell-item">{{astigmiaLeft}}</div>
                      <div class="page-cell-item">{{axialLeft}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="page-cell">
                <mt-cell title="瞳距" is-link :value="eyePd?eyePd+'mm':''" @click.native="eyePdPickerVisible=true"></mt-cell>
                <mt-cell title="瞳高" is-link :value="eyeVd?eyeVd+'mm':''" @click.native="eyeVdPickerVisible=true"></mt-cell>
                <mt-cell title="ADD" is-link :value="eyeAdd?eyeAdd:''" @click.native="eyeAddPickerVisible=true"></mt-cell>
              </div>
            </div>
          </div>
          <div class="panel-bottom">
            <div class="price">小计：
              <span class="price">￥{{optometryAmount.toFixed(2)}}</span>
            </div>
          </div>
        </div>
        <div class="panel-wrap">
          <div class="panel-body">
            <nav class="tabWrap">
              <a href="javascript:void(0);" :class="{'cur': orderServiceId == 1}" @click="setOrderServiceType(1)">购置镜片</a>
              <a href="javascript:void(0);" :class="{'cur': orderServiceId == 2}" @click="setOrderServiceType(2)">只需加工</a>
              <a href="javascript:void(0);"  :class="{'cur': orderServiceId == 3}" @click="setOrderServiceType(3)">无需镜片和加工</a>
            </nav>
            <!-- 配镜组合 -->
            <div class="tab-Content" v-show="orderServiceId == 1">
              <div class="payService">
                <div class="itemTitle">镜片
                  <!-- <router-link to='/SelectLens' class="selGlasses">镜片选择</router-link>-->
                  <a href="javascript:void(0);" class="selGlasses" @click="selectGoodVisable=true">镜片选择</a>
                </div>
                <div class="itemBody">
                  <div class="itemName">{{goodStr}}</div>
                  <span class="price">{{good.shopPrice?'￥'+good.shopPrice.toFixed(2):''}}</span>
                </div>
              </div>
            </div>
            <!-- 配镜组合 -->
            <div class="tab-Content"  v-show="orderServiceId == 1||orderServiceId == 2">
              <div class="manualService">
                <div class="itemTitle">加工服务<span class="instr" v-show="orderServiceId == 1">（购买镜片,不需要费用）</span></div>
                <div class="itemBody">
                  <div class="page-cell">
                    <mt-cell title="镜片品种" is-link   @click.native="varietyPickerVisible=true">
                      <span>{{varietyName}}</span>
                    </mt-cell>
                    <mt-cell title="镜框类型">
                      <div class="typeTab">
                        <a href="javascript:void(0);" :class="{'cur':frameTypeId==1}" @click="setFrameType(1)">全框</a>
                        <a href="javascript:void(0);" :class="{'cur':frameTypeId==2}" @click="setFrameType(2)">半框</a>
                        <a href="javascript:void(0);" :class="{'cur':frameTypeId==3}" @click="setFrameType(3)">无框</a>
                      </div>
                      <span class="price">￥{{varietyPrice.toFixed(2)}}</span>
                    </mt-cell>
                    <mt-cell title="镜框型号" >
                      <div class="remarks">
                        <input placeholder="请输入镜框型号" type="text" v-model="frameName" class="mint-field-core">
                      </div>
                    </mt-cell>
                    <mt-cell title="切边" is-link v-show="frameTypeId==3" @click.native="isSideCutPickerVisible=true">
                      <span>{{isSideCutStr}}</span>
                      <span class="price">￥{{sideCutPrice.toFixed(2)}}</span>
                    </mt-cell>
                    <mt-cell title="附加收费" class="additionalCost" v-show="orderServiceId!=1">
                      <div class="costList">
                        <ul>
                          <li>
                            <label  class="mint-checklist-label"  @click="highScatter=!highScatter">
                            <span  class="mint-checkbox">
                              <span class="mint-checkbox-core" :class="{'cur': highScatter == true}" ></span>
                            </span> <span  class="mint-checkbox-label">高散</span>
                              <span  class="price">￥{{highScatterPrice.toFixed(2)}}</span></label>
                          </li>
                          <li>
                            <label  class="mint-checklist-label"  @click="super10d=!super10d;super10d?super20d=false:''">
                            <span  class="mint-checkbox">
                              <span class="mint-checkbox-core" :class="{'cur': super10d == true}" ></span>
                            </span> <span  class="mint-checkbox-label">超10D</span>
                              <span  class="price">￥{{super10dPrice.toFixed(2)}}</span></label>
                          </li>
                          <li>
                            <label  class="mint-checklist-label"  @click="super20d=!super20d;super10d?super10d=false:''">
                            <span  class="mint-checkbox">
                              <span class="mint-checkbox-core" :class="{'cur': super20d == true}" ></span>
                            </span> <span  class="mint-checkbox-label">超20D</span>
                              <span  class="price">￥{{super20dPrice.toFixed(2)}}</span>
                            </label>
                          </li>
                          <li>
                            <label  class="mint-checklist-label"  @click="fullFrame=!fullFrame">
                            <span  class="mint-checkbox">
                              <span class="mint-checkbox-core" :class="{'cur': fullFrame == true}" ></span>
                            </span> <span  class="mint-checkbox-label">全框抛光</span>
                              <span  class="price">￥{{fullFramePrice.toFixed(2)}}</span></label>
                          </li>
                          <li>
                            <label  class="mint-checklist-label"  @click="tortoiseShell=!tortoiseShell">
                            <span  class="mint-checkbox">
                              <span class="mint-checkbox-core" :class="{'cur': tortoiseShell == true}" ></span>
                            </span> <span  class="mint-checkbox-label">玳瑁（动物制品）</span>
                              <span  class="price">￥{{tortoiseShellPrice.toFixed(2)}}</span></label>
                          </li>
                        </ul>
                      </div>
                    </mt-cell>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 备注 -->
        <div class="panel-wrap">
          <div class="panel-title">备注</div>
          <div class="panel-body">
            <div class="remarks">
              <textarea placeholder="请填写备注信息" v-model="orderRemark" rows="4" class="mint-field-core"></textarea>
            </div>
          </div>
        </div>
      <!--  <router-link to='/order' class="paymentBtn">我的订单</router-link>-->
      </div>
      <!-- 底部支付 -->
      <div class="btmBar">
        <div class="btnWrap">
          <span class="total">合计：<strong class="price">￥{{orderAmountStr.toFixed(2)}}</strong></span>
          <!-- <a href="" class="paymentBtn">去结算</a> -->
          <a  href="javascript:void(0);" v-show="isLoadComplete"  @click="submit" class="paymentBtn">去结算</a>
        </div>
      </div>
      <!--左眼选择-->
      <mt-popup class="selectPopup"
                v-model="leftPickerVisible"
                popup-transition="popup-fade"
                position="bottom">
        <div class="popupTopBar">
          <a href="javascript:void(0);" class="backBtn pbBtn" @click="leftPickerVisible=false"><i
            class="mintui mintui-back"></i></a>
          <a href="javascript:void(0);" class="confirmBtn pbBtn" @click="onLeftConfirm">确定</a>
        </div>
        <div class="dereepTopbar">
          <div class="dereepBarItem" style="text-align: right;">度数</div>
          <div class="dereepBarItem" style="text-align: center;">散光</div>
          <div class="dereepBarItem" style="text-align: left;">轴位</div>
        </div>
        <mt-picker :slots="leftSlots" @change="onLeftChange" ></mt-picker>
      </mt-popup>

      <!--右眼选择-->
      <mt-popup class="selectPopup"
                v-model="rightPickerVisible"
                popup-transition="popup-fade"
                position="bottom">
        <div class="popupTopBar">
          <a href="javascript:void(0);" class="backBtn pbBtn" @click="rightPickerVisible=false"><i
            class="mintui mintui-back"></i></a>
          <a href="javascript:void(0);" class="confirmBtn pbBtn" @click="onRightConfirm">确定</a>
        </div>
        <div class="dereepTopbar">
          <div class="dereepBarItem" style="text-align: right;">度数</div>
          <div class="dereepBarItem" style="text-align: center;">散光</div>
          <div class="dereepBarItem" style="text-align: left;">轴位</div>
        </div>
        <mt-picker :slots="rightSlots" @change="onRightChange" ></mt-picker>
      </mt-popup>

      <!--瞳距选择-->
      <mt-popup class="selectPopup"
                v-model="eyePdPickerVisible"
                popup-transition="popup-fade"
                position="bottom">
        <div class="popupTopBar">
          <a href="javascript:void(0);" class="backBtn pbBtn" @click="eyePdPickerVisible=false"><i
            class="mintui mintui-back"></i></a>
          <a href="javascript:void(0);" class="confirmBtn pbBtn" @click="onEyePdConfirm">确定</a>
        </div>
        <mt-picker :slots="eyePdSlots" @change="onEyePdChange" ></mt-picker>
      </mt-popup>

      <!--瞳高选择-->
      <mt-popup class="selectPopup"
                v-model="eyeVdPickerVisible"
                popup-transition="popup-fade"
                position="bottom">
        <div class="popupTopBar">
          <a href="javascript:void(0);" class="backBtn pbBtn" @click="eyeVdPickerVisible=false"><i
            class="mintui mintui-back"></i></a>
          <a href="javascript:void(0);" class="confirmBtn pbBtn" @click="onEyeVdConfirm">确定</a>
        </div>
        <mt-picker :slots="eyeVdSlots" @change="onEyeVdChange" ></mt-picker>
      </mt-popup>

      <!--ADD选择-->
      <mt-popup class="selectPopup"
                v-model="eyeAddPickerVisible"
                popup-transition="popup-fade"
                position="bottom">
        <div class="popupTopBar">
          <a href="javascript:void(0);" class="backBtn pbBtn" @click="eyeAddPickerVisible=false"><i
            class="mintui mintui-back"></i></a>
          <a href="javascript:void(0);" class="confirmBtn pbBtn" @click="onEyeAddConfirm">确定</a>
        </div>
        <mt-picker :slots="eyeAddSlots" @change="onEyeAddChange" ></mt-picker>
      </mt-popup>

      <!--镜片品种选择-->
      <mt-popup class="selectPopup"
                v-if="varietyPickerInit"
                v-model="varietyPickerVisible"
                popup-transition="popup-fade"
                position="bottom">
        <div class="popupTopBar">
          <a href="javascript:void(0);" class="backBtn pbBtn" @click="varietyPickerVisible=false"><i
            class="mintui mintui-back"></i></a>
          <a href="javascript:void(0);" class="confirmBtn pbBtn" @click="onVarietyConfirm">确定</a>
        </div>
        <mt-picker :slots="varietySlots" @change="onVarietyChange" ></mt-picker>
      </mt-popup>


      <!--镜片切边选择-->
      <mt-popup class="selectPopup selectPopup-s"
                v-model="isSideCutPickerVisible"
                popup-transition="popup-fade"
                position="bottom">
        <div class="popupTopBar">
          <a href="javascript:void(0);" class="backBtn pbBtn" @click="isSideCutPickerVisible=false"><i
            class="mintui mintui-back"></i></a>
          <a href="javascript:void(0);" class="confirmBtn pbBtn" @click="onIsSideCutConfirm">确定</a>
        </div>
        <mt-picker :slots="isSideCutSlots" @change="onIsSideCutChange" ></mt-picker>
      </mt-popup>

      <zs-dialog v-model="dialogVisible"
                 type="confirmType"
                 :showCancel="true"
                 :title="'请填写'+diaTitle"
                 @close="clickCloseDia"
                 @confirm="clickConfirmDia">
        <div v-show="diaType=='left'||diaType=='right'" class="mint-msgbox-input" style="padding-top:4px;">
          <mt-field label="度数"  v-model="diaFirstInp"  placeholder="请输入度数" type="text"></mt-field>
          <mt-field label="散光"  v-model="diaSecondInp"  placeholder="请输入散光" type="text" ></mt-field>
          <mt-field label="轴位"  v-model="diaThreeInp"  placeholder="请输入轴位" type="text" ></mt-field>
        </div>
        <div v-show="diaType=='eyePd'||diaType=='eyeVd'||diaType=='eyeAdd'" class="mint-msgbox-input">
          <mt-field :label="diaTitle"  v-model="diaOtherInp" :placeholder="'请输入'+diaTitle" type="text" ></mt-field>
        </div>
      </zs-dialog>
    </div>
  </div>
  <select-good v-if="selectGoodVisable" @closeSelect="closeSelectGood()"></select-good>
</div>
</template>

<script>
  import {Toast,Indicator} from 'mint-ui';
  import Dialog from '@/components/Dialog';
  import SelectLens from '@/components/SelectLens';
  import { mapMutations,mapState } from 'vuex';
  import {getParam} from '@/utils/utils';
  export default {
    name: 'Index',
    components: {
      'zs-dialog': Dialog,
      'select-good':SelectLens
    },
    data () {
      return {
        openId:'',
        isLoadComplete:false,
        divHeight:0,
        overflow:'auto',
        //价格数组
        priceData:{},
        //当铺名称
        shopName:'',
        //客户名称
        customerName:null,
        //客户号码
        customerPhone:null,
        //验光类型
        optometryTypeId: '1',
        //验光价格
        optometryAmount:0,
        //弹出窗
        dialogVisible: false,
        //弹窗输入框1
        diaFirstInp:'',
        //弹窗输入框2
        diaSecondInp:'',
        //弹窗输入框3
        diaThreeInp:'',
        //弹窗输入框其他
        diaOtherInp:'',
        diaTitle:'',
        diaType:'',

        //<!-- 选择开始-->
        //左眼Popup 是否弹出
        leftPickerVisible: false,
        leftSlots: [
          {
            flex: 2,
            values: this.getMyopicSlotsValues(),
            defaultIndex: 25,
            className: 'slot1',
            textAlign: 'right'
          },  {
            flex: 2,
            values: this.getAstigmiaSlotsValues(),
            defaultIndex: 25,
            className: 'slot2',
            textAlign: 'center'
          }, {
            flex: 2,
            values: this.createNumList(181, 0, 5, '其他',''),
            defaultIndex: 2,
            className: 'slot3',
            textAlign: 'left'
          }
        ],
        //右眼Popup 是否弹出
        rightPickerVisible: false,
        rightSlots: [
          {
            flex: 2,
            values: this.getMyopicSlotsValues(),
            defaultIndex: 25,
            className: 'slot1',
            textAlign: 'right'
          },  {
            flex: 2,
            values: this.getAstigmiaSlotsValues(),
            defaultIndex: 25,
            className: 'slot2',
            textAlign: 'center'
          }, {
            flex: 2,
            values: this.createNumList(181, 0, 5, '其他',''),
            defaultIndex: 2,
            className: 'slot3',
            textAlign: 'left'
          }
        ],
        //眼镜度数组合值
        myopicLeft: null,
        myopicLeftTemp: null,
        myopicRight: null,
        myopicRightTemp: null,
        //眼镜散光度数组合值
        astigmiaLeft: null,
        astigmiaLeftTemp: null,
        astigmiaRight: null,
        astigmiaRightTemp: null,
        //轴位度数组合值
        axialLeft: null,
        axialLeftTemp: null,
        axialRight: null,
        axialRightTemp: null,
        //<!-- 选择结束-->

        //<!-- 瞳距度数选择开始-->
        //瞳距度数Popup 是否弹出
        eyePdPickerVisible: false,
        //瞳距度数选择数组
        eyePdSlots: [
          {
            values: this.createNumList(15, 56, 1, '其他',''),
            defaultIndex: 2,
          }
        ],
        //瞳距度数组合值
        eyePd: null,
        eyePdTemp: null,

        //<!-- 瞳高度数选择开始-->
        //瞳高度数Popup 是否弹出
        eyeVdPickerVisible: false,
        //瞳高度数选择数组
        eyeVdSlots: [
          {
            values: this.createNumList(18, 8, 1, '其他',''),
            defaultIndex: 2,
          }
        ],
        //瞳高度数组合值
        eyeVd: null,
        eyeVdTemp: null,

        //<!-- Add度数选择开始-->
        //Add度数Popup 是否弹出
        eyeAddPickerVisible: false,
        //Add度数选择数组
        eyeAddSlots: [
          {
            values:['其他','+0.50','+0.75', '+1.00', '+1.25', '+1.50', '+1.75', '+2.00', '+2.25', '+2.50', '+2.75', '+3.00', '+3.25', '+3.50', '+3.75' ,'+4.00'],
            defaultIndex: 2,
          }
        ],
        //Add度数组合值
        eyeAdd: null,
        eyeAddTemp: null,
        //显示眼镜选择
        selectGoodVisable:false,
        //服务类型
        orderServiceId:1,
        //镜片种类
        ensVarietyList:[],
        //镜片种类加工价格
        varietyPrice:0,
        //<!-- 镜片品种选择开始-->
        //镜片品种Popup 是否弹出
        varietyPickerVisible: false,
        varietyPickerInit:false,
        //镜片品种选择数组
        varietySlots: [],
        //镜片品种组合值
        varietyId:null,
        varietyName: null,
        varietyNameTemp: null,

        //镜框类型
        frameTypeId: null,
        //镜片名称
        frameName:null,
        //<!-- 切边选择开始-->
        //切边Popup 是否弹出
        isSideCutPickerVisible: false,
        //切边选择数组
        isSideCutSlots: [   {
          values: ["需要切边","不需要切边"],
          defaultIndex: 0,
        }],
        //切边组合值
        isSideCut: false,
        isSideCutStr: "不需要切边",
        isSideCutTemp: null,
        //切边价格
        sideCutPrice:0,
        //附加收费
        //高散价格
        highScatter:false,
        highScatterPrice:0,
        //超10D价格
        super10d:false,
        super10dPrice:0,
        //超20D价格
        super20d:false,
        super20dPrice:0,
        //全抛光价格
        fullFrame:false,
        fullFramePrice:0,
        // 玳瑁（动物制品）价格
        tortoiseShell:false,
        tortoiseShellPrice:0,
        //加工费用
        machiningAmount:0,
        //备注信息
        orderRemark:null,
        //应付价格
        orderAmount:0,

      }

    },
    created(){
      this.openId = getParam(this,'openId');
      if(this.openId){
        window.sessionStorage.removeItem("openId")
        window.sessionStorage.setItem("openId",this.openId);
      }
      this.divHeight=window.innerHeight-90+'px';
      this.subOrder();
      this.getWxUserInfo();
      this.getPriceData();
      this.getLensVarietyData();
    },
    beforeDestroy(){
      Indicator.close();
    },
    methods: {

      //提交
      submit(){
        if(this.orderServiceId==1){
            if(this.good==""){
              Toast('请选择镜片');
              return;
            }
            if(!this.frameTypeId){
              Toast('请选择镜框类型');
              return;
            }
            if(this.frameTypeId==3&&!this.isSideCutStr){
              Toast('请选择是否切边');
              return;
            }
        };
        if(this.orderServiceId==2){
          if(!this.varietyId){
            Toast('请选择镜片品种');
            return;
          }
          if(!this.frameTypeId){
            Toast('请选择镜框类型');
            return;
          }
          if(this.frameTypeId==3&&!this.isSideCutStr){
            Toast('请选择是否切边');
            return;
          }
        };
        if(this.orderServiceId==3&&this.optometryTypeId==4){
          Toast('请选择服务项目');
          return;
        }
        Indicator.open('结算中...');
        var params = {
          shopName:this.shopName,
          customerName:this.customerName,
          customerPhone:this.customerPhone,
          optometryTypeId:this.optometryTypeId,
          myopicLeft:this.myopicLeft,
          myopicRight:this.myopicRight,
          astigmiaLeft:this.astigmiaLeft,
          astigmiaRight:this.astigmiaRight,
          axialLeft:this.axialLeft,
          axialRight:this.axialRight,
          eyePd:this.eyePd,
          eyeVd:this.eyeVd,
          eyeAdd:this.eyeAdd,
          orderServiceId:this.orderServiceId,
          varietyId:this.varietyId,
          varietyName:this.varietyName,
          frameTypeId:this.frameTypeId,
          frameName:this.frameName,
          isSideCut:this.isSideCut,
          isHighScatter:this.highScatter?1:0,
          isSuper10d:this.super10d?1:0,
          isSuper20d:this.super20d?1:0,
          isFullFrame:this.fullFrame?1:0,
          isTortoiseShell:this.tortoiseShell?1:0,
          optometryAmount:this.optometryAmount,
          varietyPrice:this.varietyPrice,
          sideCutPrice:this.sideCutPrice,
          highScatterPrice:this.highScatterPrice,
          super10dPrice:this.super10dPrice,
          super20dPrice:this.super20dPrice,
          fullFramePrice:this.fullFramePrice,
          tortoiseShellPrice:this.tortoiseShellPrice,
          orderRemark:this.orderRemark,
          openId:this.openId
        };
        if(this.orderServiceId==1){
          params.good = this.good;
          params.goodsId = this.good.goodsId;
          params.goodsAmount = this.good.shopPrice;
          params.machiningAmount = 0;
          params.orderAmount = this.optometryAmount+this.good.shopPrice;
        }else if(this.orderServiceId==2){
          params.good = null;
          params.goodsId = null;
          params.goodsAmount = 0;
          var machiningAmount = this.varietyPrice;
          if(this.highScatter){
            machiningAmount+=this.highScatterPrice;
          }else{
            params.highScatterPrice = 0;
          }
          if(this.super10d){
            machiningAmount+=this.super10dPrice;
          }else{
            params.super10dPrice = 0;
          }
          if(this.super20d){
            machiningAmount+=this.super20dPrice;
          }else{
            params.super20dPrice = 0;
          }
          if(this.fullFrame){
            machiningAmount+=this.fullFramePrice;
          }else{
            params.fullFramePrice = 0;
          }
          if(this.tortoiseShell){
            machiningAmount+=this.tortoiseShellPrice;
          }else{
            params.tortoiseShellPrice = 0;
          }
          params.machiningAmount = Number(machiningAmount);
          params.orderAmount = this.optometryAmount+ Number(machiningAmount);
        }else if(this.orderServiceId==3){
          params.good = null;
          params.goodsId = null;
          params.goodsAmount = 0;
          params.machiningAmount = 0;
          params.orderAmount = this.optometryAmount;
        }
        this.subOrder(params);
        setTimeout(()=>{
          this.$router.push('/immediatePay');
        },1000)
      },
      //获取获取微信用户(包含档口信息)
      getWxUserInfo(){
        this.axios({
          url: '/api/wxUser/get',
          method: 'post',
          data:{
            openId:this.openId
          }
        }).then((res) => {

          if(res&&res.data){
              var info = res.data;
              this.isLoadComplete = true;
              this.shopName = info.shopName;
          }
        }).catch((res) => {
        })
      },
      //获取价格数据
      getPriceData(){
        this.axios({
          url: '/api/config/charge',
          method: 'post',
        }).then((res) => {
          if(res&&res.data){
            for(let item of res.data){
              this.priceData[item.conCode] = item.conValue;
            }
            this.optometryAmount = Number(this.priceData.ordinary_optometry);
          }
        }).catch((res) => {
        })
      },
      //选择验光数据
      setOptometryType(value){
        if(value===this.optometryTypeId)return;
        this.optometryTypeId = value;
        if(value==1){
          this.optometryAmount = Number(this.priceData.ordinary_optometry);
          this.resetOptometry();
        }else if(value==2){
          this.optometryAmount = Number(this.priceData.progressive_optometry);
          this.resetOptometry();
        }else if(value==3){
          this.optometryAmount = Number(this.priceData.function_examination);
          this.resetOptometry();
        }else if(value==4){
          this.optometryAmount = 0;
          this.resetOptometry();
        }
      },
      //重置验光数据
      resetOptometry() {
        this.myopicLeft = null;
        this.myopicRight = null;
        this.astigmiaLeft = null;
        this.astigmiaRight = null;
        this.axialLeft = null;
        this.axialRight = null;
        this.eyePd = null;
        this.eyeVd = null;
        this.eyeAdd = null
      },
      getMyopicSlotsValues(){
        let tempArrA = this.createNumList(800, 0, 25, '其他','-');
        let tempArrB = this.createNumList(801, 800, 50,'','-');
        let tempArrC  = this.createNumList(601, -600, 25, '','+');
        return  tempArrC.concat(tempArrA,tempArrB);
      },
      getAstigmiaSlotsValues(){
        let tempArrA = this.createNumList(601, -600, 25, '','+');
        let tempArrB = this.createNumList(601, 0, 25,'其他','-');
        return  tempArrA.concat(tempArrB);
      },
      //左眼滑动选择
      onLeftChange(picker, values) {
        this.myopicLeftTemp = values[0];
        this.astigmiaLeftTemp = values[1];
        this.axialLeftTemp = values[2];
      },
      //确认左眼选择
      onLeftConfirm(){
        this.myopicLeft = this.myopicLeftTemp;
        this.astigmiaLeft = this.astigmiaLeftTemp;
        this.axialLeft = this.axialLeftTemp;
        this.leftPickerVisible = false;
        if (this.myopicLeft == '其他'||this.astigmiaLeft == '其他'||this.axialLeft == '其他') {
          this.myopicLeft = this.myopicLeft != '其他' ? this.myopicLeft : null;
          this.astigmiaLeft = this.astigmiaLeft != '其他' ? this.astigmiaLeft : null;
          this.axialLeft = this.axialLeft != '其他' ? this.axialLeft : null;
          this.dialogVisible = true;
          this.diaType = 'left';
          this.diaTitle = '左眼检查结果';
          this.diaFirstInp = this.myopicLeft;
          this.diaSecondInp = this.astigmiaLeft;
          this.diaThreeInp = this.axialLeft;
        }
        if(Math.abs(this.myopicLeft)>=1000){
            this.super10d = true;
            this.super20d = false;
        }else{
            this.super10d = false;
        }
        if(Math.abs(this.myopicLeft)>=2000){
            this.super10d = false;
            this.super20d = true;
        }else{
            this.super20d = false;
        }
        if(Math.abs(this.astigmiaLeft)>=225){
          this.highScatter = true;
        }else{
          this.highScatter = false;
        }
      },
      //右滑动选择
      onRightChange(picker, values) {
        this.myopicRightTemp = values[0];
        this.astigmiaRightTemp = values[1];
        this.axialRightTemp = values[2];
      },
      //确认右眼选择
      onRightConfirm(){
        this.myopicRight = this.myopicRightTemp;
        this.astigmiaRight = this.astigmiaRightTemp;
        this.axialRight = this.axialRightTemp;
        this.rightPickerVisible = false;
        if (this.myopicRight == '其他'||this.astigmiaRight == '其他'||this.axialRight == '其他') {
          this.myopicRight = this.myopicRight != '其他' ? this.myopicRight : null;
          this.astigmiaRight = this.astigmiaRight != '其他' ? this.astigmiaRight : null;
          this.axialRight = this.axialRight != '其他' ? this.axialRight : null;
          this.dialogVisible = true;
          this.diaType = 'right';
          this.diaTitle = '右眼检查结果';
          this.diaFirstInp = this.myopicRight;
          this.diaSecondInp = this.astigmiaRight;
          this.diaThreeInp = this.axialRight;
        }
        if(Math.abs(this.myopicRight)>=1000){
          this.super10d = true;
          this.super20d = false;
        }else{
          this.super10d = false;
        }
        if(Math.abs(this.myopicRight)>=2000){
          this.super10d = false;
          this.super20d = true;
        }else{
          this.super20d = false;
        }

        if(Math.abs(this.astigmiaRight)>=225){
          this.highScatter = true;
        }else{
          this.highScatter = false;
        }
      },
      //瞳距度数滑动选择
      onEyePdChange(picker, values) {
        this.eyePdTemp = values[0];
      },
      //确认瞳距选择
      onEyePdConfirm(){
        this.eyePd = this.eyePdTemp;
        this.eyePdPickerVisible = false;
        if (this.eyePd == '其他') {
          this.eyePd =  null;
          this.dialogVisible = true;
          this.diaType = 'eyePd';
          this.diaTitle = '瞳距';
          this.diaOtherInp = this.eyePd;
        }
      },

      //瞳高度数滑动选择
      onEyeVdChange(picker, values) {
        this.eyeVdTemp = values[0];
      },
      //确认瞳高选择
      onEyeVdConfirm(){
        this.eyeVd = this.eyeVdTemp;
        this.eyeVdPickerVisible = false;
        if (this.eyeVd == '其他') {
          this.eyeVd =  null;
          this.dialogVisible = true;
          this.diaType = 'eyeVd';
          this.diaTitle = '瞳高';
          this.diaOtherInp = this.eyeVd;
        }
      },

      //Add度数滑动选择
      onEyeAddChange(picker, values) {
        this.eyeAddTemp = values[0];
      },
      //确认Add选择
      onEyeAddConfirm(){
        this.eyeAdd = this.eyeAddTemp;
        this.eyeAddPickerVisible = false;
        if (this.eyeAdd == '其他') {
          this.eyeAdd =  null;
          this.dialogVisible = true;
          this.diaType = 'eyeAdd';
          this.diaTitle = 'ADD';
          this.diaOtherInp = this.eyeAdd;
        }
      },

      //点击弹窗取消按钮
      clickCloseDia(value){
        this.diaFirstInp = "";
        this.diaSecondInp = "";
        this.diaThreeInp = "";
        this.diaOtherInp = "";
        this.dialogVisible = value;
      },
      //点击弹窗确认按钮
      clickConfirmDia(value){

        switch(this.diaType)
          {
          case 'left':
            this.myopicLeft = this.diaFirstInp
            this.astigmiaLeft = this.diaSecondInp ;
            this.axialLeft = this.diaThreeInp ;

            if(Math.abs(this.myopicLeft)>=1000){
              this.super10d = true;
              this.super20d = false;
            }else{
              this.super10d = false;
            }
            if(Math.abs(this.myopicLeft)>=2000){
              this.super10d = false;
              this.super20d = true;
            }else{
              this.super20d = false;
            }
            if(Math.abs(this.astigmiaLeft)>=225){
              this.highScatter = true;
            }else{
              this.highScatter = false;
            }
            break;
          case 'right':
            this.myopicRight = this.diaFirstInp ;
            this.astigmiaRight = this.diaSecondInp ;
            this.axialRight = this.diaThreeInp ;
            if(Math.abs(this.myopicRight)>=1000){
              this.super10d = true;
              this.super20d = false;
            }else{
              this.super10d = false;
            }
            if(Math.abs(this.myopicRight)>=2000){
              this.super10d = false;
              this.super20d = true;
            }else{
              this.super20d = false;
            }
            if(Math.abs(this.astigmiaRight)>=225){
              this.highScatter = true;
            }else{
              this.highScatter = false;
            }
            break;
          case 'eyePd':
            this.eyePd = this.diaOtherInp;
            break;
          case 'eyeVd':
            this.eyeVd = this.diaOtherInp;
            break;
          case 'eyeAdd':
            this.eyeAdd = this.diaOtherInp;
            break;
          default:
        }
        this.diaFirstInp = "";
        this.diaSecondInp = "";
        this.diaThreeInp = "";
        this.diaOtherInp = "";
        this.dialogVisible = value;
      },
      createNumList: function (count, start, step, other,lable) {
        let list = new Array();
        if (other)
          list.push(other);
        for (let i = start; i < count+start; i++) {
          if (i % step == 0) {
            list.push(lable+Math.abs(i));
          }
        }
        return list;
      },
      //关闭眼镜选择页面
      closeSelectGood(){
        this.selectGoodVisable = false;
      },
      // 选择服务类型
      setOrderServiceType(val){
          if(val==this.orderServiceId)return;
          this.resetOrderService();
          this.orderServiceId = val;
          if(val==1){
              this.setMachiningPriceZero();
          }else if(val==2){
              this.setMachiningPrice();
          }else if(val==3){
              this.setMachiningPriceZero();
          }
      },
      //设置加工费用
      setMachiningPrice(){
        //镜片价格
        this.varietyPrice = 0;
        //切片价格
        this.sideCutPrice=0;
        //高散价格
        this.highScatterPrice=Number(this.priceData.high_scatter_price);
        //超10D价格
        this.super10dPrice=Number(this.priceData.super_10d_price);
        //超20D价格
        this.super20dPrice=Number(this.priceData.super_20d_price);
        //全抛光价格
        this.fullFramePrice=Number(this.priceData.full_frame_price);
        // 玳瑁（动物制品）价格
        this.tortoiseShellPrice=Number(this.priceData.tortoise_shell_price);
      },
      //设置加工费用为0
      setMachiningPriceZero(){
        //镜片价格
        this.varietyPrice = 0;
        //切片价格
        this.sideCutPrice=0;
        //高散价格
        this.highScatterPrice=0;
        //超10D价格
        this.super10dPrice=0;
        //超20D价格
        this.super20dPrice=0;
        //全抛光价格
        this.fullFramePrice=0;
        // 玳瑁（动物制品）价格
        this.tortoiseShellPrice=0;
      },

      resetOrderService(){
        this.varietyId=null;
        this.varietyName=null;
        this.frameTypeId = null;
        this.frameName = null;
        this.isSideCut= false;
        this.isSideCutStr= '不需要切边';

        this.highScatter = false;
        this.super10d = false;
        this.super20d = false;
        this.fullFrame = false;
        this.tortoiseShell = false;
      },
      //获取镜片品种
      getLensVarietyData(){
        this.axios({
          url: '/api/lensVariety/list',
          method: 'post',
          withCredentials: true
        }).then((res) => {
            console.log(res)
          if(res&&res.data){
                this.lensVarietyList=res.data;
                var varietyNameList = new Array();
                for(let item of res.data) {
                   varietyNameList.push(item.varietyName);
                }
                this.varietySlots.push({
                  values: varietyNameList,
                  defaultIndex: 2,
               })
                this.varietyPickerInit = true;
          }
        }).catch((res) => {
          console.log(res);
        })
      },

      //镜片品种滑动选择
      onVarietyChange(picker, values) {
        this.varietyPrice = 0;
        this.varietyNameTemp = values[0];
      },
      //确认镜片品种选择
      onVarietyConfirm(){
        this.frameTypeId = null ;
        this.varietyName = this.varietyNameTemp;
        this.varietyPickerVisible = false;
        for(let item of this.lensVarietyList){
          if(item.varietyName == this.varietyNameTemp){
            this.varietyId = item.varietyId;
          }
        }
      },

      //确认镜框类型选择
      setFrameType(frameTypeId){
        this.frameTypeId = frameTypeId;
        if(this.orderServiceId==2){
          this.setVarietyPrice(this.varietyId,this.frameTypeId);
        }else{
          this.varietyPrice= 0;
        }
      },
      setVarietyPrice(varietyId,frameTypeId){
        for(let item of this.lensVarietyList){
            if(item.varietyId == varietyId){
                switch (frameTypeId){
                  case 1:
                    this.varietyPrice = Number(item.fullFramePrice);
                    break;
                  case 2:
                    this.varietyPrice = Number(item.halfFramePrice);
                    break;
                  case 3:
                    this.varietyPrice = Number(item.noneFramePrice);
                    break;
                  default:
                    this.varietyPrice = 0;
                }
            }
        }
      },
      //切边滑动选择
      onIsSideCutChange(picker, values) {
        this.isSideCutTemp = values[0];
      },
      //确认切边选择
      onIsSideCutConfirm(){
        this.isSideCutStr = this.isSideCutTemp;
        if(this.isSideCutStr=='需要切边'){
          this.isSideCut= true;
          if(this.orderServiceId == 2){
            this.sideCutPrice = Number(this.priceData.cutting_edge);
          }else{
            this.sideCutPrice=0;
          }
        }else if(this.isSideCutStr=='不需要切边'){
          this.isSideCut= false;
          this.sideCutPrice=0;
        }
        this.isSideCutPickerVisible = false;
      },
      changeBodyStyle(val){
        if (val){
          this.overflow = "hidden";
          document.body.classList.add( 'dialog-open');
        } else {
          this.overflow = "auto";
          document.body.classList.remove( 'dialog-open');
        }
      },
      ...mapMutations({
        subOrder: 'SUBMIT_ORDER'
      })
    },
    computed: {
      ...mapState({
          good : state => state.good,
          goodStr(state){
              var htmlArray = new Array();
              var good = state.good;
              if(good)htmlArray.push(good.funcName,good.goodsName);
              return htmlArray.join(" / ");
          }
      }),
      orderAmountStr(){
        if(this.orderServiceId==1){
          var price = 0;
          if( this.good.shopPrice){
            price = this.good.shopPrice
          }
          return price;
        }else{
          var machiningAmount = this.varietyPrice;;
          if(this.highScatter){
            machiningAmount+=this.highScatterPrice;
          }
          if(this.super10d){
            machiningAmount+=this.super10dPrice;
          }
          if(this.super20d){
            machiningAmount+=this.super20dPrice;
          }
          if(this.fullFrame){
            machiningAmount+=this.fullFramePrice;
          }
          if(this.tortoiseShell){
            machiningAmount+=this.tortoiseShellPrice;
          }
          return this.optometryAmount+ Number(machiningAmount);
        }
      }
    },
    watch:{
      leftPickerVisible:function(val) {
        this.changeBodyStyle(val);
      },
      rightPickerVisible:function(val) {
        this.changeBodyStyle(val);
      },
      eyePdPickerVisible:function(val) {
        this.changeBodyStyle(val);
      },
      eyeVdPickerVisible:function(val) {
        this.changeBodyStyle(val);
      },
      eyeAddPickerVisible:function(val) {
        this.changeBodyStyle(val);
      },
      varietyPickerVisible:function(val) {
        this.changeBodyStyle(val);
      },
      isSideCutPickerVisible:function(val) {
        this.changeBodyStyle(val);
      },
      dialogVisible:function(val) {
        this.changeBodyStyle(val);
      }
    }
  }
</script>

<style lang="css" scoped>
  .conditionPop .conditionWrap dd a {
    margin-left: 5px;
  }

  .selectPopup {
    height: 40%;
    width: 100%;
  }

  .selectPopup-s {
    height: 30%;
  }

  .dereepTopbar {
    width: 100%;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 0;
    text-align: right;
    font-size: 24px;
    position: relative;
  }

  .dereepTopbar .dereepBarItem {
    font-size: 18px;
    overflow: hidden;
    position: relative;
    max-height: 100%;
    flex: 2 1 0%;
    -webkit-box-flex: 2;
    padding: 0 10px;
  }

  .popupTopBar {
    width: 100%;
    height: 42px;
    line-height: 42px;
    vertical-align: middle;
    background: #f1f1f1;
    display: inline-block;
  }

  .popupTopBar .pbBtn {
    padding: 3px 10px;
    color: red;
  }

  .backBtn {
    float: left;

  }

  .confirmBtn {
    float: right;
  }
  .typeTab a{
    color: #181818;
    background: #fff;
    font-size: 11px;
    font-weight: normal;
    border: 1px solid #ddd;
    padding: 4px 10px;
    border-radius: 4px;
  }

  .typeTab .cur{
    color: #e52d11;
    background: #fef4f2;
    font-size: 11px;
    font-weight: normal;
    border: 1px solid #e52d11;
    padding: 4px 10px;
    border-radius: 4px;
  }


</style>
