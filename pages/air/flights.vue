<template>
    <section class="contianer">
        <el-row type="flex" justify="space-between">
            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <FlightsFilters
                    :flightData="cacheFlightsData"
                    @setDataList="setDataList"
                />

                <!-- 航班头部布局 -->
                <FlightsListHead />

                <!-- 航班信息 -->
                <FlightsItem
                    v-for="(item, index) in dataList"
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
                    :total="total"
                    v-if="flightData.flights.length"
                >
                </el-pagination>

                <!-- 没有数据时显示的数据 -->
                <div
                    v-if="flightData.flights.length === 0 && !loading"
                    style="padding: 50px; text-align:center"
                >
                    该航班暂无数据
                </div>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
                <FlightsAside />
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";
export default {
    components: {
        FlightsListHead,
        FlightsItem,
        FlightsFilters,
        FlightsAside
    },
    data() {
        return {
            // 请求机票列表返回的总数据，包含了flights,info, options,total
            flightData: {
                flights: [],
                info: {},
                options: {}
            },
            pageIndex: 1,
            pageSize: 5,
            loading: true,
            total: 0,
            cacheFlightsData: {
                // 缓存一份数据，只会修改一次
                flights: [],
                info: {},
                options: {}
            }
        };
    },
    computed: {
        dataList() {
            const arr = this.flightData.flights.slice(
                (this.pageIndex - 1) * this.pageSize,
                this.pageIndex * this.pageSize
            );

            return arr;
        }
    },
    watch: {
        // 监听路由
        $route() {
            // 请求机票列表数据
            this.getList();
        }
    },
    methods: {
        getList() {
            this.$axios({
                url: "/airs",
                params: this.$route.query
            }).then(res => {
                console.log(res);
                const data = res.data;
                this.flightData = data;
                this.loading = false;
                this.total = this.flightData.total;
                // 缓存一份新的列表数据数据，这个列表不会被修改
                // 而flightsData会被修改
                this.cacheFlightsData = { ...data };
            });
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.pageIndex = 1;
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
        },
        setDataList(arr) {
            this.flightData.flights = arr;

            this.total = arr.length;
            this.pageIndex = 1;
        }
    },
    mounted() {
        this.getList();
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