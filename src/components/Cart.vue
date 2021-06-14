<template>
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
          <td class="cart__quantity">
            <CustomInput
              :val="item.quantity"
              :max="item.balance"
              @input="(e) => changeQuantity(item, e)"
            />

            <span v-if="item.quantity >= item.balance"
              >Количество ограничено</span
            >
          </td>
          <td>{{ getPrice(item.price) }} руб./шт</td>
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
      <span :class="priceClass"> {{ getPrice(cartAmount) }}</span
      >руб.
    </p>
  </div>
</template>

<script>
import { inject } from "vue";
import CustomInput from "../components/UI/CustomInput.vue";
export default {
  setup() {
    const priceClass = inject("priceClass", "price");

    return {
      priceClass,
    };
  },

  components: {
    CustomInput,
  },

  methods: {
    removeFromCart(item) {
      this.$store.dispatch("Cart/remove", item);
    },
    getPrice(price) {
      return this.$store.getters["Rate/getRublePrice"](price);
    },
    changeQuantity(item, quantity) {
      if (quantity >= 0 && quantity <= item.balance) {
        this.$store.dispatch("Cart/edit", {
          ...item,
          quantity: quantity,
        });
      }
    },
  },
  computed: {
    cartList() {
      return this.$store.state.Cart.list;
    },
    cartAmount() {
      return this.$store.getters["Cart/amount"];
    },
  },
};
</script>

<style lang="css" scoped>
.cart {
  grid-template-columns: 1fr;
}
.cart__quantity {
  display: flex;
  flex-direction: column;
  color: red;
  align-self: flex-end;
}

.cart__amount {
  align-self: flex-end;
}
</style>
