<template>
	<div>
		<ul class="catalog__list">
			<li class="catalog__item" v-for="(product, idx) in products" :key="idx">
				<ProductItem :image="product.image" :title="product.title" :price="product.price" />
			</li>
		</ul>
	</div>
</template>

<script>
import ProductItem from './ProductItem';

export default {
	components: { ProductItem },
	props: { products: Array }
}
</script>