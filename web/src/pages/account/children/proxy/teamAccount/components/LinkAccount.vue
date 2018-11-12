<template>
  <section class="components-link-account">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" :inline="true" class="form-center">
      <el-form-item label="账户类型">
        <el-radio-group v-model="form.isAgent">
          <el-radio-button :label="1">代理账号</el-radio-button>
          <el-radio-button :label="0">玩家账号</el-radio-button>
        </el-radio-group>
      </el-form-item><br>
      <el-form-item label="链接有效期">
        <el-select v-model="form.validDays" placeholder="请选择">
          <el-option
            v-for="item,key in dateList"
            :key="key"
            :label="item.text"
            :value="item.time">
          </el-option>
        </el-select>
      </el-form-item><br>
      <el-form-item label="推广渠道">

        <el-input placeholder="请输入内容" v-model="form.type" class="input-with-select">
          <el-select v-model="form.select" slot="prepend" placeholder="请选择">
            <el-option label="论坛" value="论坛"></el-option>
            <el-option label="qq群" value="qq群"></el-option>
            <el-option label="其他" value=""></el-option>
          </el-select>
        </el-input>
      </el-form-item><br>
      <el-form-item label="客服QQ" prop="qq1" class="small-input">
        <el-input v-model.trim="form.qq1" placeholder="QQ1"></el-input>
      </el-form-item>
      <el-form-item prop="qq2" class="small-input">
        <el-input v-model.trim="form.qq2" placeholder="QQ2"></el-input>
      </el-form-item><br>
      <el-form-item label=" " prop="qq3" class="small-input">
        <el-input v-model.trim="form.qq3" placeholder="QQ3"></el-input>
      </el-form-item>
      <el-form-item prop="qq4" class="small-input">
        <el-input v-model.trim="form.qq4" placeholder="QQ4"></el-input>
      </el-form-item><br>
      <el-form-item label="设置奖金组">
        <el-input-number v-model="form.prizeGroup" :step="2" :min="min" :max="max"></el-input-number><br>
        <p style="font-size: 12px; color:#777">奖金组范围{{min}} ~ {{max}}</p>
      </el-form-item><br>
      <el-form-item label=" ">
        <el-button type="primary" @click="createRegisterLink">立即开户</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'LinkAccount',
    components: {
    },
    data() {

      var checkQQ = (rule, value, callback) => {
        if (!value) {

        }else{
          var nValue = Number(value)
          if (!Number.isInteger(nValue) || nValue<10000) {
            callback(new Error('请填写真实的QQ'));
          } else {
              callback();
          }
        }
      };

      return {
        activeName: 'first',
        form:{
          isAgent: 1,
          type: "论坛",
          select: "论坛",
          qq1: '',
          qq2: '',
          qq3: '',
          qq4: '',
          prizeGroup: 0,
          validDays: null,
        },
        rules:{
          qq1: [
            { validator: checkQQ, trigger: 'change' }
          ],
          qq2: [
            { validator: checkQQ, trigger: 'change' }
          ],
          qq3: [
            { validator: checkQQ, trigger: 'change' }
          ],
          qq4: [
            { validator: checkQQ, trigger: 'change' }
          ],
        },
        dateList:[
          {time:1,text:'1天'},
          {time:7,text:'7天'},
          {time:30,text:'30天'},
          {time:90,text:'90天'},
          {time:0,text:'永久有效'},
        ],
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
    watch:{
      'form.select': function(val){
        if(val!=""){
          this.form.type = val
        }else{
          this.form.type = ''
        }
      }
    },
    methods: {
      checkPrize: function(){
        setTimeout(()=>{
          let przieGroup = Number(this.form.prizeGroup)
          if( przieGroup < Number(this.min)){
            this.form.prizeGroup = this.min
          }
          if(przieGroup > Number(this.max)){
            this.form.prizeGroup = this.max
          }
        },300)

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
      createRegisterLink(){
        var data = {
          is_agent: this.form.isAgent,
          prize_group_id: '',
          series_prize_group_json: JSON.stringify({1: this.form.prizeGroup}),
          agent_prize_set_quota: {},
          channel: this.form.type,
          'agent_qqs[1]': this.form.qq1,
          'agent_qqs[2]': this.form.qq2,
          'agent_qqs[3]': this.form.qq3,
          'agent_qqs[4]': this.form.qq4,
          prize_group_type: 2,
          valid_days: this.form.validDays
        }
        this.axios.post('/service?action=createRegisterLink',data).then((data)=>{
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
      this.$root.Bus.$on('linkAccount', (bool)=> {
        if(bool){
          this.getPrizeGroupForCreate()
        }
      })


    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-link-account {
    .main-content {
      padding: 10px 20px;
    }
  }
</style>

<style lang="scss">
  .components-link-account {
    .form-center {
      .el-input-number .el-input {
        width: auto;
      }
      .small-input {
        .el-input {
          width: 123px;
        }
      }
      .input-with-select {
        .el-input {
          width: 120px;
        }
      }
      .text-center {
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
