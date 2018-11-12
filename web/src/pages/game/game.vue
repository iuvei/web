<template>
  <section class="page-game">
    <div class="iframe-box" v-show="gameIframeLink!=''">
      <iframe class="iframe" id="mainframe"  ref="iframeGame" width="100%" scrolling="no"></iframe>
    </div>
  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'

  export default {
    name: 'account',
    components: {
    },
    data(){
      return {
        iframeHeight: 0
      }
    },
    computed:{
      ...mapState('common',['isLogin','gameIframeLink','iframeName','iframeLoading'])
    },
    watch:{
      gameIframeLink: function(curVal,oldVal){
        this.$refs.iframeGame.contentWindow.location.replace(curVal)
      }
    },
    methods: {
      setIframeHeight(){
        setTimeout(() => {
          this.iframeHeight = this.$refs.iframeGame.contentDocument.body.scrollHeight + 'px'
        }, 1000);
      },

      receiveMessage(e){
        if(e.data == 'loginTimeout'){
          this.$cookie.delete('USERTOKEN')
          this.SET_ISLOGIN(false)
          this.$router.replace('/login')
        }
      },

      ...mapMutations('common',['SET_GAME_IFRAME_LINK','SET_ISLOGIN'])
    },
    created() {
      this.SET_GAME_IFRAME_LINK(window.location.origin+'/static/game/ssc.html')
      console.log(this.gameIframeLink)
    },
    activated(){
      this.$refs.iframeGame.contentWindow.location.replace(this.gameIframeLink)
    },
    mounted(){
      //iframe resize
      iFrameResize({},'#mainframe')
      //绑定登录超时检测
      window.addEventListener("message", this.receiveMessage, false);
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .page-game {
    width: 100%;
    .iframe-box {
      width: 100%;
    }
    .iframe {
      width: 100%;
      border: none;
      background: #fff;
    }
  }
</style>
