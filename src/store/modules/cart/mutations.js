/* ============
 * Mutations for the Cart module
 * ============
 */

export default {
    add(state, payload) {
        let i = state.list.findIndex(goods => goods.id === payload.id)
        if (i > -1) {
            state.list[i].qty = Number(state.list[i].qty || 0) + Number(payload.qty)
        } else state.list.push(payload)
    },

    remove(state, id) {
        state.list = state.list.filter(item => item.id !== id)
    },

    edit(state, payload) {
        let index = state.list.findIndex(item => item.id === payload.id)
        state.list[index].qty = payload.qty
    }
}
