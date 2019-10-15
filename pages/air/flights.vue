<template>
    <section class="contianer">
        <el-row type="flex" justify="space-between">
            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div></div>

                <!-- 航班头部布局 -->
                <FlightsListHead />

                <!-- 航班信息 -->
                <FlightsItem
                    v-for="(item, index) in flightData.flights"
                    :key="index"
                    :item="item"
                />

                <!-- 分页组件 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[3, 5, 8, 10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="flightData.total"
                >
                </el-pagination>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
export default {
    components: {
        FlightsListHead,
        FlightsItem
    },
    data() {
        return {
            // 请求机票列表返回的总数据，包含了flights,info, options,total
            flightData: {},
            pageIndex:1,
            pageSize:5,

        };
    },
    methods:{
        handleSizeChange(){},
        handleCurrentChange(){}
    },
    mounted() {
        this.$axios({
            url: "/airs",
            params: this.$route.query
        }).then(res => {
            console.log(res);
            const data = res.data;
            this.flightData = data;
        });
    }
};
</script>

<style scoped lang="less">
.contianer {
    width: 1000px;
    margin: 20px auto;
}

.flights-content {
    width: 745px;
    font-size: 14px;
}

.aside {
    width: 240px;
}
</style>