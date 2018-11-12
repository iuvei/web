<template>
  <section class="components-manual-account">
    <el-form ref="form" :model="form" label-width="120px" class="form-center">
      <el-form-item label="账户类型">
        <el-radio-group v-model="form.isAgent">
          <el-radio-button :label="1">代理账号</el-radio-button>
          <el-radio-button :label="0">玩家账号</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="form.username" placeholder="6-16位字符，可使用字母或数字"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <span>a123456（默认密码）</span>
      </el-form-item>
      <el-form-item label="奖金组">
        <el-input-number v-model="form.prizeGroup" :step="2" :min="min" :max="max"></el-input-number><br><p style="font-size: 12px; color:#777">奖金组范围{{min}} ~ {{max}}</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="accurateCreateUser">立即开户</el-button>
      </el-form-item>
    </el-form>

  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  import ElFormItem from "../../../../../../../node_modules/element-ui/packages/form/src/form-item.vue";
  export default {
    name: 'ManualAccount',
    components: {
      ElFormItem
    },
    data() {
      return {
        form:{
          username: '',
          isAgent: 1,
          password: 'a123456',
          nickname: '',
          prizeGroup: 0,
        },
        num1: 1,

        canSetPlayer: false,
        a_max_group: 0,
        a_min_group: 0,
        p_max_group: 0,
        p_min_group: 0,
      }
    },
    computed: {
      min: function() {
        if(this.form.isAgent){
          return this.a_min_group = 0?0:this.a_min_group
        }else{
          return this.p_min_group = 0?0:this.p_min_group
        }
      },
      max: function() {
        if(this.form.isAgent){
          return this.a_max_group = 0?0:this.a_max_group
        }else{
          return this.p_max_group = 0?0:this.p_max_group
        }
      },
      ...mapGetters('common',['isAgent'])
    },
    methods: {
      handleChange(val){
      },
      getPrizeGroupForCreate(){
        this.axios.get('/service',{params:{
          action: 'getPrizeGroupForCreate'
        }}).then((data)=>{
          if(data.errno == 0){
            var obj = data.data
            // if(obj.can_set_player == 1){
            //   this.canSetPlayer = true
            // }else{
            //   this.canSetPlayer = false
            // }
            this.a_max_group = Number(obj.a_max_group)
            this.a_min_group = Number(obj.a_min_group)
            this.p_max_group = Number(obj.p_max_group)
            this.p_min_group = Number(obj.p_min_group)
            if(this.form.isAgent){
              this.form.prizeGroup = this.a_min_group
            }else{
              this.form.prizeGroup = this.p_min_group
            }
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },

      accurateCreateUser(){
        let data = {
          prize_group_id: '',
          is_agent: this.form.isAgent,
          username: this.form.username,
          password: this.form.password,
          nickname: this.form.username,
          series_prize_group_json: JSON.stringify({1: this.form.prizeGroup}),
        }
        this.axios.post('/service?action=accurateCreateUser',data).then((data)=>{
          if(data.errno == 0){
            this.resetForm('form')
            this.$message({
              type: 'success',
              message: '恭喜您，开户成功！'
            });
          }else{
            this.form.prizeGroup = this.min
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      resetForm() {
        this.$refs['form'].resetFields();
      }
    },
    created() {

      this.getPrizeGroupForCreate()

    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-manual-account {
    .main-content {
      padding: 10px 20px;
    }
    .el-input-number .el-input {
      width: auto;
    }
  }
</style>

<style lang="scss">
  .components-manual-account {
    .form-center {
      .el-input-number .el-input {
        width: auto;
      }
    }
  }
</style>
