<template>
  <section class="components-bind-name">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px" class="form-center"  @submit.native.prevent>
      <el-form-item label="取款人" prop="name">
        <el-input v-model="form.name" @keyup.enter="setRealname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setRealname">确认</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
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
          name: ''
        },
        rules:{
          name: [
            { required: true, message: '请输入取款人'},
          ],
        }
      };
    },
    computed:{

    },
    methods: {
      ...mapActions('common',['getUserInfo']),
      setRealname() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.axios.post("/service?action=setRealname", {
              name: this.form.name
            }).then((data)=>{
              if(data.errno == 0){
                this.$message({
                  message: '恭喜您，取款人绑定成功！',
                  type: 'success'
                });
                this.resetForm()
                this.getUserInfo()
                if(this.$route.query.hasOwnProperty('origin')){
                  this.$router.replace('/account/shadow/'+this.$route.query.origin.toLowerCase())
                }
              }else{
                this.$message({
                  message: data.error,
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['form'].resetFields();
      }
    },
    created() {
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .components-bind-name {
    background: #fff;
  }
</style>
<style lang="scss">
  .components-bind-name {
  }
</style>
