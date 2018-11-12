<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">选择直属下级用户</p>
    <div :class="['el-transfer-panel__body','is-with-footer']">
      <el-input
        class="el-transfer-panel__filter"
        v-model="query"
        size="mini"
        placeholder="请输入搜索内容"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false">
        <i slot="prefix"
           :class="['el-input__icon', 'el-icon-' + inputIcon]"
           @click="clearQuery"
        ></i>
      </el-input>
      <el-radio-group
        v-model="username"
        v-show="!hasNoMatch && data.length > 0"
        class="el-transfer-panel__list">
        <el-radio
          class="el-transfer-panel__item"
          :label="item"
          :key="key"
          v-for="item,key in filteredData">{{item.name}}
        </el-radio>
      </el-radio-group>
      <p
        class="el-transfer-panel__empty"
        v-show="hasNoMatch">没有查找到用户</p>
      <p
        class="el-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch">没有用户数据</p>
    </div>
    <p class="el-transfer-panel__footer">
      <el-button type="primary" size="mini" @click="confirm">确定</el-button>
      <el-button size="mini" @click="close">取消</el-button>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'TeamList',
    components: {
    },
    data () {
      return {
        inputHover: false,
        query: '',
        username: {},
        data: []
      }
    },
    props: {
      value: {
        type: Array,
        default() {
          return [];
        }
      },
      all: {
        type: Number,
        default(){
          return 0
        }
      }
    },
    computed: {
      inputIcon() {
        return this.query.length > 0 && this.inputHover
          ? 'circle-close'
          : 'search';
      },
      filteredData() {
        return this.data.filter(item => {
          const label = item.name
          return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1
        });
      },
      hasNoMatch() {
        return this.query.length > 0 && this.filteredData.length === 0;
      },

    },
    watch:{
      username: function(val){

        this.$emit("eventNameSelected",val)
      }
    },
    methods: {
      clearQuery() {
        if (this.inputIcon === 'circle-close') {
          this.query = '';
        }
      },
      confirm(){
        if(this.username != ''){
          this.$emit("eventClose",true)
        }else{
          this.$message({
            type: 'error',
            message: '请选择用户'
          });
        }
      },
      getChildren(){
        this.axios.get('/service?action=getChildren').then((data)=>{
          if(data.errno == 0){
            this.data = []
            for(let item in data.data){
              let obj = {id:data.data[item].id,name:data.data[item].username}
              this.data.push(obj)
            }

          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      getAllData(data){
        var _this = this
        function getArray(data){
          for (let item in data) {
            let obj = {id:item,name:data[item]['username']}
            _this.data.push(obj)
            if (data[item].hasOwnProperty("child")) {
              getArray(data[item].child[0]);
            }
          }
        }
        getArray(data)
      },
      close(){
        this.$emit("eventClose",true)
      },
    },
    created() {
      this.getChildren()
    },
    activated(){
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .el-input{
    width: auto;
  }
  .el-transfer-panel__body {
    height: 296px;
  }
  .el-transfer-panel__list {
    height: 200px;
    width: 100%;

  }
  .el-transfer-panel__footer {
    text-align: center;
  }

</style>
