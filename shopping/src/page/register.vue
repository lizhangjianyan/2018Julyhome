<template>
    <div class="register">
        <div class="layouy">
            <h4>注册帐号</h4>
            <div class="context">
                <p>用户名:</p>
                <div class="inputUsername">
                    <input type="text" placeholder="输入账号名" v-model="username" @input="reset" @blur="verify" />
                </div>
                <p>密码:</p>
                <div class="inputPassword">
                    <input type="password" placeholder="设置密码" v-model="password" @input="reset" @blur="verify" />
                </div>
                <p>姓名:</p>
                <div class="inputName">
                    <input type="text" placeholder="输入你的姓名" v-model="name" @input="reset" @blur="verify" />
                </div>
                <p class="msg" v-show='showMsg'>{{warningMsg}}</p>
                <div class="inputButton">
                    <input type="button" value="注册" @click="submit" :disabled="disabled" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
         next(vm=>{
             vm.$store.commit("init", 1);
        });
    },
    data() {
        return {
            username: "",
            password: "",
            name: "",
            Msg: "",
            showMsg: false,
            disabled: false
        };
    },
    computed: {
        warningMsg() {
            if (
                this.$store.state.userInformation.msg === "用户名已存在" ||
                this.$store.state.userInformation.msg === "注册成功"
            ) {
                this.disabled = true;
            } else {
                this.disabled = false;
            }
            this.showMsg = true;
            return this.$store.state.userInformation.msg + "   " + this.Msg;
        }
    },
    methods: {
        submit() {
            if (!this.username) {
                this.Msg = "用户名不能为空";
                this.showMsg = true;
                return;
            } else if (!this.password) {
                this.Msg = "密码不能为空";
                this.showMsg = true;
                return;
            } else if (!this.name) {
                this.Msg = "姓名不能为空";
                this.showMsg = true;
                return;
            } else {
                this.$store.dispatch("ajax_register", {
                    username: this.username,
                    password: this.password,
                    name: this.name
                });
            }
        },
        reset() {
            if (!this.showMsg) return;
            this.showMsg = false;
            this.Msg = "";
            this.$store.commit("init");
        },
        verify() {
            if (!this.username) return;
            this.$store.dispatch("ajax_verifyUsername", {
                username: this.username
            });
        }
    }
};
</script>


<style scoped lang="less">
.register {
    position: relative;
    width: 854px;
    height: 638px;
    margin: 0 auto;

    .layouy {
        width: 100%;
        height: 100%;
        padding: 88px 34px 0px 34px;
        h4 {
            font-size: 30px;
            color: #333;
            text-align: center;
        }
        .context {
            width: 332px;
            margin: 0 auto;
            p {
                color: #333;
                font-size: 16px;
            }
            input {
                width: 332px;
                height: 42px;
                padding-left: 10px;
            }
            p.msg {
                position: absolute;
                top: 374px;
                color: red;
            }
            .inputButton {
                margin-top: 42px;
            }
        }
    }
}
</style>