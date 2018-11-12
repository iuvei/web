<template>
  <section class="components-letter">
    <transition name="el-zoom-in-center">
    <div class="letter-main" v-if="!dialogVisible">
      <div class="table-filter">
        <el-form :inline="true" :model="form" size="mini">
          <el-form-item>
            <el-radio-group v-model="form.type">
              <el-radio-button :label="1">收件箱</el-radio-button>
              <el-radio-button :label="2">发件箱</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-content">
        <el-table
          v-loading="loading"
          height="320"
          stripe
          :data="tableData"
          style="witdth:100%">
          <el-table-column
            width="80"
            label="状态">
            <template slot-scope="scope">
              <span :class="{ readed: scope.row.is_readed !=1 }"><i class="el-icon-message"></i>{{scope.row.is_readed ==1? '已读':'未读'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="msg_title"
            label="标题">
          </el-table-column>
          <el-table-column
            prop="type_id"
            label="消息类型">
          </el-table-column>
          <el-table-column
            prop="sender"
            label="发送人">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="发送时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleRead(scope.$index,scope.row)">阅读</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    </transition>
    <transition name="el-zoom-in-center">
      <div class="letter-main" v-if="dialogVisible">
        <el-button icon="el-icon-arrow-left" size="mini" @click="dialogVisible = false">返回列表</el-button>
        <div class="article-title">
          <h3>{{letter.msg_title}}</h3>
          <h4>{{letter.created_at}}</h4>
        </div>
        <div class="article-content">
          <p class="text-left">收信:{{letter.receiver}}</p>
          <p class="p-main" v-html="letter.msg_content"></p>
          <p class="text-right">发信:{{letter.sender}}</p>
        </div>
      </div>
    </transition>

  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'components-letter',
    components: {

    },
    data() {
      return {
        form:{
          type:1
        },
        letter:{
          msg_content:'',
          msg_title: '',
          sender: '',
          receiver: '',
          created_at: ''
        },
        tableData: [],
        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1,
        dialogVisible: false
      };
    },
    computed: {
      ...mapState('common',['unreadMessage'])
    },
    watch:{
      'form.type':function(){
        this.currentPage = 1
        this.getTableData()
      }
    },
    methods: {
      ...mapMutations('common',['SET_UNREAD_NUM']),
      getTableData(){
        this.loading = true
        var param = {
          action:'getUserLetters',
          type: this.form.type,
          page: this.currentPage
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
      handleCurrentChange(val){
        this.currentPage = val
        this.getTableData()
      },
      handleRead(index,row){
        let data = {
          msg_id: row.id
        }
        this.axios.post('/service?action=readLetter',data).then((data)=>{
          if(data.errno == 0){
            this.tableData[index]['is_readed'] = 1
            var num = Number(this.unreadMessage)
            if(num>0){
              this.SET_UNREAD_NUM(num-1)
            }
            this.letter = {...data.data}
            this.dialogVisible = true
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      handleDelete(index,row){
        let data = {
          msg_id: row.id
        }
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.post('/service?action=deleteLetter',data).then((data)=>{
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
      }
    },
    created() {
      var _this = this
      this.getTableData()
      this.$root.Bus.$on('sendNewMessage', (bool)=> {
        if(bool){
          _this.getTableData()
        }
      })
    },
    mounted(){

    },
    activated(){
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-letter {
    width: 982px;
    height: 440px;
    position: relative;
    .letter-main {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      .article-title{
        text-align: center;
        line-height: 1.4;
        padding-bottom: 10px;
        h3{
          font-size: 18px;
        }
        h4{
          font-size: 14px;
        }
      }
      .article-content {
        border-top: 1px dashed #999;
        padding-top: 10px;
        margin: 0 200px;
        line-height: 2em;
        height: 340px;
        overflow: auto;
        .p-main {
          font-size: 16px;
          text-indent: 2.4em;
        }
      }
    }

    .readed {
      color: #0a94e3;
    }
  }
</style>

