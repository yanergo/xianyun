<template>
    <el-form :model="form" :rules="rules" ref="form" class="form">
        <el-form-item class="form_item" prop="username">
            <el-input
                v-model="form.username"
                placeholder="用户名手机"
            ></el-input>
        </el-form-item>
        <el-form-item class="form_item" prop="captcha">
            <el-input placeholder="验证码" v-model="form.captcha">
                <el-button slot="append" @click="handleSendCaptcha"
                    >发送验证码</el-button
                >
            </el-input>
        </el-form-item>
        <el-form-item class="form_item" prop="nickname">
            <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
        </el-form-item>
        <el-form-item class="form_item" prop="password">
            <el-input
                type="password"
                v-model="form.password"
                placeholder="密码"
            ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input
                type="password"
                v-model="form.checkPass"
                autocomplete="off"
                placeholder="确认密码"
            ></el-input>
        </el-form-item>
        <el-button class="submit" type="primary" @click="submitRegisterForm()"
            >注册</el-button
        >
    </el-form>
</template>

<script>
export default {
    data() {
        // 确认密码的校验的方法
        // rule: 当前的规则，一般是用不上这个参数
        // value: 输入框的值
        // callback: 回调函数。该函数必须要调用，调用时候可以传递错误的对象信息
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                // new Error js原生的错误对象
                callback(new Error("请输入密码"));
            } else {
                if (this.form.checkPass !== "") {
                    this.$refs.form.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.form.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            form: {
                username: "",
                password: "",
                nickname: "",
                captcha: "",
                checkPass: ""
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    }
                ],
                captcha: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur"
                    }
                ],
                nickname: [
                    {
                        required: true,
                        message: "请输入昵称",
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        validator: validatePass,
                        trigger: "blur"
                    }
                ],
                checkPass: [
                    {
                        validator: validatePass2,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        // 获取验证码
        async handleSendCaptcha() {
            if (!this.form.username) {
                this.$confirm("手机号码不能为空", "提示", {
                    confirmButtonText: "确定",
                    showCancelButton: false,
                    type: "warning"
                });
                return;
            }
            if (this.form.username.length !== 11) {
                this.$confirm("手机号码长度应为11位", "提示", {
                    confirmButtonText: "确定",
                    showCancelButton: false,
                    type: "warning"
                });
                return;
            }

            const res = await this.$store.dispatch('user/sendCaptcha',this.form.username);
            const { code } = res.data;
            // 打印出手机验证码
            this.$message.success(`手机验证码为：${code}`);
        },
        // 注册
        submitRegisterForm() {
            this.$refs["form"].validate(async valid => {
                if (valid) {
                    // 注册提交
                    const { checkPass, ...props } = this.form;

                    const res = await this.$store.dispatch('user/register',props);

                    if (res.status == 200) {
                        this.$message.success("注册成功");

                        // 跳转到首页
                        this.$router.push("/");
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
    .submit {
        margin-top: 10px;
        width: 100%;
    }
}
</style>