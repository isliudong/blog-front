<template>
  <div class="VueStar">
    <div class="VueStar__ground">
      <div class="VueStar__icon" @click="toggle" :class="AnimateClass" :style='{color:ColorValue}'>
        <slot name="icon"></slot>
      </div>
      <div class="VueStar__decoration" :class="{ 'VueStar__decoration--active':active}"></div>
    </div>
  </div>
</template>

<script>
import {isColors} from '../../../utils/colorRE'

export default {
  name: 'VueStar',
  props: {
    animate: String,
    color: String,
    isClick: Boolean
  },
  methods: {
    toggle() {
      this.active = !this.active
      this.toggleAnimate = !this.toggleAnimate
      this.toggleColor = !this.toggleColor
    }
  },
  data() {
    return {
      active: false,
      toggleAnimate: false,
      toggleColor: false
    }
  },
  computed: {
    AnimateClass() {
      return this.toggleAnimate ? this.animate : ''
    },
    ColorValue() {
      return this.toggleColor ? this.color : ''
    }
  },
  mounted() {
    this.active = this.isClick
    this.toggleAnimate = this.isClick
    this.toggleColor = this.isClick
    if (this.color) {
      if (isColors(this.color)) {
        return
      } else {
        console.info('this color must be hexcolor or rgbcolor  ---VueStar')
      }
    } else {
      return
    }
  }
}
</script>

<style lang="less">
@import 'src/less/star.less';
</style>
