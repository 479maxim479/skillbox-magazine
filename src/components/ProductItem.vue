<template>
	<li class="catalog__item">
		<router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
			<img :src="product.image" :alt="product.title">
		</router-link>

			<h3 class="catalog__title">
			<a href="#">
				{{ product.title }}
			</a>
			</h3>

			<span class="catalog__price">
			{{ product.price | formatNumber }}
			</span>

			<ul class="colors colors--black">
				<li class="colors__item" v-for="color in product.colors" :key="color">
				<label class="colors__label" :for="product.id">
					<input 
						:id="product.id"
						class="colors__radio sr-only" 
						type="radio"
						:name="product.id"
						:value="color.code" 
					>
					<span class="colors__value" :style="background(color.code)">
					</span>
				</label>
				</li>
			</ul>
	</li>
</template>

<script>
import gotoPage from '@/helpers/gotoPage';
import formatNumber from '@/helpers/formatNumber';

export default {
	name: 'ProductItem',
	props: ['product'],
	data() {
		return {
			color: '#73B6EA;',
		}
	},
	filters: { formatNumber },
	methods: {
		background(colValue) {
			return {
				'background-color': colValue,
			}
		},
		gotoPage
	}
}
</script>