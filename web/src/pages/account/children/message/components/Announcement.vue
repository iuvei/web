<template>
  <section class="components-announcement">

    <transition name="el-zoom-in-center">
      <div class="letter-main" v-if="!dialogVisible">
        <ul class="message-list">
          <li v-for="item,key in tableData" :key="key" @click.stop="showDetail(item.id)">
            <div class="list-warp">
              <div class="list-title">{{item.title}}</div>
              <div class="list-date">{{item.created_at}}</div>
            </div>
          </li>
        </ul>
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
          <h3>{{currentTitle}}</h3>
          <h4>{{currentTime}}</h4>
        </div>
        <div class="article-content">
          <div v-html="currentContent"></div>
        </div>
      </div>
    </transition>

  </section>
</template>

<script>
  export default {
    name: 'components-announcement',
    components: {

    },
    data() {
      return {
        tableData: [],
        loading: true,
        pageSize: 10,
        count: 0,
        currentPage: 1,
        currentContent: '',
        currentTitle: '',
        currentTime: '',
        dialogVisible: false,
      };
    },
    methods: {
      closeDetail(){
        this.dialogVisible = false
      },
      showDetail(id){
        var param = {
          action: 'getNoticeDetail',
          id: id
        }
        this.axios.get('/service',{params:param}).then((data)=>{
          if(data.errno == 0){
            this.currentContent = data.data.content
            this.currentTitle = data.data.title
            this.currentTime = data.data.created_at

            this.dialogVisible = true

          }else{
            this.$message({
              type: 'error',
              message: data.error
            })
          }



        })
      },
      getNoticeList(){
        this.axios.get('/service?action=getNoticeList',{params:{ page: this.currentPage}}).then((data)=>{

          this.loading = false
          if(data.errno == 0){
            this.count = data.data.count,

            this.tableData = [...data.data.list.data]
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
        this.getNoticeList()
      },
    },
    created() {
      this.getNoticeList()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-announcement {
    background: #fff;
    height: 440px;
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
        margin: 0 50px;
        line-height: 2em;
        overflow: auto;
        height: 340px;
        .p-main {
          font-size: 16px;
          text-indent: 2.4em;
        }
      }
    }

    .message-list {
      width: 100%;
      height: 390px;
      overflow: auto;
      li{
        border-bottom: 1px dashed #e8e8e8;
        .list-warp {
          display: flex;
          line-height: 40px;
          width: 100%;
          .list-title {
            flex: 2;
            text-align: left;
            padding-left: 5px;
          }
          .list-date{
            flex: 1;
            text-align: right;
            padding-right: 5px;
          }
          &:hover{
            background: #eee;
          }
        }
      }
      .announcment-detail{
        width: 100%;
        padding: 20px 0;
        position: relative;
        font-size: 13px;
        line-height: 16px;
        .close-detail {
          position: absolute;
          font-size: 20px;
          right: 20px;
          top: 20px;

        }
      }
    }
  }
</style>

