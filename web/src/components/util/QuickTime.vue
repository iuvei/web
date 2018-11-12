<template>
  <el-radio-group v-model="quickTime" @change="setQuickTime" >
    <el-radio-button label="1">今日</el-radio-button>
    <el-radio-button label="2">上周</el-radio-button>
    <el-radio-button label="3">本周</el-radio-button>
    <el-radio-button label="4">本月</el-radio-button>
    <el-radio-button label="5">上半月</el-radio-button>
    <el-radio-button label="6">下半月</el-radio-button>
  </el-radio-group>
</template>
<script>
  export default {
    name: 'QuickTime',
    components: {
    },
    data () {
      return {
        quickTime: null,
      }
    },
    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      isDefault: {
        type: Boolean,
        default(){
          return true
        }
      }
    },
    computed: {
      timeArray:function(){
        var now = new Date(),
            nowDayOfWeek = now.getDay(),
            nowDay = now.getDate(),
            nowMonth = now.getMonth(),
            oneDayTime = 24*60*60*1000;
        if(nowDayOfWeek == 0){
          nowDayOfWeek = 7
        }
        switch(this.quickTime){
          //今日
          case '1':
            var now = new Date()
            return [this.formateStart(now),this.formateEnd(now)]
            break;
          //上周
          case '2':
            var startDay = new Date();
                startDay = startDay.setTime(startDay.getTime() - oneDayTime*(nowDayOfWeek + 7));
            var endDay = new Date();
                endDay = endDay.setTime(endDay.getTime() - oneDayTime*nowDayOfWeek)
            return [this.formateStart(startDay),this.formateEnd(endDay)]
            break;
          //本周
          case '3':
            var startDay = new Date();
                startDay.setTime(startDay.getTime() - oneDayTime*(nowDayOfWeek))
            return [this.formateStart(startDay),this.formateEnd(now)]
            break;
          //本月
          case '4':
            var now = new Date(),
                startDay = this.getCurrentMonthFirst()
            return [this.formateStart(startDay),this.formateEnd(now)]
            break;
          //上半月
          case '5':
            var endDay = new Date(),
              startDay = this.getCurrentMonthFirst();
            endDay.setTime(startDay.getTime() + 14*oneDayTime)
            return [this.formateStart(startDay),this.formateEnd(endDay)]
            break;
          //下半月
          case '6':
            var now = new Date(),
              endDay = this.getCurrentMonthLast();
              now.setTime(endDay.getTime() - 15*oneDayTime)
            return [this.formateStart(now),this.formateEnd(endDay)]
            break;
        }
      }
    },
    methods: {
      setQuickTime(){
        this.$emit("eventChangTime",this.timeArray)
      },
      formateStart(date){
        let result = new Date(date)
        result.setHours(0,0,0)
        return result.Format()
      },
      formateEnd(date){
        let result = new Date(date)
        result.setHours(23,59,59)
        return result.Format()
      },
      getCurrentMonthFirst(){
        var date=new Date();
        date.setDate(1);
        return date;
      },
      getCurrentMonthLast(){
        var date=new Date();
        var currentMonth=date.getMonth();
        var nextMonth=++currentMonth;
        var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
        var oneDay=1000*60*60*24;
        return new Date(nextMonthFirstDay-oneDay);
      }

    },
    created() {

    },
    mounted() {
      if(this.isDefault){
        this.quickTime = 1
        var now = new Date()
        var arr = [this.formateStart(now),this.formateEnd(now)]
        this.$emit("eventChangTime",arr)
      }

    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>


</style>
