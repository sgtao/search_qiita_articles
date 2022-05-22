<template>
  <button type="button">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "sample-button",

  props: {
    label: {
      type: String,
      required: true,
    },
  },

  setup() {},
};
</script>