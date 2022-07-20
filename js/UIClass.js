class UI {
    displayProducts(products) {
        let result = ''
        products.forEach(function (produit, ind) {
            result += `<article class="product-item">
          <img src='${produit.image}' alt=${produit.title} />
          <div class="details">
            <h4>${produit.title}</h4>
            <h5>${produit.price} FCFA</h5>
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
            console.log(link);
            link.addEventListener('click', function (e) {
                e.target.style.backgroundColor = 'red'
                const id = e.target.dataset.id
                console.log(id);
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
                incrementById()
            })
        })
    }
    // increment a card item
    incrementById(id) {
        cart = cart.map(item => {
            if (item.id == id) {
                item.amount++
            }
            return item
        })
        Storage.saveCart(cart)
    }


    static addToCart() {
        const AddButton = [...document.querySelectorAll('.add-button')]
        buttonsDOM = [...AddButton]
        incrementButton = [...document.querySelector('.decrement')]
        decrementButton = [...document.querySelectorAll('.increment')]

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
                    console.log(cart);
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
            <span class="count-number">${ele?.amount}</span>
            <button class='increment' data-id=${ele?.id}>+</button>
          </div>
        </div>
      </div>`
        })
        cartContainer.innerHTML = result
        UI.removeItems()

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
        // console.log(cart, 'uC');
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

export default UI