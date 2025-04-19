const { createApp } = Vue;

createApp({
    data() {
        return {
            currentTime: '',
            greetingKey: 'morning',
            messages: {
                'zh-CN': {
                    time: "当前时间是：",
                    greetings: {
                        midnight: "早点睡吧~熬夜对身体不好！",
                        morning: "早上好，祝你有美好的一天！",
                        AM: "上午好，中午准备吃什么？",
                        noon: "中午好，建议睡午觉来维持精力~",
                        afternoon: "下午好，夜晚转凉，注意温度变化哦！",
                        evening: "晚上好，早睡早起身体好~"
                    }
                }
            }
        };
    },
    computed: {
        titleDescWithHtml() {
            const desc = this.messages['zh-CN'].titleDesc;
            const addi = this.messages['zh-CN'].titleDescAddi;
            return `${desc}<br /><em>${addi}</em>`;
        },
        time() {
            return this.messages['zh-CN'].time;
        },
        greeting() {
            return this.messages['zh-CN'].greetings[this.greetingKey];
        }
    },
    methods: {
        updateTime() {
            const now = new Date();
            const hours = now.getHours();
            const pad = (n) => (n < 10 ? '0' + n : n);

            this.currentTime = `${pad(hours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

            if (hours < 5) this.greetingKey = 'midnight';
            else if (hours < 8) this.greetingKey = 'morning';
            else if (hours < 12) this.greetingKey = 'AM';
            else if (hours < 15) this.greetingKey = 'noon';
            else if (hours < 19) this.greetingKey = 'afternoon';
            else this.greetingKey = 'evening';
        }
    },
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000);
    }
}).mount('#app');
