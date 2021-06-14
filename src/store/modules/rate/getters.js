/* ============
 * Getters for the Rate module
 * ============
 */

export default {
    getRublePrice: state => (price) => {
        return  (price * state.value).toFixed(2)
    }
}
