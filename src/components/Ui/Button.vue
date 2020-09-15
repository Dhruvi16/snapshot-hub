<template>
  <button
    :type="type || 'button'"
    @click="$emit('click')"
    class="button"
    :disabled="loading"
  >
    <UiLoading v-if="loading" />
    <slot v-else />
  </button>
</template>

<script>
export default {
  props: {
    loading: Boolean,
    type: String
  }
};
</script>

<style scoped lang="scss">
@import '../../vars';

.button {
  border: 1px solid $border-color;
  background-color: transparent;
  color: rgba(42, 47, 53, 0.8);
  border-radius: 23px;
  padding: 0 24px;
  outline: none;
  line-height: 46px;
  height: 46px;
  font-size: 18px;

  &.button--submit {
    background-color: $white;
    border: 1px solid $white;

    &:hover {
      color: rgba(42, 47, 53, 0.8);
      background-color: $white;
      border: 1px solid $white;
    }

    &:disabled {
      color: $white !important;
      border: 1px solid $text-gray;
      background-color: $text-gray;
    }
  }

  &:hover {
    color: $white;
    border-color: $white;
  }

  &:disabled {
    color: $text-gray !important;
    cursor: not-allowed;
  }
}
</style>
