<template>
	<!-- <MainPage v-if="currentPage === 'main'"/> -->
	<!-- <ProductPage v-else-if="currentPage ==='product'"/> -->
	<!-- <NotFoundPage v-else/> -->
	<component 
		:is="currentPageComponent" 
		:page-params="currentPageParams"
		@gotoPage="(pageName, pageParams) => gotoPage(pageName, pageParams)"
	/>
</template>

<script>
	import MainPage from '@/pages/MainPage.vue';
	import ProductPage from '@/pages/ProductPage.vue';
	import NotFoundPage from '@/pages/NotFoundPage.vue';
	import eventBus from '@/eventBus';

	const routes = { // список всех страниц
		main: 'MainPage',
		product: 'ProductPage'
	}

export default {
	components:{ MainPage, ProductPage, NotFoundPage },
	data() {
		return {
			currentPage: 'main',
			currentPageParams: {

			}
		}
	},
	methods: {
		gotoPage(pageName,pageParams) {
			this.currentPage = pageName;
			this.currentPageParams = pageParams || {};
		}
	},
	computed: {
		currentPageComponent() {
			return routes[this.currentPage] || 'NotFoundPage'
		}
	},
	created() {
		eventBus.$on('gotoPage',(pageName, pageParams) => this.gotoPage(pageName, pageParams))
	}
}
</script>
