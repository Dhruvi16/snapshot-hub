<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div :class="[open? 'selected-not-open': 'selected']" @click="open = !open" >
      <div v-if="selected">
        {{ selected }}
      </div>
      <div v-else>
        {{ placeholder }}
      </div>
    </div>
    <div class="items" :class="{selectHide: !open}">
      <div
        class="item"
        v-for="(option, i) of options"
        :key="i"
        @click="selected=option; open=false; $emit('input', option)"
      >{{ option }}</div>
    </div>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    placeholder: {
      type: String,
      required: true,
      default: 'Placeholder'
    }
  },
  data() {
    return {
      selected: null,
      open: false
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  }
};
</script>

<style scoped lang="scss">
@import '../../vars';

.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 51px;
  line-height: 51px;
}

.selected {
  padding-left: 16px;
  padding-top: 12px;
  cursor: pointer;
  user-select: none;
  background: $bg-gray-light;
  border: none;
  box-shadow: inset 5px 0px 25px rgba(0, 0, 0, 0.25);
  border-radius: 25.5px;
  line-height: 28px;
  color: $gray;
  font-size: 24px;
  height: 51px;
}

.selected-not-open {
  padding-left: 16px;
  padding-top: 12px;
  cursor: pointer;
  user-select: none;
  background: $bg-gray-light;
  border: none;
  line-height: 28px;
  color: $gray;
  font-size: 24px;
  height: 51px;
  border-top-left-radius: 25.5px;
  border-top-right-radius: 25.5px;
}

.selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 16px;
  width: 0;
  height: 0;
  border: 9px solid transparent;
  border-color: $gray transparent transparent transparent;
}

.items {
  background: $bg-gray-light;
  border: none;
  color: $gray;
  overflow: auto;
  position: absolute;
  box-shadow: inset 5px 0px 25px rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 25.5px;
  border-bottom-right-radius: 25.5px;
  left: 0;
  right: 0;
  z-index: 2;
}

.item {
  color: $gray;
  background: $bg-gray-light;
  padding-left: 16px;
  cursor: pointer;
  user-select: none;
  font-size: 24px;
}

.item:hover {
  background-color: #616669;
  border: 1px solid #616669;
  color: $black;
}

.selectHide {
  display: none;
}
</style>
