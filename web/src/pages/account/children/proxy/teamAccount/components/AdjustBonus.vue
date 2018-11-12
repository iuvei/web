<template>
  <section class="components-adjust-bonus">
    <el-button icon="el-icon-arrow-left" size="small" @click="closeAdjustBonus">返回列表</el-button>
    <el-form ref="form"  label-width="120px" class="form-center">
      <el-form-item label="奖金组">
        <el-input-number :step="2" v-model="form.prizeGroup" :min="min" :max="max"></el-input-number><br><p style="font-size: 12px; color:#777">最小值:{{min}}  最大值:{{max}} 最小区间：2</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setUserPrizeGroup">保存修改</el-button>
      </el-form-item>
    </el-form>

  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'AdjustBonus',
    components: {
    },
    data() {
      return {
        form:{
          username: '',
          prizeGroup: 0,
        },
        min: 0,
        max: 0

      }
    },
    props: {
      userId: {
        type: Number,
        default() {
          return 0;
        }
      },
    },
    computed: {
    },
    watch: {
      userId: function(val){
        if(val != 0){
          this.getPrizeGroupForSet(val)
        }
      }
    },
    methods: {
      closeAdjustBonus(){
        this.$emit('eventCloseAdjust')
      },
      getPrizeGroupForSet(id){
        var param = {
          action:'getPrizeGroupForSet',
          user_id: id
        }
        this.axios.get('/service',{params:param}).then((data)=>{
          if(data.errno == 0){
            this.min = Number(data.data.min_group)
            this.max = Number(data.data.max_group)
            this.form.prizeGroup = this.min
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      setUserPrizeGroup(){
        var seriesPrizeGroupCache = {};
        seriesPrizeGroupCache[1] = this.form.prizeGroup
        let data = {
          action: 'setUserPrizeGroup',
          user_id: this.userId,
          series_prize_group_json: JSON.stringify(seriesPrizeGroupCache)
        }

        this.axios.post('/service',data).then((data)=>{
          if(data.errno == 0){
            this.$message({
              type: 'success',
              message: '恭喜您，修改成功！'
            });
            this.$emit('eventCloseAdjust',true)
          }else{
            this.form.prizeGroup = this.min
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      }
    },
    created() {
      this.getPrizeGroupForSet(this.userId)
    },
    mounted(){
    },
    beforeDestroy(){
    }

  }
</script>
<style lang="scss" scoped>
  .components-adjust-bonus {

  }
</style>
