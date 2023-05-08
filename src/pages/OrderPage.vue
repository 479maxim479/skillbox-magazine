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
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <base-form-text 
							v-model="formData.name" 
							type="text" 
							:error="formError.name" 
							title="ФИО" 
							placeholder="Введите ваше полное имя"
						/>
						<base-form-text 
							v-model="formData.address" 
							type="text" 
							:error="formError.address" 
							title="Адрес доставки" 
							placeholder="Введите ваш адрес"
						/>
						<b-row>
							<b-col>
								<base-form-text 
									v-model="formData.phone" 
									type="tel" 
									:error="formError.phone" 
									title="Телефон" 
									placeholder="Введите ваш телефон"
								/>
								<span
									v-if="!this.validatePhone" class="text-danger"
								>
								{{ errorsValidation.code[0] }}
								</span>
							</b-col>
						</b-row>
						<base-form-text 
							v-model="formData.email" 
							type="email" 
							:error="formError.email" 
							title="Email" 
							placeholder="Введите ваш Email"
						/>
						<base-form-textarea 
							title="Комментарий к заказу"
							type="text" 
							v-model="formData.comment" 
							:error="formError.comment" 
							placeholder="Ваши пожелания"
						/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>
				<div>
			
					<OrderProductList 
						:products="productsOrderPage"
						:totalPrice="totalPrice"
						:buttonShow="true"
					/>
				
					<div class="cart__error form__error-block" v-if="formErrorMessage">
						<h4>Заявка не отправлена!</h4>
						<p>
							{{  formErrorMessage }}
						</p>
					</div>
				</div>
      </form>
    </section>
  </main>
</template>
<script>
	import BaseFormText from '@/components/BaseFormText';
	import BaseFormTextarea from '@/components/BaseFormTextarea';
	import OrderProductList from '@/components/OrderProductList';
	import axios from 'axios';
	import { API_BASE_URL } from '@/config';
	import { mapGetters } from 'vuex';

	export default {
		components: { BaseFormText, BaseFormTextarea, OrderProductList },
		data() {
			return {
				formData: {},
				formError: {},
				formErrorMessage: '', 
			}
		},
		computed: {
			...mapGetters({
				products: 'cartDetailProducts',
				totalPrice: 'cartTotalPrice',
				countProduct: 'cartTotalProduct'
			}),
			productsOrderPage() {
				return this.products.map((item) => ({
					...item,
					id: item.product.id,
					title: item.product.title,
					price: item.product.price,
					amount: item.amount
				}))
			},
			validatePhone(){
				if(this.formData.phone) {
					let regex = /^(\+7|8)\d{0,10}$/;
          return regex.test(this.formData.phone);
				
				} else {
					return true
				}
      },
			errorsValidation() {
				const errors ={};

				errors.code = [];
				if (!this.validatePhone) {
        errors.code.push('Телефон должен начинаться на +7');
      }

			return errors
			}
		},
		methods: {
			order() {
				if(!this.validatePhone) {
					return
				} else {
				this.validatePhone	
				this.formError = {}
				this.formErrorMessage = '' // при отправке сбрасываем значение

				axios.post(API_BASE_URL + '/api/orders', {
					...this.formData  // передаем объект с данными
				}, {
					params: {
						userAccessKey: this.$store.state.userAccessKey
					}
				})
				.then(response => {
					this.$store.commit('resetCart') // при успешной отправке запроса очищаем корзину
					this.$store.commit('updateOrderInfo', response.data) // записываем данные с сервера
					this.$router.push({name: 'orderInfo', params: {id: response.data.id}})
				})
				.catch(error => {
					this.formError = error.response.data.error.request || {}
					this.formErrorMessage = error.response.data.error.message
				})
			}
			}
		}
	}
</script>
<style scoped>
	.text-danger {
		position: relative;
    font-size: 11px;
    line-height: 14px;
    color: #ff4d00;
    left: 20px;
		bottom: 4px;
	}
    
</style>