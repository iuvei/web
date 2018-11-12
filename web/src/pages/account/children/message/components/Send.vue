<template>
  <section class="components-send">
    <el-form ref="form" :model="form" :rules="rules" label-width="110px" class="form-center">
      <el-form-item label="收件人类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option v-for="item,key in sendType" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收件人">
        <el-input v-model="form.user" :disabled="userDisable" @focus="showSelect" placeholder="请输入收件人" suffix-icon="el-icon-search"></el-input>
      </el-form-item>
      <el-form-item label="信件标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="信件内容" prop="content">
        <el-input type="textarea"
                  v-model="form.content"
                  :autosize="{ minRows: 4, maxRows: 8}"
                  placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendLetter">发送</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
    <transition name="el-zoom-in-center">
      <div class="select-box" v-if="selectShow">
        <team-list @eventNameSelected="selectedTeamUser" @eventClose="closeSelect"></team-list>
      </div>
    </transition>
  </section>
</template>

<script>
  import TeamList from '../../../../../components/util/TeamList'
  export default {
    name: 'components-send',
    components: {
      TeamList
    },
    data() {
      var validateTitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入标题'));
        } else if(value.length>30){
          callback(new Error('标题长度不能超过30个字符'));
        } else {
          callback();
        }
      };
      var validateContent = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入内容'));
        } else if(value.length<20){
          callback(new Error('内容长度不能小于20个字符'));
        } else {
          callback();
        }
      };
      return {
        form:{
          type: '',
          user: '',
          userId: '',
          title: '',
          content: '',
          reciver: null,
        },
        rules: {
          type: [
            { required: true, message: '请选择发送类型'},
          ],
          title: [
            { validator: validateTitle, trigger: 'blur' }
          ],
          content: [
            { validator: validateContent, trigger: 'blur'}
          ]
        },
        selectShow: false,
        userDisable: false,
        sendType: {},
        parent: '',
        options: [],
      };
    },
    watch:{
      'form.type': function(val){
        //上级
        if(val == '1'){
          this.userDisable = true
          this.form.user = '上级'
        }
        //所有下级
        if(val == '2'){
          this.userDisable = true
          this.form.user = '所有下级'
        }
        //单一用户
        if(val == '3'){
          this.userDisable = false
          this.form.user = this.form.userId
        }
      }
    },
    methods: {
      closeSelect(){
        this.selectShow = false
      },
      showSelect(){
        this.selectShow = true
      },
      selectedTeamUser(data){
        this.form.user = data.name
        this.form.userId = data.id
      },
      getSendInfo(){

        var param = {
              action:'getSendInfo',
            }
            this.axios.get('/service',{params:param}).then((data)=>{
              if(data.errno == 0){
                this.sendType = {...data.data.send_type}
                if(data.data.parent.length>0){

                  this.parent = data.data.parent[0]['id']
                }
              }else{
                this.$message({
                  type: 'error',
                  message: data.error
                });
              }
            })


      },
      sendLetter(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            var data = {
              "send_type": this.form.type,
              "receiver" : this.form.user,
              "title": this.form.title,
              "content": this.form.content
            }
            if(this.form.type== 3){
              data.receiver = this.form.userId
            }
            this.axios.post('/service?action=sendLetter',data).then((data)=>{
              if(data.errno == 0){
                this.$message({
                  type: 'success',
                  message: '发送成功！'
                });
                this.resetForm('form')
              }else{
                this.$message({
                  type: 'error',
                  message: data.error
                });
              }
            })
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      this.getSendInfo()
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-send {
    position: relative;
    .readed {
      color: #0a94e3;
    }
    .select-box {
      position: absolute;
      left: 660px;
      top: 20px;
      z-index: 2;
    }
  }
</style>

