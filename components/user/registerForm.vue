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
                <el-button slot="append" @click="handleSendCaptcha">发送验证码</el-button>
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
        var validatePass = (rule, value, callback) => {
            if (value === "") {
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
    methods:{
        handleSendCaptcha(){},
        submitRegisterForm(){}
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