"use strict";

const countIconEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotatEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
	document.querySelector('.basket').classList.toggle('hidden');
});

const basket = {};

const featuredItemsEl = document.querySelector('.featuredItems');
featuredItemsEl.addEventListener('click', event => {
	if (!event.target.closest('.addToBasket')) {
		return;
	}
	const featuredItem = event.target.closest('.featuredItem');
	const id = +featuredItem.dataset.id;
	const name = featuredItem.dataset.name;
	const price = +featuredItem.dataset.price;
	addToCart(id, name, price)
});

function addToCart(id, name, price) {
	if (!(id in basket)) {
		basket[id] = {
			id,
			name,
			price,
			count: 0
		};
	}
	basket[id].count++;
	countIconEl.textContent = totalBasketCounter();
	basketTotalValueEl.textContent = totalBasketPrice();
	renderProductInBasket(id);
}

function totalBasketCounter() {
	const products = Object.values(basket);
	let number = 0;
	for (const product of products) {
		number += product.count;
	}
	return number;
}

function totalBasketPrice() {
	const products = Object.values(basket);
	let sum = 0;
	for (const product of products) {
		sum += product.price * product.count;
	}
	return sum;
}

function renderProductInBasket(productId) {
	const basketRowEl = basketEl
		.querySelector(`.basketRow[data-id="${productId}"]`);
	if (!basketRowEl) {
		renderNewProductInBasket(productId);
		return;
	}
	const product = basket[productId];
	basketRowEl.querySelector('.productCount').textContent = product.count;
	basketRowEl
		.querySelector('.productTotalRow')
		.textContent = (product.price * product.count);
}

function renderNewProductInBasket(productId) {
	const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
	basketTotatEl.insertAdjacentHTML("beforebegin", productRow);
}
