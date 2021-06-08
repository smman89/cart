<template>
  <div class="page">
    <div class="exchange">
      <div>Курс: min=20 р.</div>
      <div class="exchange-range">
        <span :class="priceClass">{{ exchangeRate }}</span>
        <input type="range" min="20" max="80" v-model="exchangeRate" />
      </div>
      <div>max=80 р.</div>
    </div>
    <div class="market">
      <div class="group" v-for="(group, key) in goods" :key="key">
        <h3 class="group__title">{{ group.title }}</h3>
        <ul class="goods">
          <li
            class="goods__item"
            v-for="(item, itemKey) in group.goods"
            :key="itemKey"
          >
            <p class="goods__title">{{ item.title }} ({{ item.balance }})</p>
            <span :class="priceClass + ' goods__price'">{{
              getRublePrice(item.price)
            }}</span>
            <button class="button" type="button" @click="addToCart(item)">
              +
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="cart">
      <h2>Корзина</h2>
      <table class="cart__table">
        <tbody>
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена</th>
          <tr v-for="(item, key) in cartList" :key="key">
            <td>
              {{ item.title }}
            </td>
            <td class="cart__qty">
              <input
                type="number"
                min="0"
                :value="item.qty"
                @input="(e) => changeQty(item, e)"
              />
              <span v-if="item.qty >= item.balance">Количество ограничено</span>
            </td>
            <td>{{ getRublePrice(item.price) }} руб./шт</td>
            <td>
              <button class="button" @click="removeFromCart(item)">
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="cart__amount">
        Общая стоимость:
        <span :class="cartPriceClass"> {{ cartAmount.toFixed(2) }}</span
        >руб.
      </p>
    </div>
  </div>
</template>


<script>
const MAX_EXCHANGE_RATE = 80;
const MIN_EXCHANGE_RATE = 20;

export default {
  name: "App",
  data() {
    return {
      groupedGoods: [],
      exchangeRate: 50,
      priceClass: "price",
      cartPriceClass: "price",
    };
  },
  methods: {
    getRublePrice(dollarPrice) {
      return (dollarPrice * this.exchangeRate).toFixed(2);
    },
    addToCart(item) {
      this.$store.dispatch("Cart/add", { ...item, qty: 1 });
    },
    loadGoods() {
      this.$store.dispatch("Goods/load");
    },
    changeQty(item, e) {
      let value = e.target.value;
      if (value >= 0 && value <= item.balance) {
        this.$store.dispatch("Cart/edit", {
          ...item,
          qty: Number(value),
        });
      }
      this.$forceUpdate();
    },
    removeFromCart(item) {
      this.$store.dispatch("Cart/remove", item);
    },
    changeClassName(newValue, oldValue) {
      let varible =
        "price " +
        (newValue > oldValue ? "price--increased" : "price--decreased");

      return varible;
    },
    randomPrice(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
  },
  computed: {
    cartList() {
      return this.$store.state.Cart.list;
    },
    cartAmount() {
      return this.$store.getters["Cart/amount"](this.exchangeRate);
    },
    goods() {
      return this.$store.state.Goods.list;
    },
  },
  watch: {
    cartAmount: function (newValue, oldValue) {
      this.cartPriceClass = this.changeClassName(newValue, oldValue);
    },
    exchangeRate: function (newValue, oldValue) {
      this.priceClass = this.changeClassName(newValue, oldValue);
    },
  },
  mounted() {
    this.loadGoods();
    setInterval(() => {
      this.exchangeRate = this.randomPrice(
        MIN_EXCHANGE_RATE,
        MAX_EXCHANGE_RATE
      );
      this.loadGoods;
    }, 15000);
  },
};
</script>



<style lang="css" scoped>
.exchange {
  max-width: 450px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

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

.exchange-range {
  display: flex;
  flex-direction: column;
  justify-self: center;
}

.cart {
  grid-template-columns: 1fr;
}
.cart__qty {
  display: flex;
  flex-direction: column;
  color: red;
  align-self: flex-end;
}

.cart__amount {
  align-self: flex-end;
}

.button {
  margin: 10px;
}

.market {
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.goods {
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
