/* ============
 * Getters for the Cart module
 * ============
 */

export default {
    amount: state => {
        return state.list.reduce((acc, item) => {
            return acc + item.quantity * item.price
        }, 0)
    }
}
