<template>
    <div class="wrap" @mouseenter="stop" @mouseleave="animation">
        <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
            <img :src="myDb[nowIndex].src" v-if="show" key=1 />
            <img :src="myDb[nowIndex].src" v-else key=2 />
        </transition>
        <p>{{myDb[nowIndex].title}}</p>
        <ul>
            <li @click="tab(pre)">◀</li>
            <li :class="{on:index==nowIndex}" v-for="(item,index) in myDb" @click="tab(index)">{{index+1}}</li>
            <li @click="tab(next)">▶</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: "slider",
    data() {
        return {
            nowIndex: 0,
            timer: "",
            show: true,
            myDb: [
                {
                    src: require("./../img/1.jpg"),
                    title: "第一张图片"
                },
                {
                    src: require("./../img/2.jpg"),
                    title: "第二张图片"
                },
                {
                    src: require("./../img/3.jpg"),
                    title: "第三张图片"
                },
                {
                    src: require("./../img/4.jpg"),
                    title: "第四张图片"
                }
            ]
        };
    },
    computed: {
        pre() {
            return this.nowIndex == 0
                ? this.myDb.length - 1
                : this.nowIndex - 1;
        },
        next() {
            return this.nowIndex == this.myDb.length - 1
                ? 0
                : this.nowIndex + 1;
        }
    },
    methods: {
        tab(index) {
            this.nowIndex = index;
        },
        animation() {
            this.timer = setInterval(() => {
                this.tab(this.next);
                this.show = !this.show;
            }, 2000);
        },
        stop() {
            clearInterval(this.timer);
        },
        beforeEnter: function(el) {
            el.style.transform = "translate(611px,0)";
        },
        enter: function(el, done) {
            //dom实时更新
            el.offsetTop;
            el.style.transform = "translate(0,0)";
            el.style.transition = "all 1s ease";
            done();
        },
        leave: function(el, done) {
            el.style.transform = "translate(-611px,0)";
            el.style.transition = "all 1s ease";
            //延时调用
            setTimeout(() => {
                done();
            }, 2000);
        }
    },
    mounted() {
        this.animation();
    }
  
};
</script>
<style scoped>
.wrap {
    width: 100%;
    height: 589px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
}
.wrap ul {
    width: 145px;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
}
.wrap ul li {
    background-color: rgb(255, 104, 187);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    line-height: 20px;
    list-style: none;
    float: left;
    margin-right: 5px;
    text-align: center;
    cursor: pointer;
}
.wrap li:last-child {
    margin-right: 0;
}
.wrap  p {
    color: red;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
.wrap li.on {
    background-color: #f00;
}

img {
    display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
</style>
