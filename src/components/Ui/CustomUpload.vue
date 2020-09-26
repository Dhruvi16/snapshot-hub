<template>
  <div>
    <div v-if="!image">
      <div class="input" @click="trigger">Avatar <i class="fas fa-caret-up icon"></i></div>
      <input type="file" class="ignore" ref="fileInput" @change="onFileChange">
    </div>
    <div v-else>
    <div class="input" @click="trigger1">Remove uploaded avatar <i class="fas fa-times icon"></i></div>
    <button @click="removeImage" class="ignore" ref="removeFile">Remove image</button>
  </div>
  </div>
</template>

<script>
import { log } from 'util';
export default {
  data() {
    return {
      image: ''
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
      this.$emit("input", files[0]);
    },
    createImage(file) {
      const image = new Image();
      const reader = new FileReader();
      const vm = this;  // eslint-disable-line

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    },
    trigger() {
    	this.$refs.fileInput.click()
    },
    trigger1() {
    	this.$refs.removeFile.click()
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../vars';

.ignore {
  display: none;
}

.input {
  padding-left: 16px;
  padding-top: 12px;
  cursor: pointer;
}

.icon {
  float: right;
  padding-right: 20px;
  font-size: 28px;
}

</style>
