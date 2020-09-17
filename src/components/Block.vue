<template>
  <div
    class="border-top border-bottom border-md rounded-0 rounded-md-2 mb-4 overflow-hidden"
  >
    <div class="title">
      <span v-if="title" class="px-4 py-3 border-bottom d-block">
      {{ title }}
      <UiCounter v-if="counter" :counter="counter" class="ml-1" />
    </span>
    </div>
    <div :class="!slim && 'p-4'">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'counter', 'slim'],
};
</script>

<style scoped lang="scss">
  @import "./../vars";

  .title {
    background-color: #616669;
    color: $white;
    font-size: $h2-size;
  }
</style>
