<template>
  <section class="components-contract-team">
    <transition name="el-zoom-in-center">
      <div class="contract-main"  v-if="!dialogVisible">
        <div class="table-filter">
          <el-form :inline="true" :model="form" size="mini">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item>
              <a class="search-btn right" href="javascript:;" @click="getTableData">搜索</a>
            </el-form-item>
          </el-form>
        </div>
        <div class="table-content">
          <el-table
            v-loading="loading"
            height="350"
            stripe
            :data="tableData">
            <el-table-column
              prop="username"
              label="用户"
              width="120">
            </el-table-column>
            <el-table-column
              prop="group_account_sum"
              label="团队余额">
            </el-table-column>
            <el-table-column
              prop="children_num"
              label="团队人数">
            </el-table-column>
            <el-table-column
              prop="prize_group"
              label="返点">
            </el-table-column>
            <el-table-column
              prop="user_type"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="signin_at"
              width="180"
              label="登录时间">
            </el-table-column>
            <el-table-column label="操作" width="230">
              <template slot-scope="scope">
                <router-link :to="'/account/shadow/profit?name='+scope.row.username"><el-button size="mini">团队报表</el-button></router-link>
                <el-button v-if="scope.row.dividend_contract_status==3" size="mini" type="primary" @click="handleSetContract(scope.row)">签订契约</el-button>
                <el-button v-if="scope.row.dividend_contract_status==0 ||scope.row.dividend_contract_status==2" size="mini" type="primary" @click="handleSetContract(scope.row)">修改契约</el-button>
                <el-button v-if="scope.row.dividend_contract_status==1" size="mini" type="primary" @click="handleSetContract(scope.row)">契约详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="center">
            <el-pagination
              background
              :page-size="pageSize"
              layout="total, prev, pager, next"
              @current-change="handleCurrentChange"
              :total="count">
            </el-pagination>
          </div>
        </div>
      </div>
    </transition>

    <transition name="el-zoom-in-center">
      <div class="contract-main" v-if="dialogVisible">
        <el-button icon="el-icon-arrow-left" size="small" @click="dialogVisible = false">返回列表</el-button>
        <div class="contract-center">
          <p>下级用户[{{this.currentRow.username}}] <span class="right" :class="statusClass">契约状态：{{contractStatusText}}</span></p>
          <el-form :model="form" ref="form" size="small" inline>
            <el-form-item label="分红方式">
              <el-select :disabled="form.formDisabled" v-model="form.type" placeholder="请选择">
                <el-option label="总盈亏" :value="1"></el-option>
                <el-option label="总销量" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分红时间">
              <el-select :disabled="form.formDisabled" v-model="form.period" placeholder="请选择" width="200">
                <el-option label="半月分红不累计" :value="1"></el-option>
                <el-option label="半月分红累计1个月" :value="4"></el-option>
              </el-select>
            </el-form-item>
            <div class="dynamic-height">
              <el-form-item
                v-for="item,key in form.list"
                :key="key">
                {{form.type==1?'总盈亏':'总销量'}}<el-input :disabled="form.formDisabled" v-model="item.turnover"></el-input>元&nbsp;&nbsp;&nbsp;
                活跃用户<el-input :disabled="form.formDisabled" v-model="item.active_user_count"></el-input>人&nbsp;&nbsp;&nbsp;
                活跃金额<el-input :disabled="form.formDisabled" v-model="item.active_user_turnover"></el-input>元&nbsp;&nbsp;&nbsp;
                分红比例<el-input :disabled="form.formDisabled" v-model="item.rate"></el-input>%
                <el-button v-if="!form.formDisabled" type="danger" @click.prevent="remove(item)">删除</el-button>
              </el-form-item>
            </div>
            <el-form-item v-if="!form.formDisabled">
              <el-button type="primary" @click="setChildDividendContract">提交</el-button>
              <el-button @click="add">新增规则</el-button>
              <el-button @click="dialogVisible = false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
  </section>
