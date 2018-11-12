<template>
  <section class="components-adjust-quota">
    <el-button icon="el-icon-arrow-left" size="small" @click="closeAdjustQuota">返回列表</el-button>
    <div class="quota-center">
      <p class="p-center">上级{{parent}}为下级{{children}}设置配额</p>
      <el-form  size="small" >
        <el-table
          size="small"
          border
          :height="height"
          :data="tableData"
          header-row-class-name="header-style"
          style="width: 100%;margin-bottom: 10px;">
          <el-table-column
            align="center"
            prop="groups"
            label="奖金组"
            width="120">
            <template slot-scope="scope">
              {{ scope.row.groups }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="下级配额">
            <template slot-scope="scope">
              <span>{{ scope.row.set }}</span> + <el-input type="number" size="small" v-model="scope.row.setting"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="剩余配额">
            <template slot-scope="scope">
              <span>{{ scope.row.value }}</span>
            </template>
          </el-table-column>
        </el-table>



        <el-form-item style="text-align: center">
          <el-button type="primary" @click="setUserQuotas">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>

  </section>
</template>

<script>

  export default {
    name: 'AdjustQuota',
    components: {
    },
    data() {
      return {
        form:{
          username: '',
          prizeGroup: 0,
        },
        list:[{active_user_turnover: 3},{active_user_turnover: 4}],
        parentUserQuota: [],
        subUserQuota: [],
        tableData: []
      }
    },
    props: {
      userId: {
        type: Number,
        default() {
          return 0;
        }
      },
      parent:{
        type: String,
        default() {
          return '';
        }
      },
      children:{
        type: String,
        default() {
          return '';
        }
      },
    },
    computed: {
      height: function(){
        if(this.tableData.length>0){
          var height = this.tableData.length*50+40
          height = height> 360? 360: height
          return height
        }else{
          return 49+40
        }
      }
    },

    methods: {
      closeAdjustQuota(){
        this.$emit('eventCloseQuota')
      },
      getUserQuotas(id){
        var param = {
          action:'getUserQuotas',
          user_id: id
        }
        this.axios.get('/service',{params:param}).then((data)=>{
          if(data.errno == 0){
            this.tableData = []
            var parent = data.data.parentUserQuota
            var children = data.data.subUserQuota
            Object.keys(parent).map((value,key,arr)=>{
              var obj = {}
              obj.groups = value
              obj.value = parent[value]
              obj.setting = ''
              obj.set = 0
              Object.keys(children).map((value2,key2,arr2)=>{
                if(value == value2){
                  obj.set = children[value2]
                }
              })

              this.tableData.push(obj)
            })
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      getResult(){
        var arr = this.tableData
        var result = {}
        for(var i = 0; i< arr.length; i++){
          var item = arr[i]
          result[item.groups] = item.setting
        }
        return result
      },
      setUserQuotas(){
        var seriesQuota = {};
        seriesQuota = this.getResult()
        let data = {
          action: 'setUserQuotas',
          user_id: this.userId,
          agent_prize_set_quota: JSON.stringify(seriesQuota)
        }
        this.axios.post('/service',data).then((data)=>{
          if(data.errno == 0){
            this.$message({
              type: 'success',
              message: '恭喜您，修改成功！'
            });
            this.$emit('eventCloseQuota',true)
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      }
    },
    created() {
      this.getUserQuotas(this.userId)
    },
    mounted(){
    },
    beforeDestroy(){
    }

  }
</script>
<style lang="scss" scoped>
  .components-adjust-quota {

    .quota-center {
      padding-top: 10px;
      width: 840px;
      margin: 0 auto;
      .el-input {
        width: 80px;
        margin: 0 5px;
      }
      .item-td {
        border-right: 1px solid #bbb;
        display: inline-block;
        padding-right: 10px;
        margin-right: 10px;
      }
    }
    .p-center{
      text-align: center;
      font-size:18px;
      padding-bottom: 10px;
      margin-top: -20px;
    }
    .dynamic-height {
      max-height: 272px;
      overflow: auto;
      border: 1px solid #bbb;
      padding: 10px 10px;
      margin-bottom: 10px;
    }
    .span-wrapper {
      display: flex;
      span {
        flex: 1;
        text-align: center;
        margin: 0;
        border-right: 1px solid #ccc;
        &:nth-child(3){
          border: none;
        }
      }
    }
  }
</style>
<style lang="scss">
  .components-adjust-quota {
    .el-table .header-style th{
      background: #fcf1cd;
      color: #000
    }
  }
</style>
