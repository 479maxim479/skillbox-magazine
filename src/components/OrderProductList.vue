<template>
	<div class="cart__block">
		<ul class="cart__orders">
			<li class="cart__order" v-for="item in products" :key="item.id">
				<h3>{{ item.title }}</h3>
				<b>{{ (item.price * item.amount) | formatNumber }} ₽</b>
				<span>Артикул: {{ item.id }}</span>
			</li>
		</ul>
		<div class="cart__total">
			<p>Доставка: <b>500 ₽</b></p>
			<p>Итого: <b> {{products.length}} </b> товара на сумму <b>{{ totalPrice | formatNumber }} ₽</b></p>
		</div>
		<button class="cart__button button button--primery" type="submit" v-if="buttonShow">
			Оформить заказ
		</button>
	</div>
</template>
<script>
import formatNumber from '@/helpers/formatNumber';
	export default {
		filters: { formatNumber },
		props: {
			products: Array,
			totalPrice: Number,
			buttonShow: Boolean
		},
		

	}
</script>