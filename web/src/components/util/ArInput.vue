<template>
  <div class="form-line" @click="focus()" :class="{currentInput:isFocused}">
    <dl>
      <dt>{{label}}：</dt>
      <dd>
        <input :type="type"  ref="input" @change="handleChange" @focus="handleFocus" @keyup.enter="handleKeyup" @input="handleInput" @blur="handleBlur" :value="inputValue" autocomplete="off" :placeholder="placeholder">
      </dd>
    </dl>
    <div class="line-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>

  </div>
</template>

<script>

  export default {
    name: 'ArInput',
    components: {
    },
    data () {
      return {
        isFocused: false,
        inputValue: this.value,
      }
    },
    props:{
      value: {},
      type: {
        type: String
      },
      autofocus: {
        type: Boolean,
        dafault(){
          return false
        }
      },
      placeholder: {
        type: String,
        default() {
          return ''
        }
      },
      label: {
        type: String
      },
    },
    computed: {
      province:function(){
        let data = this.areaData
        let selectArray = []
        for (var i in data) {
          selectArray.push({
            value:data[i].id,
            label:data[i].name,
          })
        }
        return selectArray
      },
    },
    watch:{
      value (val) {
        this.inputValue = val
      },
      inputValue (val, oldVal) {
        this.$emit('input', val)
      },
    },
    methods: {
      handleFocus (event) {
        this.isFocused = true
        this.$emit('focus', event)
      },
      handleBlur (event) {
        this.isFocused = false
        this.$emit('blur', event)
      },
      handleInput (val) {
        this.inputValue = val.target ? val.target.value : val
      },
      handleChange (e) {
        this.$emit('change', e, e.target.value)
      },
      handleKeyup (event) {
        this.$emit('keyup', event)
      },
      focus () {
        const { input } = this.$refs
        if (input) {
          input.focus()
        }
      }
    },
    created() {

    },
    mounted() {
      if(this.autofocus){
        setTimeout(()=>{
          this.$refs.input&&this.$refs.input.focus()
        },100)
      }

    },
    activated(){

    },
    beforeDestroy(){
    }
  }
</script>
<style lang="scss" scoped>

  .form-line{
    padding: 7px 30px;
    border: 2px solid #e9e9e9;
    border-top: none;
    display: -webkit-flex;
    display: flex;
    input {
      border: none;
      outline: none;
      font-size: 16px;
    }
    dl{
      font-size: 16px;
      line-height: 30px;
      flex: 1;
      -webkit-flex: 1;
      dt{
        color:#b7b7b7;
      }
      dd{

      }
    }
    &.currentInput{
      border-left-color:#ff0f53 !important;
    }
    &.no-border{
      border: none;
      display: block;
      padding: 16px 0;
    }

    .float-right {
      float: right;
      display: block;
    }
    .line-right {
      display: inline-block;
      vertical-align: middle;
      line-height: 72px;
      height: 72px;
      min-width: 130px;
      text-align: right;
      .password-weak {
        width: 38px;
        height: 38px;
        line-height: 38px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        display: inline-block;
        color: #fff;
        text-align: center;
        &.level1{
          background: #ffd1de;
        }
        &.level2{
          background: #d1eef2;
        }
        &.level3{
          background: #ff9000;
        }
      }
    }
  }

</style>
