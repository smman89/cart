/* ============
 * Mutations for the Cart module
 * ============
 */
function checkBalance(balance, newQuantity, oldQuantity = 0) {
    let orderBalance = newQuantity + oldQuantity
    return orderBalance <= balance ? true : false
}

export default {
    add(state, payload) {
        let i = state.list.findIndex(goods => goods.id === payload.id)
        let newQuantity = Number(payload.quantity)

        if (i > -1) {
            if (checkBalance(payload.balance, newQuantity, state.list[i].quantity)) {
                state.list[i].quantity = Number(state.list[i].quantity || 0) + newQuantity
            }
        } else {
            if (checkBalance(payload.balance, newQuantity)) {
                state.list.push(payload)
            }
        }
    },

    remove(state, id) {
        state.list = state.list.filter(item => item.id !== id)
    },

    edit(state, payload) {
        let index = state.list.findIndex(item => item.id === payload.id)
        state.list[index].quantity = payload.quantity
    }
}
