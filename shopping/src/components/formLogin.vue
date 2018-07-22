<template>
    <div class="formLogin">
        <div class="user"><input type="text" placeholder="邮箱/手机号码" v-model="username" @input="reset"></div>
        <div class="psw"><input type="password" placeholder="密码" v-model="password" @input="reset"></div>
        <div class="warning clearfix" v-show="showMsg">
            <em></em>
            <span>{{warningMsg}}</span>
        </div>
        <div class="entry"><input type="button" value="登陆" @click="enter"></div>
        <p class="active">手机短信登录/注册</p>
        <p class="forget">立即注册| 忘记密码？</p>
        <div class="otherWay">
            <fieldset>
                <legend>其他方式登录</legend>
            </fieldset>
            <ul>
                <li>
                    <i></i>
                </li>
                <li>
                    <i></i>
                </li>
                <li>
                    <i></i>
                </li>
                <li>
                    <i></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            Msg: "",
            showMsg: false
        };
    },
    computed: {
        warningMsg() {
            if (this.$store.state.userInformation.msg&&this.Msg) {
                this.showMsg = true;
            }
            return this.Msg + this.$store.state.userInformation.msg;
        }
    },
    methods: {
        enter() {
            if (this.username === "") {
                this.showMsg = true;
                this.Msg = "请输入账号";
                
            } else if (this.password === "") {
                this.Msg = "请输入密码";
                this.showMsg = true;
            } else {
                this.Msg=' ';
                this.$store.dispatch("ajax_user", {
                    username: this.username,
                    password: this.password
                });
            }
        },
        reset() {
            if (!this.showMsg) return;
            this.showMsg = false;
            this.$store.commit("init");
            this.Msg = "";
        }
    }
};
</script>


<style scoped lang="less">
.formLogin {
    width: 100%;
    position: relative;
    .user {
        width: 100%;
        margin-top: 45px;
        padding: 0 32px;
    }
    .psw {
        width: 100%;
        margin: 14px 0;
        padding: 0 32px;
    }
    input {
        width: 100%;
        padding-left: 12px;
        outline: none;
        height: 50px;
    }
    .warning {
        width: 100%;
        padding: 0 32px;
        color: #f56600;
        em {
            width: 18px;
            height: 18px;
            background: url(../img/warning.png) no-repeat;
            display: inline-block;
            vertical-align: middle;
        }
    }
    .entry {
        width: 100%;

        padding: 0 32px;
        margin-bottom: 2px;
        input {
            color: #fff;
            font-size: 14px;
            background-color: #ef5b00;
            border: none;
            height: 50px;
            &:hover {
                cursor: pointer;
            }
        }
    }
    p.active {
        width: 50%;
        padding: 0 32px;
        float: left;
        color: #ef5b00;
    }
    p.forget {
        width: 50%;
        padding: 0 32px;
        float: right;
    }
    .otherWay {
        position: absolute;
        top: 333px;
        left: 32px;
        width: 348px;
        fieldset {
            border-top: 1px solid #b0b0b0;
            text-align: center;
            color: #666;
        }
        legend {
            color: #666;
        }
        ul {
            width: 100%;
            padding: 10px 86px;
            display: flex;
            justify-content: space-between;

            li {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: rgb(116, 116, 116);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            li:nth-child(1) {
                i {
                    width: 18px;
                    height: 18px;
                    display: block;
                    background: url(../img/icons.png) no-repeat;
                    background-position: -19px 0;
                }
            }
            li:nth-child(2) {
                i {
                    width: 18px;
                    height: 18px;
                    display: block;
                    background: url(../img/icons.png) no-repeat;
                    background-position: -38px 0;
                }
            }
            li:nth-child(3) {
                i {
                    width: 22px;
                    height: 22px;
                    display: block;
                    background: url(../img/icons.png) no-repeat;
                    background-position: -57px 0;
                }
            }
            li:nth-child(4) {
                i {
                    width: 24px;
                    height: 24px;
                    display: block;
                    background: url(../img/icons.png) no-repeat;
                    background-position: -83px 0;
                }
            }
        }
    }
}
</style>
