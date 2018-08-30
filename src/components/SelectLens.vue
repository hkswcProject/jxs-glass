<template>
  <div>
    <div class="page-header-main">
      <mt-header title="镜片选择" fixed>
        <a href="javascript:void(0);" slot="left" @click="closeSelect">
          <mt-button icon="back">返回</mt-button>
        </a>
      </mt-header>
    </div>

  <div class="container">
    <!-- 搜索 -->
    <div class="searchBox">
      <div class="searchbar-inner">
        <i class="iconfont icon-search"></i>
        <form action="javascript:return true;" style="width:100%">
             <input v-model.lazy="keyword" placeholder="搜索" class="mint-searchbar-core"  @keyup.enter="search" type="search">
        </form>
      </div>
      <!-- filter -->
      <!-- <span class="filter" @click.native="popupVisible3 = true" size="large">
                <i class="iconfont icon-shaixuan"></i>
            </span> -->
      <mt-button size="large" class="filter" @click="filterPouperVisiable=true"><i class="iconfont icon-shaixuan"></i>
      </mt-button>
    </div>

    <!-- 镜片列表 -->
    <div class="goodWrap" :style="'height:'+divHeight"  v-infinite-scroll="loadGoodList"
         infinite-scroll-distance="10">

      <div v-for = "item in goods" class="panel-wrap lensWrap">
        <div class="panel-wrap-body">
          <!-- 镜片信息 -->
          <div class="lensInfo">
            <h3 class="lensName">{{item.funcName}} {{item.goodsName}}</h3>
            <div class="others">
              <span class="price">￥{{item.shopPrice.toFixed(2)}}</span>
              <a href="javascript:void(0);" class="selectBtn" @click="chooseGood(item)">选用</a>
            </div>
          </div>
        </div>
      </div>
      <div class="more_loading">
        <mt-spinner type="fading-circle" :size="25" v-show="!allLoaded"></mt-spinner>
        <span v-show="allLoaded">已全部加载</span>
      </div>

    </div>

    <mt-popup v-model="filterPouperVisiable" position="right" class="mint-popup-3" :modal="true">
      <div class="conditionPop">
        <!-- 筛选条件 -->
        <div class="conditionWrap" :style="'overflow:auto;height:'+divHeight">
          <dl>
            <dt>品牌</dt>
            <dd>
              <a v-for = "item in brandList" href="javascript:void(0);" :class="{'cur': item.isChk == true}" @click="chooseFilterItem(item)" >{{item.name}}</a>
            </dd>
          </dl>
          <dl>
            <dt>镜面类型</dt>
            <dd>
              <a  v-for = "item in lensTypeList" href="javascript:void(0);"  :class="{'cur': item.isChk == true}" @click="chooseFilterItem(item)" >{{item.name}}</a>
            </dd>
          </dl>
          <dl>
            <dt>折射率</dt>
            <dd>
              <a v-for = "item in refractivityList" href="javascript:void(0);" :class="{'cur': item.isChk == true}" @click="chooseFilterItem(item)" >{{item.name}}</a>
            </dd>
          </dl>
          <dl>
            <dt>功能</dt>
            <dd>
              <a v-for = "item in funcList" href="javascript:void(0);" :class="{'cur': item.isChk == true}" @click="chooseFilterItem(item)" >{{item.name}}</a>
            </dd>
          </dl>
          <dl>
            <dt>材质</dt>
            <dd>
              <a v-for = "item in materialList" href="javascript:void(0);" :class="{'cur': item.isChk == true}" @click="chooseFilterItem(item)" >{{item.name}}</a>
            </dd>
          </dl>
        </div>
        <!-- 按钮组 -->
        <div class="buttonWrap">
          <mt-button @click.native="resetFilter()" size="small" type="default" class="is-plain">重置</mt-button>
          <mt-button @click.native="confirmFilter()" size="small" type="primary">确定</mt-button>
        </div>
      </div>
    </mt-popup>
  </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name: 'SelectLens',
    data() {
      return {
        filterPouperVisiable:false,
        divHeight:0,
        goods: [],
        keyword:'',
        brandIds:'',
        lensTypeIds: '',
        refractivityIds: '',
        funcIds: '',
        materialIds: '',
        keyword: '',
        pageNum: 1,
        pageSize: 10,
        //滚动加载
        loading:false,
        queryLoading: false,
        allLoaded: false,
        // 类型
        brandList:[],
        funcList:[],
        lensTypeList:[],
        materialList:[],
        refractivityList:[],
      };
    },
    created(){
      this.divHeight=window.innerHeight-86+'px';
      this.getBrandList();
      this.getDictList();
    },
    methods: {
      //加载眼镜列表
      loadGoodList(){
        if(this.allLoaded){
          return;
        }
        if(this.loading){
            return;
        }
        this.loading = true;
        setTimeout(() => {

          this.axios({
            url: '/api/goods/list',
            data: {
              brandIds:this.brandIds,
              lensTypeIds:this.lensTypeIds,
              refractivityIds: this.refractivityIds,
              funcIds: this.funcIds,
              materialIds: this.materialIds,
              keyword: this.keyword,
              pageNum: this.pageNum,
              pageSize: this.pageSize
            },
            method: 'post'
          }).then((res) => {
            if(res.data && res.data.dataList){
              this.goods = this.goods.concat(res.data.dataList);
              this.pageNum+=1;
              this.allLoaded = this.goods.length== res.data.totalCount;
            }else{
              this.allLoaded =true;
            }
            this.loading = this.allLoaded;
          }).catch((response) => {
            this.allLoaded =true;
          })
        }, 500);
      },
      //获取品牌列表
      getBrandList(){
        this.axios({
          url: '/api/brand/list',
          method: 'post'
        }).then((res) => {
          if(res.data){
            for(let item of res.data){
              this.brandList.push({
                  name:item.brandName,
                  code:item.brandId,
                  isChk:false
              })
            }
          }
        }).catch((response) => {
          console.log(response);
        })
      },
      getDictList(){
        this.axios({
          url: '/api/dict/list',
          method: 'post'
        }).then((res) => {
          if(res.data){
            for(let item of res.data){
              item.isChk = false;
                if(item.category=='func_id'){
                  this.funcList.push(item);
                }else if(item.category=='lens_type_id'){
                  this.lensTypeList.push(item);
                }else if(item.category=='material_id'){
                  this.materialList.push(item);
                }else if(item.category=='refractivity_id'){
                  this.refractivityList.push(item);
                }
            }
          }
        }).catch((response) => {
          console.log(response);
        })
      },
      //选择过滤条件
      chooseFilterItem(item,list){
        item.isChk = !item.isChk;
      },
      confirmFilter(){
        this.brandIds = this.setSelectList(this.brandList);
        this.lensTypeIds = this.setSelectList(this.lensTypeList);
        this.refractivityIds = this.setSelectList(this.refractivityList);
        this.funcIds = this.setSelectList(this.funcList);
        this.materialIds = this.setSelectList(this.materialList);
        this.filterPouperVisiable = false;
        this.pageNum = 1;
        this.loading = false;
        this.allLoaded = false;
        this.queryLoading = false;
        this.goods = [];
        this.loadGoodList();
      },
      resetFilter(){
        this.setListChkFalse(this.brandList);
        this.setListChkFalse(this.lensTypeList);
        this.setListChkFalse(this.refractivityList);
        this.setListChkFalse(this.funcList);
        this.setListChkFalse(this.materialList);
        this.filterPouperVisiable = false;
        this.brandIds ="";
        this.lensTypeIds ="";
        this.refractivityIds ="";
        this.funcIds ="";
        this.materialIds ="";
        this.pageNum = 1;
        this.loading = false;
        this.allLoaded = false;
        this.queryLoading = false;
        this.goods = [];
        this.loadGoodList();

      },
      setSelectList(list){
          var tempList = new Array();
          for(let item of list){
              if(item.isChk){
                  tempList.push(item.code)
              }
          }
          return tempList.join(",")
      },
      setListChkFalse(list){
        for(let item of list){
          item.isChk = false;
        }
      },
      search(){
        this.pageNum = 1;
        this.loading = false;
        this.allLoaded = false;
        this.queryLoading = false;
        this.goods = [];
        this.loadGoodList();
      },
      //选择眼镜
      chooseGood(good){
        this.setGood(good);
        this.closeSelect();
      },
      closeSelect(){
        this.$emit('closeSelect',false);
      },
      ...mapMutations({
        setGood: 'CHOOSE_GOOD'
      })
    }
  };
</script>
<style lang="css" scoped>
  .searchBox{
    position: fixed;
    width: 100%;
    top:40px;
    z-index: 2;
  }
  .conditionPop .conditionWrap dl{
    margin-bottom: 10px;
  }
  .conditionPop .conditionWrap dt {
    margin-bottom:10px;
    font-size: 14px;
  }
  .conditionPop .conditionWrap dd a {
    margin-left: 5px;
    padding: 6px;
    width:60px;
  }

  .goodWrap {
    width: 100%;
    margin-top:86px;
    overflow: auto;
  }
  .more_loading{
    text-align: center;
  }
  .more_loading span{
    width: 100%;
    text-align: center;
  }
</style>

