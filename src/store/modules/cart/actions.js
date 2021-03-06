/* ============
 * Actions for the Cart module
 * ============
 */

export const add = ({ commit }, item) => {
    commit('add', item)
}

export const edit = ({ commit }, item) => {
    commit('edit', item)
}

export const remove = ({ commit }, item) => {
    commit('remove', item.id)
}


export default {
    add, edit, remove
}
