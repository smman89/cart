import { createStore } from 'vuex'
import Cart from './modules/cart'
import Goods from './modules/goods'

export default new createStore({
    modules: {
        Cart,
        Goods
    },
    devtools: true,
    strict: true,
})
