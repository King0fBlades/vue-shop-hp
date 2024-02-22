import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    isLoading: Boolean,
    products: [],
    product: null
  }),
  getters: {
    getProducts(state) {
      return state.products
    },
    getProductById(state) {
      return state.products.id
    }
  },
  actions: {
    async fetchProducts() {
      this.isLoading = true
      try {
        const data = await axios.get('https://api.escuelajs.co/api/v1/products')
        this.isLoading = false
        this.products = data.data
      } catch (error) {
        this.isLoading = false
        alert(error)
        console.log(error)
      }
    },
    async fetchProduct(id) {
      this.product = null
      this.isLoading = true
      try {
        const data = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
        this.isLoading = false
        this.product = data.data
      } catch (error) {
        this.isLoading = false
        alert(error)
        console.log(error)
      }
    }
  }
})
