products.forEach((product, i) => {
  const { image } = product;
  const { name } = product;
  const finalStars = product.rating.stars * 10;
  const { count } = product.rating;
  const finalPrice = product.priceCents / 100;

  const html = `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${finalStars}.png">
        <div class="product-rating-count link-primary">
          ${count}
        </div>
      </div>

      <div class="product-price">
        $${finalPrice.toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id} quantity-selector">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${
      product.id
    }">
      Add to Cart
    </button>
  </div>
  `;

  document.querySelector(".products-grid").innerHTML += html;

  document.querySelectorAll(".js-add-to-cart").forEach((addToCartButton) => {
    addToCartButton.addEventListener("click", () => {
      const productId = addToCartButton.dataset.productName;

      let matchingItem;

      cart.forEach((item) => {
        if (item.name === productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: Number(
            document.querySelector(`.js-quantity-selector-${productId}`).value
          ),
        });
      }

      document.querySelector(
        `.js-quantity-selector-${productId}`
      ).selectedIndex = 0;

      // * work the same
      // document.querySelector(".quantity-selector").selected = "1";

      // ! THIS CODE WILL NOT WORK
      // * soale forEach ini loop ga dirancang buat jalan ketika ada hal yang berubah di pedoman iterasinya
      /*
        cart.forEach((item) => {
        if (item.name === productName) {
          matchingItem.quantity += 1;
        } else {
          cart.push({
            name: productName,
            quantity: 1,
          });
        }
      }); 
      */

      let itemCount = 0;
      cart.forEach((object) => {
        itemCount += object.quantity;
      });

      document.querySelector(".js-cart-quantity").innerHTML = itemCount;
    });
  });
});
