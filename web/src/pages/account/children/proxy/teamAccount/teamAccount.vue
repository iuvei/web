<template>
  <section class="page-teamAccount">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="团队管理" name="team">
        <div class="main-content">
          <transition name="el-zoom-in-center">
            <div class="transition-wrap" v-if="!isShowAdjustBonus&&!isShowAdjustQuota">
              <div  v-if="!openChildren" class="table-filter">
                <el-form :inline="true" :model="form" size="mini">
                  <el-form-item label="用户类型">
                    <el-select v-model="form.type" placeholder="请选择">
                      <el-option value="">全部</el-option>
                      <el-option :value="0" label="玩家"></el-option>
                      <el-option :value="1" label="代理"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="用户名">
                    <el-input v-model="form.username" ></el-input>
                  </el-form-item>
                  <el-form-item label="用户余额">
                    <el-input v-model="form.amountStart" ></el-input>-
                    <el-input v-model="form.amountEnd" ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <a class="search-btn right" href="javascript:;" @click="getTableData">搜索</a>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="openChildren">
                <el-button type="primary" plain size="mini" @click="closeChildren">返回直接下级列表</el-button>
                当前直接下级：<span class="color-blue">{{currentUser}}</span>
              </div>
              <div class="table-content">
                <el-table
                  v-loading="loading"
                  :height="height"
                  :data="tableData"
                  class="has_button"
                  size="mini"
                  style="width: 100%">
                  <el-table-column
                    prop="username"
                    label="用户名"
                    width="80">
                    <template slot-scope="scope">
                      {{ scope.row.username }}<br><a v-if="scope.row.children_num !=0" class="color-blue" href="javascript:;" @click="setParentId(scope.row)">查看下级</a>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="用户类型"
                    width="80">
                    <template slot-scope="scope">
                      <span>{{ scope.row.is_agent==1?'代理':'玩家' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="prize_group"
                    width="80"
                    label="奖金组">
                  </el-table-column>
                  <el-table-column
                    prop="children_num"
                    label="下级人数">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="register_at"
                    label="注册时间">
                  </el-table-column>
                  <el-table-column
                    width="100"
                    prop="signin_at"
                    label="最后登录">
                  </el-table-column>
                  <el-table-column
                    prop="balance"
                    label="用户余额">
                  </el-table-column>
                  <el-table-column
                    prop="group_account_sum"
                    label="团队余额">
                  </el-table-column>
                  <el-table-column width="320" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        v-if="scope.row.set_group_enabled==1"
                        size="mini"
                        @click="showAdjustBonus(scope.row.id)"
                      >升点</el-button>
                      <el-button
                        v-if="scope.row.set_quota_enabled==1"
                        size="mini"
                        @click="showQuota(scope.row)"
                      >配额</el-button>
                      <router-link :to="'/account/shadow/reportFunds?id='+scope.row.id+'&username='+scope.row.username">
                        <el-button
                          size="mini"
                          type="danger"
                        >账变</el-button>
                      </router-link>
                      <el-button
                        v-if="scope.row.transfer_status==2"
                        size="mini"
                        @click="subTransferPower(scope.row,1)"
                      >开启转账</el-button>
                      <el-button
                        v-if="scope.row.transfer_status==1"
                        size="mini"
                        @click="subTransferPower(scope.row,0)"
                      >关闭转账</el-button>
                      <router-link
                        v-if="scope.row.transfer_status==1 || scope.row.transfer_status==3"
                        :to="'/account/shadow/transfer?username='+scope.row.username">
                        <el-button
                          size="mini"
                          type="danger"
                        >转账</el-button>
                      </router-link>
                      <router-link :to="'/account/shadow/reportGame?username='+scope.row.username">
                        <el-button
                          size="mini"
                        >投注明细</el-button>
                      </router-link>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="center">
                  <el-pagination
                    background
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="count">
                  </el-pagination>
                </div>
              </div>
            </div>
          </transition>
          <transition name="el-zoom-in-center">
            <div class="transition-wrap" v-if="isShowAdjustBonus">
              <adjust-bonus @eventCloseAdjust="closeAdjust" :userId="currentUserId"></adjust-bonus>
            </div>
          </transition>
          <transition name="el-zoom-in-center">
            <div class="transition-wrap" v-if="isShowAdjustQuota">
              <adjust-quota @eventCloseQuota="closeQuota" :userId="currentUserId" :parent="currentParent" :children="currentChildren"></adjust-quota>
            </div>
          </transition>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人工开户" name="manual">
        <keep-alive>
          <manual-account></manual-account>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="链接开户" name="link">
        <keep-alive>
          <link-account></link-account>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="链接管理" name="linklist">
        <keep-alive>
          <link-management></link-management>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>

    <a class="shadow-box-close" href="javascript:;" @click="$router.back()">关闭</a>
  </section>

</template>

<script>
  import AdjustBonus from './components/AdjustBonus'
  import ManualAccount from './components/ManualAccount'
  import LinkManagement from './components/LinkManagemant'
  import LinkAccount from './components/LinkAccount'
  import AdjustQuota from './components/AdjustQuota'
  import { mapState, mapMutations,mapActions,mapGetters} from 'vuex'
  export default {
    name: 'page-teamAccount',
    components: {
      AdjustBonus,
      ManualAccount,
      LinkManagement,
      LinkAccount,
      AdjustQuota
    },
    data() {
      return {
        form:{
          type: '',
          username: '',
          amountStart: '',
          amountEnd: '',
          parentId: ''
        },
        activeName: 'team',
        isShowAdjustBonus: false,
        isShowAdjustQuota: false,
        currentUserId: 0,
        currentUser: '',
        currentParent: '',
        currentChildren: '',
        tableData: [],
        loading: true,
        pageSize: 20,
        count: 0,
        currentPage: 1,
        openChildren: false,
      }
    },
    computed:{
      height: function(){
        if(this.openChildren){
          return 330
        }else{
          return 360
        }
      },
      ...mapState('common',['userInfo'])
    },
    methods: {
      closeAdjust(bool){
        this.isShowAdjustBonus = false
        if(bool){
          this.getTableData()
        }
      },
      closeQuota(bool){
        this.isShowAdjustQuota = false
        if(bool){
          this.getTableData()
        }
      },
      showAdjustBonus(id){
        this.currentUserId = id
        this.isShowAdjustBonus = true
      },
      showQuota(item){
        this.currentUserId = item.id
        this.currentParent =  this.userInfo.username
        this.currentChildren = item.username
        this.isShowAdjustQuota = true
      },
      setParentId(row){
        this.form.parentId = row.id
        this.currentUser = row.username
        this.openChildren = true
        this.form.username = ''
        this.handleCurrentChange(1)
      },
      closeChildren(){
        this.openChildren = false
        this.form.parentId = ""
        this.$router.go({
          path: '/account/shadow/teamAccount',
          force: true
        })
      },
      getTableData(){
        this.loading = true
        var param = {
          page: this.currentPage,
          username: this.form.username,
          account_from: this.form.amountStart,
          account_to: this.form.amountEnd,
          is_agent: this.form.type,
          parent_id: this.form.parentId
        }
        this.axios.get('/service?action=getUsers',{params:param}).then((data)=>{
          this.loading = false
          if(data.errno == 0){
            this.count = data.data.count
            this.tableData = [...data.data.list.child]
          }else{
            this.$message({
              type: 'error',
              message: data.error
            });
          }
        })
      },
      handleCurrentChange(val){
        this.currentPage = val
        this.getTableData()
      },
      handleClick(tab, event) {
        if(tab.name=='linklist'){
          this.$root.Bus.$emit('sendNewLink',true)
        }
        if(tab.name=='manual'){
          this.$root.Bus.$emit('manualAccount',true)
        }
        if(tab.name=='link'){
          this.$root.Bus.$emit('linkAccount',true)
        }

        if(tab.name=='team'){
          this.getTableData()
        }

      },
      subTransferPower(item,bool){
        let data = {
          user_id: item.id,
          is_open: bool
        }
        this.axios.post('/service?action=subTransferPower',data).then((data)=>{
          if(data.errno == 0){
            this.getTableData()
            this.$message({
              type: 'success',
              message: '设定成功!'
            });
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
      this.getTableData()
      if(this.$route.query.hasOwnProperty('type')){
        this.activeName = this.$route.query.type.toLowerCase()
      }
      this.$emit("eventSize",false)
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
.page-teamAccount {
  .main-content {
    padding: 0 10px;
    width: 1096px;
    height: 502px;
    position: relative;
    .table-filter {
      padding-left: 28px;
    }
    .transition-wrap{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 10px 0;
    }

  }

  .center {
    padding: 20px 0;
    text-align: center;
  }
  .has_button {
    .cell{
      >a{
        margin-bottom: 3px;
        display: inline-block;
      }
      >button{
        margin-bottom: 3px;
      }
    }
  }
}
</style>

