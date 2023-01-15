import Vue from 'vue'
import App from './App.vue'
import { message1, message2 } from './test'
import printGreeting from './test2'

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#app')

printGreeting(message1)
printGreeting(message2)
