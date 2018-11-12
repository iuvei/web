<template>
  <section class="page-security-question">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px" size="mini" class="form-center" v-show="!showConfirm">
      <el-form-item label="问题一"  prop="question1">
        <el-select v-model="form.question1" placeholder="请选择安全口令问题">
          <el-option
            v-for="item,key in leftQuestions"
            :key="item.id"
            :label="item.content"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="答案一"  prop="answer1">
        <el-input v-model="form.answer1"></el-input>
      </el-form-item>
      <el-form-item label="问题二"  prop="question2">
        <el-select v-model="form.question2" placeholder="请选择安全口令问题">
          <el-option
            v-for="item,key in leftQuestions"
            :key="item.id"
            :label="item.content"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="答案二"  prop="answer2">
        <el-input v-model="form.answer2"></el-input>
      </el-form-item>
      <el-form-item label="问题三"  prop="question3">
        <el-select v-model="form.question3" placeholder="请选择安全口令问题">
          <el-option
            v-for="item,key in leftQuestions"
            :key="item.id"
            :label="item.content"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="答案三"  prop="answer3">
        <el-input v-model="form.answer3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirmQuestions">确认</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-form v-show="showConfirm" class="form-center" size="mini" label-width="120px">
      <el-form-item label="问题一">
        <span>{{questionText1}}</span>
      </el-form-item>
      <el-form-item label="答案一">
        <span>{{form.answer1}}</span>
      </el-form-item>
      <el-form-item label="问题二">
        <span>{{questionText2}}</span>
      </el-form-item>
      <el-form-item label="答案二">
        <span>{{form.answer2}}</span>
      </el-form-item>
      <el-form-item label="问题三">
        <span>{{questionText3}}</span>
      </el-form-item>
      <el-form-item label="答案三">
        <span>{{form.answer3}}</span>
      </el-form-item>
      <el-form-item>
        <el-button @click="closeConfirm">上一步</el-button>
        <el-button type="primary" @click="setSecurityAnswerServer">确认</el-button>
      </el-form-item>
    </el-form>
    <p class="color-red text-center"  v-show="showConfirm">
      以上是您刚刚设置的安全口令问题，请确认问题答案。
      安全口令设置后不可更改，请谨慎确认
    </p>
  </section>
</template>

<script>
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'security-question',
    components: {
    },
    data() {
      return {
        form: {
          question1: '',
          question2: '',
          question3: '',
          answer1: '',
          answer2: '',
          answer3: '',
          questionText1: '',
          questionText2: '',
          questionText3: '',
        },
        showConfirm: false,
        allQuestions: [],
        questionsObj: {},
        rules: {
          question1: [
            { required: true, message: '请选择问题'},
          ],
          question2: [
            { required: true, message: '请选择问题'},
          ],
          question3: [
            { required: true, message: '请选择问题'},
          ],
          answer1: [
            { required: true, message: '请填写答案'},
          ],
          answer2: [
            { required: true, message: '请填写答案'},
          ],
          answer3: [
            { required: true, message: '请填写答案'},
          ]
        }
      };
    },
    computed:{
      ...mapGetters('common',['fundsPwdSetted']),
      leftQuestions: function(){
        return this.allQuestions.filter((item)=>{
          if(item.id+'' == this.form.question1 || item.id+'' == this.form.question2 || item.id+'' == this.form.question3){
            return false
          }else {
            return true
          }
        })
      },
      questionText1: function(){
        if(Object.keys(this.questionsObj).length>0 && this.form.question1 != ''){
          return this.questionsObj[this.form.question1].content
        }else{
          return ''
        }
      },
      questionText2: function(){
        if(Object.keys(this.questionsObj).length>0 && this.form.question2 != ''){
          return this.questionsObj[this.form.question2].content
        }else{
          return ''
        }
      },
      questionText3: function(){
        if(Object.keys(this.questionsObj).length>0 && this.form.question3 != ''){
          return this.questionsObj[this.form.question3].content
        }else{
          return ''
        }
      },
    },
    methods: {
      ...mapActions('common',['getUserInfo']),
      handleClick(tab, event) {
      },
      closeConfirm(){
        this.showConfirm = false
      },
      //获取问题列表
      getSecurityQuestions(){
        this.axios.get('/service',{
          params:{
            action:'getSecurityQuestions'
          }
        }).then((data)=>{
          if(data.errno == 0){
            let result = data.data;
            Object.keys(result).map((key,value,arr)=>{
              this.allQuestions.push({id:key+'',content:result[key]['content']})
            })
            this.questionsObj = {...result}
          }else{
            this.$message({
              message: data.error,
              type: 'error'
            });
          }
        })
      },
      confirmQuestions(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.showConfirm = true
          } else {
            return false;
          }
        });
      },
      setSecurityAnswerServer() {
        let data = {}
        data[this.form.question1] = this.form.answer1
        data[this.form.question2] = this.form.answer2
        data[this.form.question3] = this.form.answer3
        this.axios.post("/service?action=setSecurityAnswer", {
            answers: JSON.stringify(data)
          }).then((data)=>{
          if(data.errno == 0){
            this.$message({
              message: '恭喜您，密保问题设置成功，请牢记！',
              type: 'success'
            });
            this.getUserInfo()
            this.resetForm('form')
            this.closeConfirm()
          }else{
            this.$message({
              message: data.error,
              type: 'error'
            });
          }
        })
      },
      resetForm() {
        this.$refs['form'].resetFields();
      }
    },
    created() {
      this.getSecurityQuestions()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .page-security-question {
    background: #fff;
  }
</style>
<style lang="scss">
  .page-security-question {
    .el-tabs__content {
      padding: 10px 28px;
    }
  }
</style>
