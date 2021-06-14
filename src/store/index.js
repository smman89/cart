import { createStore } from 'vuex'
import Cart from './modules/cart'
import Goods from './modules/goods'
import Rate from './modules/rate'

export default new createStore({
    modules: {
        Cart,
        Goods,
        Rate,
    },
    devtools: true,
    strict: true,
})
