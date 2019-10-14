<template>
    <el-form :model="form" :rules="rules" ref="form" class="form">
        <el-form-item class="form_item" prop="username">
            <el-input
                v-model="form.username"
                placeholder="用户名/手机"
            ></el-input>
        </el-form-item>
        <el-form-item class="form_item" prop="password">
            <el-input
                type="password"
                v-model="form.password"
                placeholder="密码"
            ></el-input>
        </el-form-item>
        <p class="form_text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button class="submit" type="primary" @click="submitLoginForm()"
        @keyup.enter="submitLoginForm()"
            >登录</el-button
        >
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            // 表单数据
            form: {
                username: "",
                password: ""
            },
            // 表单规则
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submitLoginForm() {
            this.$refs.form.validate(async valid => {
                // valid是表单验证的结果
                if (valid) {
                    // this.$store.dispath用于调运actions的方法
                    const res = await this.$store.dispatch('user/login',this.form);
                    if(res.status === 200){
                        this.$message.success('登陆成功');
                        this.$router.push('/');
                    }

                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.form {
    padding: 25px;
    .form_item {
        margin-bottom: 20px;
    }
    .form_text {
        font-size: 12px;
        color: #409eff;
        text-align: right;
        line-height: 1;
    }
    .submit {
        margin-top: 10px;
        width: 100%;
    }
}
</style>