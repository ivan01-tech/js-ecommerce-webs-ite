import Produits from './produits.js'
// End of products 

// TODO fontionnalite d'increment decrement des products.
console.log(window.location.hash);
window.location.hash = '/ivan'
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

let incrementButton = []
let decrementButton = []
let amountDOM = []

let cart = []
let buttonsDOM = []
let removeItemsLinks = []
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
      result += `<article class="product-item">
        <img src='${produit.image}' alt=${produit.title} />
        <div class="details">
          <h4>${produit.title}</h4>
          <h5 class="prix" >${produit.price} FCFA</h5>
        </div>
        <button class="add-button" data-id=${produit.id}>Add in Cart</button>
      </article>`
    })
    ProductDOM.innerHTML = result
  }
  // remove a Product
  static removeItems() {
    const removeLinks = document.querySelectorAll('.remove-item')
    removeItemsLinks = [...removeLinks]
    removeLinks.forEach(link => {
      // console.log(link);
      link.addEventListener('click', function (e) {
        e.target.style.backgroundColor = 'red'
        const id = e.target.dataset.id
        // console.log(id);
        UI.updateProductsStatusFromLocal(id)
        UI.removeItemsById(id)
        UI.updateApp()
      })
    })
  }
  static removeItemsById(id) {
    cart = cart.filter(item => item.id != id)
    Storage.saveCart(cart)
  }

  static incrementDecrement() {
    incrementButton.forEach(btn => {
      const id = btn.dataset.id
      btn.addEventListener('click', function () {
        // console.log(id, 'id+');
        UI.incrementById(id)
      })
    })

    decrementButton.forEach(btn => {
      const id = btn.dataset.id
      btn.addEventListener('click', function (e) {
        UI.decrementById(id)
        // console.log(id, 'id-');
      })
    })
  }

  // increment a card item
  static incrementById(id) {
    cart = cart.map(item => {
      if (item.id == id) {
        if (item.amount >= 10) {
          alert('pas plus');
        } else {
          item.amount = item.amount + 1
          let current = amountDOM.find(count => count.dataset.id == id)
          current.innerHTML = item.amount
        }
      }

      return { ...item }
    })
    Storage.saveCart(cart)
    UI.updateCountedValue(cart)
  }

  static decrementById(id) {
    cart = cart.map(item => {
      if (item.id == id) {
        if (item.amount <= 1) {
          alert('pas moins');
        } else {
          item.amount = item.amount - 1
          let current = amountDOM.find(count => count.dataset.id == id)
          current.innerHTML = item.amount
        }
      }
      return { ...item }
    })

    // console.log(cart);
    Storage.saveCart(cart)
    UI.updateCountedValue(cart)
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
          // this.updateCountedValue(cart)
          UI.updateCountedValue(cart)
          // remove item
          UI.removeItems()
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
      result += `<div class="cart-item">
      <img src=${ele?.image} alt="">
      <div class="desc">
        <h4>${ele?.title}</h4>
        <h5> <span class="cart-item-price">${ele?.price + ' '}</span>FCFA</h5>
        <p><a class="remove-item" data-id=${ele?.id} href="#">retirer du panier</a></p>
        <div class="count">
          <button class='decrement' data-id=${ele
          .id}>-</button>
          <span data-id=${ele.id} class="count-number">${ele?.amount}</span>
          <button class='increment' data-id=${ele?.id}>+</button>
        </div>
      </div>
    </div>`
    })
    cartContainer.innerHTML = result
    UI.removeItems()

    incrementButton = [...document.querySelectorAll('.increment')]
    decrementButton = [...document.querySelectorAll('.decrement')]
    amountDOM = [...document.querySelectorAll('.count-number')]

    UI.incrementDecrement()

  }

  static updateCountedValue(cart) {
    const prices = cart?.reduce((total, item) => total + item.amount * item.price, 0)
    const item = cart?.reduce((total, item) => total + 1, 0)
    priceTotal.textContent = prices ? prices : 0
    priceTotal1.textContent = prices ? prices : 0
    itemTotal.textContent = item ? item : 0
    console.log(prices, item);
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
    console.log(cart, 'uC');
    UI.updateCountedValue(cart)

    UI.addCartToDOM(cart)
    UI.removeItems()


  }

  clearAllCartContent() {
    const ids = cart?.map(item => item.id)
    console.log(ids);
    ids?.forEach(id => {
      UI.updateProductsStatusFromLocal(id)
    })
    cart.length = 0
    Storage.saveCart(cart)
    UI.updateCountedValue(cart)
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
    console.log(data);
    return data
  }

  static getProductsById(id) {
    return PRODUCTS.find(item => item.id == id)
  }

}


document.addEventListener('DOMContentLoaded', () => {
  let ui = new UI()
  let Product = new Products()
  const datas = Product.getProduit()
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

  incrementButton = [...document.querySelectorAll('.increment')]
  decrementButton = [...document.querySelectorAll('.decrement')]
  amountDOM = [...document.querySelectorAll('.count-number')]

  UI.incrementDecrement()
})


// UI.incrementDecrement()

