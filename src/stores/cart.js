import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('items')) || []
  }),

  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) =>
      state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  actions: {
    saveItems() {
      localStorage.setItem('items', JSON.stringify(this.items))
    },

    addToCart(item) {
      const existingItemIndex = this.items.findIndex((product) => product.id === item.id)

      if (existingItemIndex !== -1) {
        this.items[existingItemIndex].quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
      this.saveItems()
    },

    incrementQuantity(item) {
      const index = this.items.findIndex((product) => product.id === item.id)
      if (index !== -1) {
        this.items[index].quantity += 1
        this.saveItems()
      }
    },

    decrementQuantity(item) {
      const index = this.items.findIndex((product) => product.id === item.id)
      if (index !== -1) {
        this.items[index].quantity -= 1
        if (this.items[index].quantity === 0) {
          this.items = this.items.filter((product) => product.id !== item.id)
        }
        this.saveItems()
      }
    },

    removeFromCart(index) {
      this.items.splice(index, 1)
      this.saveItems()
    },

    clearCart() {
      this.items = []
      this.saveItems()
    }
  }
})
