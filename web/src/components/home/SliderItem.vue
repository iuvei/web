<template>
    <div class="item"
         v-show="ready"
         :class="{
            'is-active': active,
            'is-in-stage': inStage,
            'is-animating': animating
          }"
          :style="{
          msTransform: `translateX(${ translate }px)`,
          webkitTransform: `translateX(${ translate }px)`,
          transform: `translateX(${ translate }px)`
          }">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'SliderItem',
    components: {
    },
    data() {
      return {
        hover: false,
        translate: 0,
        active: false,
        ready: false,
        inStage: false,
        animating: false
      }
    },
    methods: {
      processIndex(index, activeIndex, length) {
        if (activeIndex === 0 && index === length - 1) {
          return -1;
        } else if (activeIndex === length - 1 && index === 0) {
          return length;
        } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
          return length + 1;
        } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
          return -2;
        }
        return index;
      },
      calculateTranslate(index, activeIndex, parentWidth) {
        if (this.inStage) {
          return parentWidth * (index - activeIndex);
        } else if (index < activeIndex) {
          return - parentWidth * 2;
        } else {
          return  parentWidth * 2;
        }
      },
      translateItem(index, activeIndex, oldIndex) {
        const parentWidth = this.$parent.$el.getElementsByClassName('inner')[0].offsetWidth;
        const length = this.$parent.items.length;
        if (oldIndex !== undefined) {
          this.animating = Math.round(Math.abs(index - activeIndex)) <= 1;
        }

        if (index !== activeIndex && length > 2) {
          index = this.processIndex(index, activeIndex, length);
        }
        this.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        this.active = index === activeIndex;
        this.translate = this.calculateTranslate(index, activeIndex, parentWidth);
        this.ready = true;
      },

    },
    created(){
      this.$parent && this.$parent.updateItems();
    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>
    .item {
      display: inline-block;
      height: 660px;
      width: 1400px;
      top: 0;
      left: 0;
      z-index: 0;
      position: absolute;
      overflow: hidden;
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
      img{
        width: 100%;
        -webkit-transition: all 0.4s 0.1s;
        transition: all 0.4s 0.1s;
      }

      &.is-animating {
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
      }
      &.is-active{
        z-index: 2;
      }
      &.is-in-stage {
        z-index: 2;
      }
    }
</style>

