<template>
	<main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ $route.params.id }}</span>
      </h1>

    </div>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа. 
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

					<OrderCustomer :customerData="customerData"/>

        </div>
				<div>
					<OrderProductList
						:products="orderProducts"
						:totalPrice="orderInfo.totalPrice"
						:buttonShow="false"
					/>
				</div>
      </form>
			
    </section>
  </main>
</template>
<script>
// import { mapGetters } from 'vuex';
import OrderProductList from '@/components/OrderProductList';
import OrderCustomer from '@/components/OrderCustomer';


	export default{
		components: {
			OrderProductList, 
			OrderCustomer,
			},
		created() {
			if(this.$store.state.orderInfo && this.$store.state.orderInfo.id ===  this.$route.params.id) {
				return
			}

			this.$store.dispatch('loadOrderInfo', this.$route.params.id)
		},
		computed: {
			orderInfo() {
        return this.$store.state.orderInfo || {};
      },
			orderProducts() {
        return this.orderInfo.basket.items.map((item) =>({
					...item,
					id: item.product.id,
					price: item.price,
					amount: item.quantity,
					title: item.product.title
				} ))
			},
			customerData() {
				return [
					{key: 'Получатель', value: this.orderInfo.name, id: 0},
					{key: 'Адрес доставки', value: this.orderInfo.address, id: 1},
					{key: 'Телефон', value: this.orderInfo.phone, id: 2},
					{key: 'Email', value: this.orderInfo.email, id: 3},
					{key: 'Способ оплаты', value: 'картой при получении', id: 4},
				]
			}
    },
	}
</script>