</template>
<script>
  /**
   *  // 0:新建临时契约; 1:上下级达成契约; 2:拒绝签订契约; 3: 没有契约设置
   *
   */
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import ElFormItem from "../../../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  export default {
    name: 'ContractTeam',
    components: {
      ElFormItem
    },
    data() {
      return {
        form:{
          username:'',
          list:[
            {turnover:'',rate:'',active_user_count:'',active_user_turnover:''},
            ],
          type: 1,
          period: 1,
          formDisabled: false
        },
        tableData: [],
        currentRow: {},

        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1,
        dialogVisible: false
      }
    },
    computed: {
      ...mapGetters('common',['isAgent']),
      ...mapState('common',['userInfo']),
      contractStatusText: function(){
        var text = '未签订契约'
        if(Object.keys(this.currentRow).length>0){
          var status = this.currentRow.dividend_contract_status
          if(status == 0){
            text = '签订契约中...'
          }else if(status == 1){
            text = '已签订契约'
          }else if(status == 2){
            text = '已拒绝契约'
          }
          return text
        }
        return text
      },
      statusClass: function(){
        var name = ''
        if(Object.keys(this.currentRow).length>0){
          var status = this.currentRow.dividend_contract_status
          if(status == 0){
            name = 'color-blue'
          }else if(status == 1){
            name = 'color-green'
          }else if(status == 2){
            name = 'color-red'
          }
          return name
        }
      },
    },
    watch:{
    },
    methods: {
      getPrizeGroupForCreate(){
        this.axios.get('/service',{params:{
          action: 'getPrizeGroupForCreate'
        }}).then((data)=>{
          if(data.errno == 0){
            var obj = data.data
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      add(){
        this.form.list.push({turnover:'',rate:'',active_user_count:'',active_user_turnover:''});
      },
      remove(item){
        var index = this.form.list.indexOf(item)
        if (index !== -1) {
          this.form.list.splice(index, 1)
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      setChildDividendContract(){
        var data = {
          'username': this.currentRow.username,
          'type': this.form.type,
          'period': this.form.period,
        };
        this.form.list.map(function(val,index,arr){
          data['turnover['+index+']'] = val.turnover
          data['rate['+index+']'] = val.rate
          data['active_user_count['+index+ ']'] = val.active_user_count
          data['active_user_turnover['+index+ ']'] = val.active_user_turnover
        })
        this.axios.post('/service?action=setChildDividendContract',data).then((data)=>{
          if(data.errno == 0){
            this.$message({
              type: 'success',
              message: '恭喜您，提交成功！'
            });
            this.dialogVisible = false
            this.getTableData()
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      handleSetContract(item){
        this.dialogVisible = true
        this.currentRow = {...item}
        this.form.formDisabled = false
        if(item.dividend_contract_status == 0 || item.dividend_contract_status == 2){
          this.getUserDividendContract()
        }else if(item.dividend_contract_status == 3){
          this.form.list = [
            {turnover:'',rate:'',active_user_count:'',active_user_turnover:''},
          ]
        }else{
          this.getUserDividendContract()
          this.form.formDisabled = true
        }

      },
      //获取用户签约详情
      getUserDividendContract(){
        var param = {
          action:'getUserDividendContract',
          username: this.currentRow.username
        }
        this.axios.get('/service',{params:param}).then((data)=>{
          if(data.errno == 0){
            this.form.list = []
            this.form.list = [...data.data.contract]
            this.form.type = data.data.contract[0].type
            this.form.period = data.data.contract[0].period
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
            this.dialogVisible = false
          }
        })
      },
      //抓取列表数据
      getTableData(){
        this.loading = true
        this.axios.get('/service',{params:{
          action: 'getSubUserInfo',
          username: this.form.username,
          page: this.currentPage,
        }}).then((data)=>{
          this.loading = false
          if(data.errno == 0){
            this.count = data.data.count
            this.tableData = [...data.data.list]
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      //翻页
      handleCurrentChange(val){
        this.currentPage = val
        this.getTableData()
      }
    },
    created() {
      this.getTableData()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-contract-team {
    width: 1096px;
    height: 490px;
    position: relative;
    .table-filter {
      padding-left: 27px;
    }
    .contract-main {
      padding: 10px 0;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      .contract-center {
        padding-top: 10px;
        width: 840px;
        margin: 0 auto;
        p {
          padding: 0 0 10px;
        }
        .el-input {
          width: 80px;
          margin: 0 5px;
        }
        .item-td {
          border-right: 1px solid #bbb;
          display: inline-block;
          padding-right: 10px;
          margin-right: 10px;
        }
      }
    }
    .dynamic-height {
      max-height: 272px;
      overflow: auto;
      border: 1px solid #bbb;
      padding: 10px 10px;
      margin-bottom: 10px;
    }
  }
</style>

<style lang="scss">
  .components-contract-team {
    .el-table__header {
      width: 100%;
    }
    .el-table__body {
      width: 100%;
    }
  }
</style>
