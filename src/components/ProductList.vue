<template>
	<div>
		<ul class="catalog__list">
			<li class="catalog__item" v-for="product in products" :key="product.id">
				<ProductItem 
					:image="product.image" 
					:title="product.title" 
					:price="product.price"
				/>
			</li>
		</ul>
	</div>
</template>

<script>
import ProductItem from './ProductItem';

export default {
	components: { ProductItem },
	props: ['products']
}
</script>