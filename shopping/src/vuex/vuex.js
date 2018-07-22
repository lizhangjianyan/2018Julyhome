import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        userInformation: {
            msg: '',
            name: ''
        },
        productList: [],
        cartList: []
    },
    mutations: {
        update(state, data_user) {
            state.userInformation = data_user;
        },
        init(state) {
            
            state.userInformation.msg = '';
            state.userInformation.name = '';
        },
        verify(state, data_userName) {
            state.userInformation = data_userName;
        },
        // 添加商品列表
        setProductList(state, data) {
            state.productList = data;

        },
        // 添加到购物车
        addCart(state, id) {
            // 先判断购物车是否已有，如果有，数量+1
            const isAdded = state.cartList.find(item => item.id === id);
            if (isAdded) {
                isAdded.count++;
            } else {
                state.cartList.push({
                    id: id,
                    count: 1
                })
            }
        },
        // 修改商品数量
        editCartCount(state, payload) {
            const product = state.cartList.find(item => item.id === payload.id);
            product.count += payload.count;
        },
        // 删除商品
        deleteCart(state, id) {
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index, 1);
        },
        // 清空购物车
        emptyCart(state) {
            state.cartList = [];
        }

    },
    getters: {
        brands: state => {
            const brands = state.productList.map(item => item.brand);
            //数组去重
            return Array.from(new Set(brands));
        },
        colors: state => {
            const colors = state.productList.map(item => item.color);
            //数组去重
            return Array.from(new Set(colors));
        }
    },
    actions: {
        // 请求商品列表
        getProductList(context) {
            axios
                .get("/productList")
                .then(res => {
                    context.commit('setProductList', res.data)

                })
        },
        //登入ajax查询
        ajax_user(context, data_user) {
            axios
                .post("/login/username&&password", data_user)
                .then(res => {
                    context.commit('update', res.data)
                })

        },
        //注册查询用户名重复
        ajax_verifyUsername(context, data_userName) {
            axios
                .post("/register/username", data_userName)
                .then(res => {
                    context.commit('verify', res.data)
                })

        },
        //注册
        ajax_register(context, data_register) {
            axios
                .post("/register", data_register)
                .then(res => {
                    context.commit('verify', res.data)
                })

        },
        buy(context) {
            // 真实环境应通过 ajax 提交购买请求后再清空购物列表
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve();
                }, 500)
            });
        }
    }
})