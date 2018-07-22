<template>
  <div id="app">
    <div class="headerBackground">
      <div class="app_header">
        <div class="app_headerLeft">
          <span>
            <router-link :to="{path:'/'}">电商shopping实例</router-link>
          </span>
        </div>
        <div class="app_headerRight">
          <span v-show="show">
            <router-link :to="{path:'/login'}">登入</router-link>
            ｜
            <router-link :to="{path:'/register'}">注册</router-link>
          </span>
          <span v-show="!show">{{buyerName}} |
            <a href="#" @click="exit">退出</a>
          </span>
          ｜
          <span>
            <router-link :to="{path:'/cart'}">购物车<strong v-if="cartList.length">{{cartList.length}}</strong></router-link>
          </span>
        </div>
      </div>
    </div>
    <router-view/>
    <div class="app_footer">
      <dl>
        <dt>帮助中心</dt>

        <dd>
          <a href="#" target="_blank">账户管理</a>
        </dd>

        <dd>
          <a href="#" target="_blank">购物指南</a>
        </dd>

        <dd>
          <a href="#" target="_blank">订单操作</a>
        </dd>

      </dl>
      <dl>
        <dt>服务支持</dt>

        <dd>
          <a href="#" target="_blank">售后政策</a>
        </dd>

        <dd>
          <a href="#" target="_blank">自助服务</a>
        </dd>

        <dd>
          <a href="#" target="_blank">相关下载</a>
        </dd>

      </dl>
      <dl>
        <dt>线下门店</dt>

        <dd>
          <a href="#" target="_blank">小米之家</a>
        </dd>

        <dd>
          <a href="#" target="_blank">服务网点</a>
        </dd>

        <dd>
          <a href="#" target="_blank">授权体验店</a>
        </dd>

      </dl>
      <dl>
        <dt>关于小米</dt>

        <dd>
          <a href="#" target="_blank">了解小米</a>
        </dd>

        <dd>
          <a href="#" target="_blank">加入小米</a>
        </dd>

        <dd>
          <a href="#" target="_blank">投资者关系</a>
        </dd>

      </dl>
      <dl>
        <dt>关注我们</dt>

        <dd>
          <a href="#" target="_blank">新浪微博</a>
        </dd>

        <dd>
          <a href="#">官方微信</a>
        </dd>

        <dd>
          <a href="#" target="_blank">联系我们</a>
        </dd>

      </dl>
      <dl>
        <dt>特色服务</dt>

        <dd>
          <a href="#" target="_blank">F 码通道</a>
        </dd>

        <dd>
          <a href="#" target="_blank">礼物码</a>
        </dd>

        <dd>
          <a href="#" target="_blank">防伪查询</a>
        </dd>

      </dl>
      <div>
        <p class="phone">400-100-5678</p>
        <p>
          周一至周日 8:00-18:00<br>（仅收市话费）
        </p>
        <a href="#" target="_blank" class="btn btn-info">
          <i></i> 联系客服</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            show: true
        };
    },
    computed: {
        buyerName() {
            if (this.$store.state.userInformation.name) {
                this.show = false;
                this.$router.push({ path: "/" });
            }
            return this.$store.state.userInformation.name;
        },
        cartList(){
          return this.$store.state.cartList;
        }
    },
    methods: {
        exit() {
            this.show = true;
            this.$store.commit("init");
        }
        
    }
};
</script>

<style lang='less'>
#app {
    color: #b0b0b0;
    font-size: 14px;
    line-height: 40px;
    background-color: rgb(249,249,249);
    .headerBackground {
        height: 40px;
        background-color: #333;
        .app_header {
            width: 980px;
            margin: 0 auto;
            overflow: hidden;
            .app_headerLeft {
                float: left;
                a {
                    color: #b0b0b0;
                    text-decoration: none;
                }
            }
            .app_headerRight {
                float: right;
                a {
                    color: #b0b0b0;
                    text-decoration: none;
                }
                strong{
                  margin-left: 3px;
                  color: red;
                }
            }
        }
    }
    .app_footer {
        width: 980px;
        margin: 0 auto;
        border-top: 1px solid #e0e0e0;
        padding-top: 40px;
        display: flex;
        dl {
            flex: 1;
            dd {
                font-size: 12px;
                line-height: 30px;
                a {
                    color: #b0b0b0;
                }
            }
            dt {
                color: #424242;
                margin-bottom: 10px;
            }
        }
        div {
            flex: 2;
            border-left: 1px solid #e0e0e0;
            p.phone {
                margin: 0 0 5px;
                font-size: 22px;
                line-height: 1;
                color: #ff6700;
            }
            p:nth-child(2) {
                margin: 0 0 16px;
                font-size: 12px;
                line-height: 18px;
            }
            p {
                text-align: center;
            }
            a {
                color: #ff6700;
                margin-left: 80px;
            }
        }
    }
}
</style>
