
export const populateCart = (ele) => {
  return `<div class="cart-item">
  <img src=${ele?.image} alt="">
  <div class="desc">
    <h4>${(ele?.title).substring(0,5)}...</h4>
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
}

export const populateProducts = (produit) => {
  return `<article class="product-item">
<img src='${produit.image}' alt=${produit.title} />
<div class="details">
  <h4>${produit.title.substring(0,10)}...</h4>
  <h5 class="prix" >${produit.price} FCFA</h5>
</div>
<button class="add-button" data-id=${produit.id}>Add in Cart</button>
</article>`
}