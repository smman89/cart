/* ============
 * Actions for the Goods module
 * ============
 */
import NAMES from "../../../names.json";

export const load = ({ commit }) => {
    fetch("./data.json")
        .then((response) => response.json())
        .then((data) => {
            const goods = data.Value.Goods;
            let groupedGoods = {};
            goods.forEach((g) => {
                if (!groupedGoods[g.G]) {
                    groupedGoods[g.G] = {
                        title: NAMES[g.G].G,
                        id: g.G,
                        goods: [],
                    };
                }

                groupedGoods[g.G].goods.push({
                    price: g.C,
                    id: g.T,
                    balance: g.P,
                    title: NAMES[g.G].B[g.T].N,
                });
            });
            commit('load', Object.values(groupedGoods))
        });
}

export default {
    load
}
