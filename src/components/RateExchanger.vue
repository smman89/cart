<template>
  <div class="exchange">
    <div>Курс: min={{ min }} р.</div>
    <div class="exchange__range">
      <span :class="'exchange__value ' + priceClass">{{ modelValue }}</span>
      <input
        class="exchange__input"
        type="range"
        :min="min"
        :max="max"
        :value="modelValue"
        @change="change"
      />
    </div>
    <div>max={{ max }} р.</div>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  setup() {
    const priceClass = inject("priceClass");

    return {
      priceClass,
    };
  },

  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  },
  methods: {
    change(e) {
      this.$emit("update:modelValue", Number(e.target.value));
    },
  },
};
</script>

<style >
.exchange {
  max-width: 450px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.exchange__range {
  display: flex;
  flex-direction: column;
  justify-self: center;
}
</style>
