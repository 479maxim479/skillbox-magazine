<template>
	<ul class="catalog__pagination pagination">
			<li class="pagination__item">
				<a href="#" class="pagination__link pagination__link--arrow" 
					:class="{'pagination__link--disabled': page === 1}"
					@click.prevent="prevPage(page)" 
					aria-label="Предыдущая страница">
					<svg width="8" height="14" fill="currentColor">
						<use xlink:href="#icon-arrow-left"></use>
					</svg>
				</a>
			</li>
			<li class="pagination__item"
				v-for="(pageNumber) in pages" :key="pageNumber">
				<a href='#' class="pagination__link" 
					:class="{'pagination__link--current': pageNumber === page}" 
					@click.prevent="paginate(pageNumber)"
				>
					{{pageNumber}}
				</a>
			</li>
			<li class="pagination__item">
				<a href="#" class="pagination__link pagination__link--arrow"
				:class="{'pagination__link--disabled': page === Math.ceil(count/perPage)}"
				@click.prevent="nextPage(page)" 
				aria-label="Следующая страница">
					<svg width="8" height="14" fill="currentColor">
						<use xlink:href="#icon-arrow-right"></use>
					</svg>
				</a>
			</li>
		</ul>
</template>

<script>
export default{
	model: {
		prop:'page',
		event:'paginate'
	},
	props: ['page','count','perPage'],
	computed:{
		pages() {
			return Math.ceil(this.count/this.perPage)
		}
	},
	methods:{
		paginate(page) {
      this.$emit('paginate', page)
		},
		nextPage(page) {
			if(page === Math.ceil(this.count/this.perPage)) {
				return
			}
			this.$emit('paginate',page + 1)
		},
		prevPage(page) {
			if(page === 1) {
				return
			}
			this.$emit('paginate',page - 1)
		}
	}
}
</script>