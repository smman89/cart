/* ============
 * Getters for the Cart module
 * ============
 */

export default {
    amount: state => (exchangeRate) => {
        let amoutn =  state.list.reduce((acc, item) => {
            console.log(exchangeRate)
            return acc + item.qty * item.price
        }, 0)
        amoutn = amoutn * exchangeRate
        return amoutn
    }
}
