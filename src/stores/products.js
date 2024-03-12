import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProductStore = defineStore('product', {
  state: () => ({
    isLoading: false,
    products: [],
    categories: [],
    product: null,
    category: 'All'
  }),

  getters: {
    getProducts(state) {
      return state.products
    },
    getProductById(state) {
      return state.products?.id
    },
    getCategories(state) {
      return state.categories
    }
  },

  actions: {
    async fetchProducts(category = 'All') {
      this.isLoading = true
      try {
        let url = 'https://fakestoreapi.com/products'
        if (category !== 'All') {
          url = `https://fakestoreapi.com/products/category/${category}`
        }

        const data = await axios.get(url)
        this.category = category

        this.products = data.data.map((product) => ({ ...product, quantity: ref(1) }))

        this.isLoading = false
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
        const data = await axios.get(`https://fakestoreapi.com/products/${id}`)
        this.product = data.data
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        alert(error)
        console.log(error)
      }
    },

    async fetchCategories() {
      this.isLoading = true
      try {
        const data = await axios.get('https://fakestoreapi.com/products/categories')
        this.categories = data.data
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        alert(error)
        console.log(error)
      }
    }
  }
})
