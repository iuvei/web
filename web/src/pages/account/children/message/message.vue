<template>
  <section class="page-message">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="平台公告" name="announcement">
        <announcement></announcement>
      </el-tab-pane>
      <el-tab-pane label="站内信" name="letter">
        <letter></letter>
      </el-tab-pane>
      <el-tab-pane label="发信" name="send">
        <send></send>
      </el-tab-pane>
    </el-tabs>
    <a class="shadow-box-close" href="javascript:;" @click="$router.go(-1)">关闭</a>
  </section>
</template>
<script>
  import Announcement from './components/Announcement'
  import Letter from './components/Letter'
  import Send from './components/Send'

  export default {
    name: 'message',
    components: {
      Announcement,
      Letter,
      Send
    },
    data() {
      return {
        activeName: 'announcement',
      };
    },
    methods: {
      handleClick(tab, event) {
        if(tab.name=='letter'){
          this.$root.Bus.$emit('sendNewMessage',true)
        }
      }
    },
    created() {
      this.$emit("eventSize",true)
    },
    mounted(){
      if(this.$route.query.hasOwnProperty('type')){
        this.activeName = this.$route.query.type.toLowerCase()
      }
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .page-message {
    background: #fff;
  }
</style>
<style lang="scss">
  .page-message {

    .el-form-item__label {
      color: #000;
      font-size: 16px;
    }
    .el-form-item__content {
      font-size: 16px;
    }

  }

</style>
