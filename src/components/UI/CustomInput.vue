<template>
  <input type="number" min="0" :max="max" :value="newValue" @input="input" />
</template>


<script>
export default {
  props: {
    max: {
      type: Number,
      required: true,
    },
    val: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      newValue: null,
    };
  },
  methods: {
    input(e) {
      let value = parseInt(e.target.value);
      if (value >= 0 && value <= this.max) {
        this.newValue = Number(value);
        this.$emit("input", Number(value));
      } else {
        this.newValue = 0;
      }
    },
  },
  updated() {
    this.newValue = this.val;
  },
  mounted() {
    this.newValue = this.val;
  },
};
</script>
