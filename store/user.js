// 用户管理
export const state = () => {
    return {
        userInfo: {
            token: '',
            user: {}
        }
    };
}

export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data;
    }
};

export const actions = {
    async login(store, data) {
        //提交登录接口
        var res = await this.$axios({
            url: "/accounts/login",
            method: "POST",
            data
        });

        if (res.status === 200) {
            // 把用户信息保存到本地
            store.commit("setUserInfo", res.data);
        }

        return res;
    },

    async register(store, data) {
        //提交注册接口
        var res = await this.$axios({
            url: "/accounts/register",
            method: "POST",
            data
        });

        if (res.status == 200) {
            // 把用户信息保存到本地
            store.commit("setUserInfo", res.data);
        }

        return res;
    },

    // 发送手机验证码, tel是传入的手机号码
    async sendCaptcha(store,tel){
        var res = await this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                tel
            }
        });

        return res;
    }
};