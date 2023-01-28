<template>
	<ul class="colors">
		<li class="colors__item" v-for="color in colors" :key="color.id">
			<label class="colors__label">
				<input class="colors__radio sr-only" type="radio" name="color" value="#73B6EA" checked="">
				<span class="colors__value" :style="{ 'background-color': color.background }">
				</span>
			</label>
		</li>
	</ul>
</template>

<script>
import colors from '@/data/colors';

export default {
	data() {
		return {
			colore: '#73B6EA'
		}
	},
	computed: {
		colors() {
			return colors
		}
	}
}
</script>