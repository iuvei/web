<template>
  <div class="banner" @mouseenter.stop="handleMouseEnter"
       @mouseleave.stop="handleMouseLeave">
    <div class="inner clear">
      <div class="item-box clear">
        <slot></slot>
      </div>
      <ul class="slider-nav">
        <li v-for="item,key in items" :key="key" @click="handleNav(key)" :class="{active:key==activeIndex}"></li>
      </ul>
    </div>
    <div class="mask mask-a">
      <transition name="carousel-arrow-left">
      <a v-show="hover" @click="throttledArrowClick(activeIndex - 1)" class="ct"><i class="el-icon-arrow-left"></i></a>
      </transition>
    </div>
    <div class="mask mask-b">
      <transition name="carousel-arrow-right">
        <a v-show="hover" @click="throttledArrowClick(activeIndex + 1)" class="ct"><i class="el-icon-arrow-right"></i></a>
      </transition>
    </div>
  </div>
</template>

<script>
  //函数节流
  import throttle from 'throttle-debounce/throttle';

  export default {
    name: 'Slider',
    components: {
    },
    data() {
      return {
        items: [],
        activeIndex: 0,
        marginLeft: -1400,
        widths: 1400,
        interval: 4000,
        timer: null,
        hover: false,

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
      handleNav(index){
        this.setActiveItem(index)
      }
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
    width: 100%;
    height: 660px;
    position: relative;
    background: #000;
    overflow: hidden;
    .animation {
      -webkit-transition: all .4s;
      transition: all  .4s;
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
    .mask-a {
      left: 0;
      margin-left: -700px;
      .ct {
        right: 10px;
      }
    }
    .mask-b {
      right: 0;
      margin-right: -700px;
      .ct {
        left: 10px;
      }
    }
    .inner {
      width: 1400px;
      margin: 0 auto;
      position: relative;
    }
    .item-box {
      position: relative;
      width: 100%;
      height: 660px;

    }

    .triggers {
      text-align: center;
      position: absolute;
      top: 475px;
      z-index: 1;
      width: 100%;
      a {
        display: inline-block;
        width: 15px;
        height: 15px;
        background: rgba(40,38,38,0.80);
        overflow: hidden;
        font-size: 0;
        margin: 0 2px;
        text-indent: -9999px;
        cursor: pointer;
        _display: inline;
        border-radius: 50%;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        background-color: #7D7D7D\9;
        box-shadow: 1px 1px 1px rgb(72, 72, 72) inset;
      }
    }
  }

  .el-carousel__button{
    display:block;
    opacity:.48;
    width:30px;
    height:2px;
    background-color:#fff;
    border:none;
    outline:0;
    padding:0;
    margin:0;
    cursor:pointer;
    -webkit-transition:.3s;
    transition:.3s
  }
  .carousel-arrow-left-enter,
  .carousel-arrow-left-leave-active{
    -webkit-transform:translateX(-10px);
    transform:translateX(-10px);
    opacity:0
  }
  .carousel-arrow-right-enter,
  .carousel-arrow-right-leave-active{
    -webkit-transform:translateX(10px);
    transform:translateX(10px);
    opacity:0
  }
  .slider-nav {
    width: 100%;
    position: absolute;
    bottom: 5px;
    height: 30px;
    line-height: 30px;
    z-index: 2;

    text-align: center;
    li {
      display: inline-block;
      border: 1px solid #dcd9de;
      width: 12px;
      height: 12px;
      margin: 0 6px;
      border-radius: 6px;
      &.active{
        background: #ffffff;
        transform: scale(1.4);
      }
    }
  }
</style>

