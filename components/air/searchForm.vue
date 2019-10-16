<template>
    <div class="search_form">
        <!-- 头部tab切换 -->
        <el-row type="flex" justify="center" class="tabs">
            <span
                :class="{ active: currentTab === index }"
                v-for="(item, index) in tabs"
                :key="index"
                @click="handleChangeTab(index)"
            >
                <i :class="item.icon"></i>{{ item.name }}
            </span>
        </el-row>
        <el-form ref="form" class="search_form_content" label-width="80px">
            <el-form-item label="出发城市">
                <el-autocomplete
                    class="el-autocomplete"
                    v-model="form.departCity"
                    :fetch-suggestions="queryDepartSearch"
                    placeholder="请搜索出发城市"
                    @select="handleDepartSelect"
                    @blur="handleblur('depart')"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="到达城市">
                <el-autocomplete
                    class="el-autocomplete"
                    v-model="form.destCity"
                    :fetch-suggestions="queryDestSearch"
                    placeholder="请搜索到达城市"
                    @select="handleDestSelect"
                    @blur="handleblur('dest')"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <el-date-picker
                    v-model="form.departDate"
                    type="date"
                    placeholder="2019-04-30"
                    style="width: 100%;"
                    @change="handleDate"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button
                    style="width:100%;"
                    type="primary"
                    icon="el-icon-search"
                    @click="handleSubmit"
                >
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>
    </div>
</template>

<script>
import moment from "moment";
export default {
    data() {
        return {
            tabs: [
                { icon: "iconfont icondancheng", name: "单程" },
                { icon: "iconfont iconshuangxiang", name: "往返" }
            ],
            currentTab: 0,
            form: {
                departCity: "", // 出发城市
                departCode: "", // 出发城市代码
                destCity: "", // 到达城市
                destCode: "", // 到达城市代码
                departDate: "" // 日期字符串
            },
            cities: []
        };
    },
    methods: {
        handleChangeTab(index) {
            if (index === 1) {
                this.$alert("目前暂不支持往返，请使用单程选票！", "提示", {
                    confirmButtonText: "确定",
                    type: "warning"
                });
                return;
            }
            this.currentTab = index;
        },

        // 出发城市输入框值发生变化时候会触发[value由组件输入框自动获取，cb是组件提供的回调函数，传入数据下拉列表自动展示]
        // value：输入框的值
        // cb:回调函数，必须要调用，调用时候必须要传递一个数组的参数，
        // 数组中的元素必须是一个对象，对象中必须要有value属性

        // 目标城市输入框获得焦点时触发
        // value 是选中的值，cb是回调函数，接收要展示的列表
        queryDepartSearch(value, cb) {
            if (!value) {
                // 不显示下拉框[数据列表置空]
                cb([]);
                return;
            }
            // 请求搜索建议城市数据
            this.$axios({
                // 接口后拼接输入框内容，会自动返回包含该内容的数据
                url: "/airs/city?name=" + value
            }).then(res => {
                const { data } = res.data;
                // 给每一项添加value属性[去除“市”的城市名]
                const newData = data.map(v => {
                    v.value = v.name.replace("市", "");
                    return v;
                });
                // 保存到data中
                this.cities = newData;

                // 展示到下拉列表中
                cb(newData);
            });
        },

        // 出发城市下拉选择时触发
        handleDepartSelect(item) {
            this.form.departCity = item.value;
            this.form.departCode = item.sort;
        },

        queryDestSearch(value, cb) {
            this.queryDepartSearch(value, cb);
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            // 参考组件提供的案例，提供了一个参数item，自行打印看看item里有什么
            // console.log(item);
            this.form.destCity = item.value;
            this.form.destCode = item.sort;
        },

        // 触发和目标城市切换时触发
        handleReverse() {
            const { departCity, departCode, destCity, destCode } = this.form;
            this.form.departCity = destCity;
            this.form.departCode = destCode;
            this.form.destCity = departCity;
            this.form.destCode = departCode;
        },

        // 确认选择日期时触发
        handleDate(value) {
            this.form.departDate = moment(value).format("YYYY-MM-DD");
        },

        // 提交表单时触发
        handleSubmit() {
            // 自定义验证，减少对组件的依赖
            const rules = {
                // message是错误的信息， value是对应表单中的值
                departCity: {
                    message: "请输入出发城市",
                    value: this.form.departCity
                },
                destCity: {
                    message: "请输入到达城市",
                    value: this.form.destCity
                },
                departDate: {
                    message: "请输入出发时间",
                    value: this.form.departDate
                }
            };

            let valid = true;
            // 循环rules对象，判断对象属性的value是否为空，是就打印message错误信息
            Object.keys(rules).forEach(v => {
                // 只要一次验证不通过，后面就不再执行
                if (!valid) return;
                const { message, value } = rules[v];
                if (!value) {
                    this.$message.error(message);
                    // 验证不通过
                    valid = false;
                }
            });

            if (!valid) return;
            // 将参数拼接到路径
            this.$router.push({ path: "/air/flights", query: this.form });
            this.$store.commit('air/setHistory',this.form);
        },

        // 输入城市搜索框失去焦点触发，默认选中城市列表中第一个
        handleblur(type) {
            if (this.cities.length === 0) return;
            // 用对象的另一种属性调用方式，方便拼接数据
            this.form[type + "City"] = this.cities[0].value;
            this.form[type + "Code"] = this.cities[0].sort;
        }
    }
};
</script>

<style scoped lang="less">
.search_form {
    width: 360px;
    height: 350px;
    border: 1px solid #ddd;
    border-top: none;
    box-sizing: border-box;

    .tabs {
        span {
            display: block;
            flex: 1;
            height: 48px;
            box-sizing: border-box;
            border-top: 3px #eee solid;
            background: #eee;
            line-height: 42px;
            text-align: center;
            cursor: pointer;
            &.active {
                border-top-color: orange;
                background: #fff;
            }
            i {
                margin-right: 5px;
                font-size: 18px;
                &:first-child {
                    font-size: 16px;
                }
            }
        }
    }

    .search_form_content {
        padding: 15px 50px 15px 15px;
        position: relative;
        .el-autocomplete {
            width: 100%;
        }
    }
    .reverse {
        position: absolute;
        top: 35px;
        right: 15px;
        &:after,
        &:before {
            display: block;
            content: "";
            position: absolute;
            left: -35px;
            width: 25px;
            height: 1px;
            background: #ccc;
        }
        &:after {
            top: 0;
        }
        &:before {
            top: 60px;
        }
        span {
            display: block;
            position: absolute;
            top: 20px;
            right: 0;
            font-size: 12px;
            background: #999;
            color: #fff;
            width: 20px;
            height: 20px;
            line-height: 18px;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;
            &:after,
            &:before {
                display: block;
                content: "";
                position: absolute;
                left: 10px;
                width: 1px;
                height: 20px;
                background: #ccc;
            }
            &:after {
                top: -20px;
            }
            &:before {
                top: 20px;
            }
        }
    }
}
</style>