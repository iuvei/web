<template>
  <div class="components-select-menu">
    <div class="checkbox-box">
      <el-checkbox-group
        v-model="checkedCities1"
        :min="1"
        :max="2">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
  //函数节流
  import throttle from 'throttle-debounce/throttle';

  export default {
    name: 'SelectMenu',
    components: {

    },
    data() {
      const cityOptions = ['上海', '北京', '广州', '深圳'];
      return {
        checkedCities1: ['上海', '北京'],
        cities: cityOptions
      }
    },
    watch: {
      items(val) {
      },
      activeIndex(val, oldVal) {
        this.resetItemPosition(oldVal);
      }
    },
    methods: {
      handleMouseEnter() {
        this.hover = true;
        this.pauseTimer();
      },

      handleMouseLeave() {
        this.hover = false;
        this.startTimer();
      },
      pauseTimer() {
        clearInterval(this.timer);
      },

      startTimer() {
        this.timer = setInterval(this.playSlides, this.interval);
      },
      setActiveItem(index){

        let length = this.items.length;
        const oldIndex = this.activeIndex;
        if (index < 0) {
          this.activeIndex = length - 1;
        } else if (index >= length) {
          this.activeIndex = 0;
        } else {
          this.activeIndex = index;
        }
        if (oldIndex === this.activeIndex) {
          this.resetItemPosition(oldIndex);
        }
      },

      playSlides() {
        if (this.activeIndex < this.items.length - 1) {
          this.activeIndex++;
        } else {
          this.activeIndex = 0;
        }
      },
      updateItems() {
        this.items = this.$children.filter(child => child.$options.name === 'SliderItem');
      },
      resetItemPosition(oldIndex) {
        this.items.forEach((item, index) => {
          item.translateItem(index, this.activeIndex, oldIndex);
        });
      },
    },
    created() {
      this.throttledArrowClick = throttle(300, true, index => {
        this.setActiveItem(index)
      })
    },
    mounted(){
      this.updateItems();
      this.$nextTick(() => {
        this.playSlides()
        this.startTimer();
      });
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
  .banner {
    .checkbox-box {

    }
    .mask {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      background: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      z-index: 4;
      .ct {
        position: absolute;
        width: 36px;
        height: 36px;
        -webkit-border-radius: 18px;
        -moz-border-radius: 18px;
        border-radius: 18px;
        background: rgba(0,0,0,.2);
        background-repeat: no-repeat;
        top: 50%;
        text-align: center;
        line-height: 36px;
        margin-top: -18px;
        -webkit-transition: all .4s;
        transition: all  .4s;
        i {
          color: #fff;
          font-size: 20px;
        }
      }

    }
  }
</style>

