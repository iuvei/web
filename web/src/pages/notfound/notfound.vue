<template>
  <section class="page-notfound" :style="'height:'+ screenHeight+'px'">
    <p><router-link to="/home"><el-button type="primary" icon="el-icon-arrow-left">返回首页</el-button></router-link></p>
  </section>
</template>

<script>

  export default {
    name: 'notfound',
    components: {
    },
    data() {
      return {
        screenHeight: document.documentElement.clientHeight,
      }
    },
    methods: {
      getHeight(){
        window.screenHeight = document.documentElement.clientHeight
        this.screenHeight = window.screenHeight
      },
    },
    created() {
    },
    beforeDestroy(){
    },
    mounted() {
      window.addEventListener('resize',this.getHeight);
      //不显示顶部底部
      this.$emit("eventFromChild",false)
    },
    deactivated (){
      //显示顶部底部
      this.$emit("eventFromChild",true)
      window.removeEventListener('resize',this.getHeight);
    },
    beforeDestroy(){
      this.$emit("eventFromChild",true)
      window.removeEventListener('resize',this.getHeight);
    }

  }
</script>
<style lang="scss" scoped>
  .page-notfound {
    width: 100%;
    height: 100%;
    background: #fff url(../../assets/common/404.png) no-repeat center center;
    p{
      padding: 30px 0;
      margin: 0 auto;
      width: 1000px;
    }
  }
</style>
