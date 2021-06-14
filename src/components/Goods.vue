<template >
  <div class="goods">
    <div class="goods__group" v-for="(group, key) in goods" :key="key">
      <h3 class="goods__header">{{ group.title }}</h3>
      <ul class="goods__list">
        <li
          class="goods__item"
          v-for="(item, itemKey) in group.goods"
          :key="itemKey"
        >
          <p class="goods__title">{{ item.title }} ({{ item.balance }})</p>
          <span :class="priceClass + ' goods__price'">{{
            getPrice(item.price)
          }}</span>
          <button class="button" type="button" @click="addToCart(item)">
            +
          </button>
        </li>
      </ul>
    </div>
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
  computed: {
    goods() {
      return this.$store.state.Goods.list;
    },
  },
  methods: {
    getPrice(price) {
      return this.$store.getters["Rate/getRublePrice"](price);
    },
    addToCart(item) {
      this.$store.dispatch("Cart/add", { ...item, quantity: 1 });
    },
  },
};
</script>


<style scoped>
.goods {
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.goods__list {
  max-width: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.goods__item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid black;
}

.goods__price {
  min-width: 50px;
  display: flex;
  justify-content: center;
}

.goods__title {
  font-size: 14px;
  margin-left: 10px;
}
</style>
