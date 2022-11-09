import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    productEdit: {},
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },

    setProductEdit(state, product) {
      state.productEdit = product;
    },

    removeProduct(state, item) {
      state.products = state.products.filter((pro) => {
        return pro.id != item.id;
      });
    },
  },
});
