<template>
  <div class="page">
    <RateExchanger
      :min="MIN_EXCHANGE_RATE"
      :max="MAX_EXCHANGE_RATE"
      v-model="exchangeRate"
    />
    <Goods />
    <Cart />
  </div>
</template>


<script>
import { provide, ref } from "vue";

import Cart from "./components/Cart.vue";
import Goods from "./components/Goods.vue";
import RateExchanger from "./components/RateExchanger.vue";

export default {
  name: "App",

  components: {
    Cart,
    Goods,
    RateExchanger,
  },
  data() {
    return {
      MIN_EXCHANGE_RATE: 20,
      MAX_EXCHANGE_RATE: 80,
    };
  },
  setup() {
    let priceClass = ref('price');
    provide("priceClass", priceClass);

    function changeClassName(newValue, oldValue) {
      priceClass.value =
        "price " +
        (newValue > oldValue ? "price--increased" : "price--decreased");
    }

    return {
      priceClass,
      changeClassName,
    };
  },

  computed: {
    exchangeRate: {
      get() {
        return this.$store.state.Rate.value;
      },
      set(value) {
        this.$store.dispatch("Rate/edit", value);
      },
    },
  },

  methods: {
    loadGoods() {
      this.$store.dispatch("Goods/load");
    },
    randomPrice(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
  },

  watch: {
    exchangeRate: function (newValue, oldValue) {
      this.changeClassName(newValue, oldValue);
    },
  },
  mounted() {
    this.loadGoods();
    setInterval(() => {
      let exchangeRate = this.randomPrice(this.MIN_EXCHANGE_RATE, this.MAX_EXCHANGE_RATE);
      this.$store.dispatch("Rate/edit", exchangeRate);
      this.loadGoods;
    }, 15000);
  },
};
</script>


<style lang="css">
.price {
  background-color: none;
  margin: 0 auto;
}

.price--increased {
  background-color: red;
}

.price--decreased {
  background-color: green;
}

.button {
  margin: 10px;
}
</style>
