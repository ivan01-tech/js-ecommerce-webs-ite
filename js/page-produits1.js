import Produits from './produits.js'
import { populateCart, populateProducts } from './populate-cart.js'
// End of products 

// Variable
const cartContainer = document.querySelector('.cart-grille')
const cartLayout = document.querySelector('.cart-container')
const cartWrapper = document.querySelector('.cart-wrapper')
const closeCartIcon = document.querySelector('.close-cart-icon')
const cartIcon = document.querySelector('.counter-card-left')
const clearAllCartButton = document.querySelector('.clear-cart')

let priceTotal = document.querySelector('.total-count')
let ProductDOM = document.querySelector('.produits')
let priceTotal1 = document.querySelector('.price span')
let itemTotal = document.querySelector('.number-item')

let cart = []
let buttonsDOM = []
let PRODUCTS = Produits
// LocalStorage Class
class Storage {
  static saveProducts(products) {
    window.localStorage.setItem('products', JSON.stringify(products))
  }
  static saveCart(cart) {
    window.localStorage.setItem('cart', JSON.stringify(cart))

  }
  static getProductsById(id) {
    const item = this.getProducts().find(item => item.id == id)
    return Boolean(item) ? item : {}
  }

  static getProducts() {
    const data = JSON.parse(window.localStorage.getItem('products'))
    return Boolean(data) ? data : []
  }
  static getCart() {
    const data = JSON.parse(window.localStorage.getItem('cart'))
    return Boolean(data) ? data : []
  }

}

class UI {
  displayProducts(products) {
    let result = ''
    products.forEach(function (produit, ind) {
      result += populateProducts(produit)
    })
    ProductDOM.innerHTML = result
  }


  static addToCart() {
    const AddButton = [...document.querySelectorAll('.add-button')]
    buttonsDOM = [...AddButton]

    AddButton.forEach(btn => {
      const id = btn.dataset.id
      const inCart = cart?.find(item => item.id == id)
      if (Boolean(inCart)) {
        btn.textContent = 'IN CART'
        btn.style.cursor = 'not-allowed'
      } else {
        btn.addEventListener('click', (e) => {
          e.target.textContent = 'IN CART'
          e.target.style.cursor = 'not-allowed'
          // getProduct
          const currentProduct = { ...Storage.getProductsById(id), amount: 1 }
          cart = [currentProduct, ...cart]
          // console.log(cart);
          // save in local
          Storage.saveCart(cart)
          // display in cart
          UI.addCartToDOM(cart)
          // this.openCloseCart()
          UI.openCart()
          // update
          // this.updateCountedValues(cart)
          UI.updateCountedValues(cart)
          // remove item
          // UI.removeItems()
          // TODO ....

        })
      }
    })
  }
  static addCartToDOM(cart) {
    let result = ''
    if (cart?.lenght > !0) {
      cartContainer.innerHTML = "You currently don't have a product"
    }
    cart?.forEach(ele => {
      result += populateCart(ele)
    })
    cartContainer.innerHTML = result

    const cartItem = document.querySelectorAll('.cart-item')
    cartItem.forEach((item) => {
      item.addEventListener('click', function (e) {

        if (e.target.classList.contains('remove-item')) {
          const removedItem = e.target
          const id = removedItem.dataset.id
          const removedItemParent = e.target.parentElement.parentElement.parentElement
          // console.log(id, removedItemParent);
          UI.removeItemsById(id)
          cart = Storage.getCart()
          cartContainer.removeChild(removedItemParent)
          UI.updateProductsStatusFromLocal(id)
          UI.updateCountedValues(cart)
        } else if (e.target.classList.contains('increment')) {
          const incrementItem = e.target
          const id = incrementItem.dataset.id
          UI.incrementById(id, incrementItem)
        } else if (e.target.classList.contains('decrement')) {
          const incrementItem = e.target
          const id = incrementItem.dataset.id
          UI.decrementById(id, incrementItem)
        }

      })
    })

  }

  static decrementById(id, DOMElelement) {
    cart = cart.map(item => {
      if (item.id == id) {
        if (item.amount <= 1) {
          alert('pas moins');
        } else {
          item.amount = item.amount - 1
          let current = DOMElelement.nextElementSibling
          current.textContent = item.amount
        }
      }
      return { ...item }
    })

    // console.log(cart);
    Storage.saveCart(cart)
    UI.updateCountedValues(cart)
  }

  static incrementById(id, DOMElelement) {
    cart = cart.map(item => {
      if (item.id == id) {
        if (item.amount >= 10) {
          alert('pas plus');
        } else {
          item.amount = item.amount + 1
          let current = DOMElelement.previousElementSibling
          // console.log(current);
          current.textContent = item.amount
        }
      }

      return { ...item }
    })
    Storage.saveCart(cart)
    UI.updateCountedValues(cart)
  }

  static removeItemsById(id) {
    cart = cart.filter(item => item.id != id)
    Storage.saveCart(cart)
  }

  static updateCountedValues(cart) {
    const prices = cart?.reduce((total, item) => total + item.amount * item.price, 0)
    const item = cart?.reduce((total, item) => total + item.amount, 0)
    priceTotal.textContent = prices ? prices : 0
    priceTotal1.textContent = prices ? prices : 0
    itemTotal.textContent = item ? item : 0
    // console.log(prices, item);
  }

  static openCart() {
    cartLayout.classList.add('active')
    cartWrapper.classList.add('active')
  }
  static closeCart() {
    cartLayout.classList.remove('active')
    cartWrapper.classList.remove('active')
  }
  // update value onload 
  static updateApp() {
    cart = Storage.getCart()

    UI.updateCountedValues(cart)

    UI.addCartToDOM(cart)
    // UI.removeItems()

  }

  clearAllCartContent() {
    const ids = cart?.map(item => item.id)
    // console.log(ids);
    ids?.forEach(id => {
      UI.updateProductsStatusFromLocal(id)
    })
    cart.length = 0
    Storage.saveCart(cart)
    UI.updateCountedValues(cart)
    UI.addCartToDOM(cart)
    UI.closeCart()
  }

  static updateProductsStatusFromLocal(id) {
    buttonsDOM = buttonsDOM.map((btn) => {
      if (btn.dataset.id == id) {
        btn.textContent = 'ADD IN CART'
        btn.style.removeProperty('cursor')
      }
      return btn
    })
  }
}

class Products {
  async getProduit() {
    const data = await fetch('./products.json').then((res) => console.log(res)).catch((err) => console.log(err))
    // console.log(data);
    return data
  }

  static getProductsById(id) {
    return PRODUCTS.find(item => item.id == id)
  }

}


document.addEventListener('DOMContentLoaded', () => {
  let ui = new UI()
  let Product = new Products()
  // const datas = Product.getProduit()
  ui.displayProducts(PRODUCTS)
  UI.updateApp()
  // Product.getProducts()
  Storage.saveProducts(PRODUCTS)
  UI.addToCart()

  // clear all cart
  clearAllCartButton.addEventListener('click', function () {
    ui.clearAllCartContent()
    UI.closeCart()
  })
  // close Cart 
  closeCartIcon.addEventListener('click', UI.closeCart)
  cartIcon.addEventListener('click', UI.openCart)

})


