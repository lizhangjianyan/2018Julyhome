<template>
    <div class="login">
        <div class="login_form">
            <div class="login_navTabs">
                <div>
                    <a :class="{on:tabColor}" href="#" @click="tabLogin" id="formLogin">帐号登录</a>
                </div>
                <div>|</div>
                <div>
                    <a :class="{on:!tabColor}" href="#" @click="tabLogin">扫码登录</a>
                </div>
            </div>
            <keep-alive>
                <component :is="loginTab"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import codeLogin from "../components/codeLogin.vue";
import formLogin from "../components/formLogin.vue";
export default {
    beforeRouteEnter(to, from, next) {
       
        next(vm=>{
             vm.$store.commit("init", 1);
        });
    },
    data() {
        return {
            tabColor: true,
            loginTab: "formLogin"
        };
    },
    methods: {
        tabLogin(e) {
            if (e.target.id === "formLogin") {
                this.tabColor = true;
                this.loginTab = "formLogin";
            } else {
                this.tabColor = false;
                this.loginTab = "codeLogin";
            }
        }
    },
    components: {
        codeLogin,
        formLogin
    }
};
</script>


<style scoped lang="less">
.login {
    background: url(../img/background.jpg) no-repeat;
    background-position: -762px 0px;
    margin: 0 auto;
    width: 980px;
    height: 588px;
    position: relative;
    .login_form {
        position: absolute;
        top: 34px;
        left: 555px;
        width: 410px;
        height: 524px;
        background-color: #fff;
        .login_navTabs {
            width: 100%;
            padding: 27px 0 24px;
            font-size: 24px;
            color: #e0e0e0;
            .on {
                color: #f56600;
            }
            a {
                color: #666;
                text-decoration: none;
                &:hover {
                    color: #f56600;
                }
            }
            div:first-child {
                width: 49%;
                float: left;
                padding-left: 64px;
            }
            div:nth-child(2) {
                float: left;
                width: 2px;
            }
            div:last-child {
                padding-left: 44px;
                width: 49%;
                float: left;
            }
        }
    }
}
</style>
