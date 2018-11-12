<template>
  <section class="components-link-managemant">
    <el-table
      v-loading="loading"
      height="450"
      :data="tableData">
      <el-table-column
        prop="channel"
        label="渠道">
      </el-table-column>
      <el-table-column
        label="链接"
        width="170px">
        <template slot-scope="scope">
          <el-input :value="scope.row.url" readonly size="mini" style="width: 150px;"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_count"
        label="注册人数">
      </el-table-column>
      <el-table-column
        prop="is_agent"
        label="开户类型">
      </el-table-column>
      <el-table-column
        prop="expired_at"
        width="160"
        label="到期时间">
      </el-table-column>
      <el-table-column
        prop="created_at"
        width="160"
        label="生成时间">
      </el-table-column>
      <el-table-column
        label="奖金组">
        <template slot-scope="scope">
          {{JSON.parse(scope.row.prize_group_sets)[0]['prize_group']}}
        </template>
      </el-table-column>
      <el-table-column
        prop="ablance"
        width="160"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-clipboard:copy="scope.row.url"
            v-clipboard:success="copySuccess"
            v-clipboard:error="onError"
            type="primary">复制</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteLink(scope.$index,scope.row)">删除</el-button>
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
  </section>
</template>

<script>

  export default {
    name: 'LinkManagement',
    components: {
    },
    data() {
      return {
        form:{
          name:'',
          password:'',
          prizeGroup: 1960
        },
        tableData: [],
        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1,
        onError: '您的浏览器不支持复制，请手动复制！'
      }
    },
    methods: {
      copySuccess(){
        this.$message({
          type: 'success',
          message: '复制成功，请打开浏览器粘贴!'
        });
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.getTableData()
      },
      deleteLink(index,row){
        let data = {
          link_id: row.id
        }
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/service?action=deleteRegisterLink',data).then((data)=>{
            if(data.errno == 0){
              this.tableData.splice(index,1)
            }else{
              this.$message({
                type: 'error',
                message: data.error
              });
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });

      },
      getTableData(){
        this.loading = true
        this.axios.get('/service?action=getRegisterLinks').then((data)=>{
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
    },
    created() {
      this.$root.Bus.$on('sendNewLink', (bool)=> {
        if(bool){
          this.getTableData()
        }
      })

    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-link-managemant {
  }
</style>

