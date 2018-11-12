<template>
  <section class="components-my-contract">
    <div class="contract-centner">
      <h2>基础分红比例</h2>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="profit"
          label="总销量">
        </el-table-column>
        <el-table-column
          prop="percent"
          label="分红比例">
        </el-table-column>
        <el-table-column
          prop="usernum"
          label="活跃用户">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <span :class="statusClass">{{statusText}}</span>
          </template>
        </el-table-column>
      </el-table>
      <h2>附加分红比例</h2>
      <el-table
        :data="tableData2"
        border
        class="my-table"
        style="width: 100%">
        <el-table-column
          label="总销量">
          <template slot-scope="scope">
            <span>{{scope.row.turnover | fAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="active_user_count"
          label="活跃用户数">
        </el-table-column>
        <el-table-column
          label="活跃金额(元)">
          <template slot-scope="scope">
            {{scope.row.active_user_turnover | fAmount}}
          </template>
        </el-table-column>
        <el-table-column
          label="分红比例">
          <template slot-scope="scope">
            {{scope.row.rate}}%
          </template>
        </el-table-column>
      </el-table>
      <p v-if="isShowContractAgree" class="p-center">
        <el-button type="primary" @click="agreeDividendContract">同意契约</el-button>
        <el-button type="danger" @click="rejectDividendContract">拒绝契约</el-button>
      </p>
    </div>

  </section>
</template>
<script>

  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'MyContract',
    components: {
    },
    data() {
      return {
        period:['一月分红一次', '半月分红一次','3个月分红一次','一周分红一次','半月不清零分红'],
        tableData:[
          {profit: 0,percent: '0%',usernum: 0,}
        ],
        tableData2:[],
        status: 0
      }
    },
    computed: {
      ...mapState('common',['userInfo']),
      ...mapGetters('common',['isAgent']),
      ...mapGetters('common',['isShowContractAgree']),
      statusText: function(){
        var text = '未签订契约'
        var status = this.status
        if(status == 0){
          text = '签订契约中...'
        }else if(status == 1){
          text = '已签订契约'
        }else if(status == 2){
          text = '已拒绝契约'
        }
        return text
      },
      statusClass: function(){
        var name = ''
        var status = this.status
        if(status == 0){
          name = 'color-blue'
        }else if(status == 1){
          name = 'color-green'
        }else if(status == 2){
          name = 'color-red'
        }
        return name
      },
    },
    watch:{
    },
    filters: {
      fRate: function (value) {
        if (!value) return ''
        value = Number(value)*100
        return value.toFixed(2)+'%'
      }
    },
    methods: {
      ...mapMutations('common',['SET_USERINFO_CONTRACT_STATUS']),
      getContract(){
        this.axios.get('/service',{params:{
          action: 'getContract'
        }}).then((data)=>{
          if(data.errno == 0){
            var obj = data.data
            console.log(obj)
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      agreeDividendContract(){
        this.axios.post('/service',{action: 'agreeDividendContract'}).then((data)=>{
          if(data.errno == 0){
            this.$message({
              type: 'success',
              message: '恭喜您，签订成功！'
            });
            this.SET_USERINFO_CONTRACT_STATUS(1)
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      rejectDividendContract(){
        this.$confirm('您确认要拒绝签约吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/service',{action: 'rejectDividendContract'}).then((data)=>{
            if(data.errno == 0){
              this.$message({
                type: 'success',
                message: '已拒绝！'
              });
              this.SET_USERINFO_CONTRACT_STATUS(2)
            }else{
              this.$message({
                type: 'error',
                message: data.error
              });
            }
          })

        }).catch(() => {
        });


      },

      getUserDividendContract(){
        this.axios.get('/service',{params:{
          action: 'getUserDividendContract'
        }}).then((data)=>{
          if(data.errno == 0){
            var obj = data.data.contract
            this.tableData2 = [...obj]
            this.status = data.data.status
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      }
    },
    created() {
      this.getUserDividendContract()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-my-contract {
    height: 490px;
    overflow: auto;
    h2 {
      font-size: 18px;
      line-height: 18px;
      padding: 15px 0 5px;
      text-align: center;
    }
    .contract-centner {
      width: 600px;
      margin: 0 auto;
    }
    .p-center {
      text-align: center;
      padding: 10px;
    }

  }
</style>

<style lang="scss">
  .components-my-contract {

  }
</style>
