<template>
  <div class="team-list-all">
    <p >选择下级用户</p>
    <div class="list-all-body">
      <el-tree node-key="id" ref="tree" :props="defaultProps" :load="loadNode1" lazy  @node-click="handleNodeClick"></el-tree>
    </div>
    <p>
      <el-button type="primary" size="mini" @click="confirm">确定</el-button>
      <el-button size="mini" @click="close">取消</el-button>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'TeamListAll',
    components: {
    },
    data () {
      return {
        username: '',
        nodePath: [],
        data: [],
        defaultProps: {
          children: 'child',
          label: 'username'
        }
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
    watch:{
      username: function(val){
        this.$emit("eventNameSelected",val)
        this.$emit("eventNodePath",this.nodePath)
      }
    },
    methods: {
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
      loadNode1(node, resolve) {
        // 如果是顶级的父节点
        if (node.level === 0) {
          this.axios.get('/service?action=getChildren').then((data)=>{
            if(data.errno == 0){
              resolve(data.data)
            }else{
              this.$message({
                type: 'error',
                message: data.error
              });
            }
          })
        } else {
          var params = {
            user_id: node.data.id,
            action: "getChildren"
          }
          this.axios.get('/service',{params:params}).then((data)=>{
            if(data.errno == 0){
              resolve(data.data)
            }else{
              this.$message({
                type: 'error',
                message: data.error
              });
            }
          })
        }
      },
      getChildren(id){
        var params = {
          user_id: id?id:''
        }
        this.axios.get('/service?action=getChildren',{params:params}).then((data)=>{
          if(data.errno == 0){
            return data.data
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      getAllData(data){
        var array = []
        function getArray(data,pId){
          for (let item in data) {
            let obj = {id:data[item]['id'],username:data[item]['username']}
            if(pId){
              obj.pId = pId
            }
            if(data[item].hasOwnProperty("child")) {
              getArray(data[item].child[0],item)
            }
            array.push(obj)
          }
        }
        getArray(data)
        this.data = this.arrayToJson(array)
      },

      arrayToJson(treeArray){
        var r = [];
        var tmpMap ={};
        for (var i=0, l=treeArray.length; i<l; i++) {
          // 以每条数据的id作为obj的key值，数据作为value值存入到一个临时对象里面
          tmpMap[treeArray[i]["id"]]= treeArray[i];
        }
        for (i=0, l=treeArray.length; i<l; i++) {
          var key=tmpMap[treeArray[i]["pId"]];
          //循环每一条数据的pid，假如这个临时对象有这个key值，就代表这个key对应的数据有children，需要Push进去
          if (key) {
            if (!key["child"]){
              key["child"] = [];
              key["child"].push(treeArray[i]);
            }else{
              key["child"].push(treeArray[i]);
            }
          } else {
            //如果没有这个Key值，那就代表没有父级,直接放在最外层
            r.push(treeArray[i]);
          }
        }
        return r
      },

      close(){
        this.$emit("eventClose",true)
      },

      handleNodeClick(data) {
        this.username = data.username
        this.nodePath = {...this.$refs.tree.getNodePath(data.id)}
      }
    },
    created() {

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
  .team-list-all {
    height: 400px;
    width: 300px;
    background: #fff;
    border: 1px solid #555;
    border-radius: 5px;
    padding: 10px;
    .list-all-body {
      height: 330px;
      overflow: auto;
    }
  }



</style>
