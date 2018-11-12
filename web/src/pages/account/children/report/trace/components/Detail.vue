<template>
  <section class="components-trace-detail">
    <div class="letter-main">
      <el-button icon="el-icon-arrow-left" size="mini" @click="closeDetail">返回列表</el-button>
      <div class="item-center">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>追号信息</span>
          </div>
          <div class="item-info can-select">
            <p><label>追号编号</label>{{detail.serial_number}}</p>
            <p><label>追号金额</label>￥{{detail.amount_formatted}}</p>
            <p><label>完成金额</label>￥{{detail.finished_amount_formatted}}</p>
            <p><label>取消金额</label>￥{{detail.canceled_amount_formatted}}</p>
            <p><label>货币模式</label>{{detail.formatted_coefficient}}</p>
            <p><label>开始期号</label>{{detail.start_issue}}</p>
            <p><label>追号期数</label>{{detail.total_issues}}期</p>
            <p><label>完成期数</label>{{detail.finished_issues}}期</p>
            <p><label>取消期数</label>{{detail.canceled_issues}}期</p>
            <p><label>追号状态</label>{{detail.formatted_status}}</p>
            <p><label></label>
              <el-button v-if="detail.can_be_canceled" @click="handleDrop()" type="danger" size="mini">终止所有追号</el-button>
            </p>
          </div>
        </el-card>
          <div class="table-content">
            <el-table
              stripe
              v-loading="loading"
              height="400"
              size="mini"
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="issue"
                label="奖期">
              </el-table-column>
              <el-table-column
                prop="multiple"
                label="倍数">
              </el-table-column>
              <el-table-column
                prop="display_status"
                label="状态">
              </el-table-column>
              <el-table-column
                prop="bought_at"
                label="操作">
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.status_waiting != 1 && scope.row.status != 2"
                    size="mini"
                    @click="handleRead(scope.$index,scope.row)">详情</el-button>
                  <el-button
                    v-if="scope.row.status_waiting == 1"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index,scope.row)">终止追号</el-button>
                  <span v-if="scope.row.status == 2">用户取消</span>
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
    </div>
  </section>
</template>

<script>
  export default {
    name: 'components-trace-detail',
    components: {

    },
    props: {
      gameId: {
        type: Number,
        default() {
          return 0;
        }
      },
    },
    data() {
      return {

        detail: {
          can_be_canceled: true,
          amount_formatted: '',
          finished_amount_formatted: '',
          canceled_amount_formatted: '',
          formatted_coefficient: '',
          start_issue: '',
          total_issues: '',
          finished_issues: '',
          canceled_issues: '',
          formatted_status: '',
        },
        tableData: [],
        loading: true,
        pageSize: 10,
        count: 0,
        currentPage: 1,
      };
    },
    methods: {
      closeDetail(){
        this.$emit('eventTraceDetail',true)
      },
      getTableData(){
        this.loading = true
        var param = {
          action:'getTraceProjectDetail',
          trace_id: this.gameId,
          page: this.currentPage,
          pagesize: this.pageSize
        }
        this.axios.get('/service',{params:param}).then((data)=>{
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
      getTraceDetail(){
        var param = {
          action: 'getTraceDetail',
          id: this.gameId
        }
        this.axios.get('/service',{params:param}).then((data)=>{
          if(data.errno == 0){
            this.detail = {...data.data}
          }else{
            this.closeDetail()
            this.$message({
              type: 'error',
              message: data.error
            })
          }
        })
      },

      handleCurrentChange(val){
        this.currentPage = val
        this.getTableData()
      },
      handleDrop(){
        this.$confirm('您确认要终止所有追号吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDropProject()

        }).catch(() => {
        });
      },
      doDropProject(){
        let data = {
          action: 'stopTrace',
          id: this.gameId
        };
        this.axios.post('/service',data).then((data)=>{
          if(data.errno == 0){
            this.closeDetail()
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      handleRead(index,row){
        this.$router.push('/account/shadow/reportGame?id='+row.project_id)
      },
      handleDelete(index,row){
        this.$confirm('您确认要终止本期追号吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            action: 'cancelTraceReserve',
            "trace_id":row.trace_id,
            "ids":JSON.stringify(row.id)
          }
          this.axios.post('/service',data).then((data)=>{
            if(data.errno == 0){
              this.getTableData()
            }else{
              this.$message({
                type: 'error',
                message: data.error
              });
            }
          })

        }).catch(() => {
        });
      }
    },
    created() {
      this.getTraceDetail()
      this.getTableData()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-trace-detail {
    background: #fff;
    height: 440px;
    .lottery-info-number {
      text-align: center;
      margin-top: -20px;
      span {
        color: red;
      }
    }
    .item-center {
      display: flex;
      line-height: 32px;
      .box-card {
        flex: 1;
        margin: 10px;
      }
      .item-info {
        p {
          border-bottom: 1px #ddd dashed;
        }
        label {
          width: 100px;
          display: inline-block;
        }
        .item-textarea {
          width: 350px;
          vertical-align: top;
          margin: 4px 0;

        }
      }
      .table-content {
        flex: 1;
        overflow: auto;
      }

    }

  }
</style>

