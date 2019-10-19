<template>
    <div class="filters">
        <el-row
            type="flex"
            class="filters-top"
            justify="space-between"
            align="middle"
        >
            <el-col :span="8">
                单程： {{ flightData.info.departCity }} -
                {{ flightData.info.destCity }} /
                {{ flightData.info.departDate }}
            </el-col>
            <el-col :span="4">
                <el-select
                    size="mini"
                    v-model="filters.airport"
                    placeholder="起飞机场"
                >
                    <el-option
                        v-for="(item, index) in flightData.options.airport"
                        :key="index"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select
                    size="mini"
                    v-model="filters.flightTimes"
                    placeholder="起飞时间"
                >
                    <el-option
                        v-for="(item, index) in flightData.options.flightTimes"
                        :key="index"
                        :label="
                            `${
                                item.from < 10 ? '0' + item.from : item.from
                            }:00 - ${item.to < 10 ? '0' + item.to : item.to}:00`
                        "
                        :value="`${item.from}, ${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select
                    size="mini"
                    v-model="filters.company"
                    placeholder="航空公司"
                >
                    <el-option
                        v-for="(item, index) in flightData.options.company"
                        :key="index"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select
                    size="mini"
                    v-model="filters.airSize"
                    placeholder="机型"
                >
                    <el-option
                        v-for="(item, index) in sizeOptions"
                        :key="index"
                        :label="item.name"
                        :value="item.size"
                    >
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button
                type="primary"
                round
                plain
                size="mini"
                @click="handleFiltersCancel"
            >
                撤销
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        flightData: {
            // 声明类型
            type: Object,
            // 默认为空对象，不传值时
            default: {}
        }
    },
    data() {
        return {
            filters:{
                airport: "", // 机场
                flightTimes: "", // 出发时间
                company: "", // 航空公司
                airSize: "", // 机型大小
            },
            sizeOptions: [
                { name: "大", size: "L" },
                { name: "中", size: "M" },
                { name: "小", size: "S" }
            ]
        };
    },
    watch:{
        filters:{
            deep:true,
            handler(){
                var arr = this.flightData.flights.filter(v=>{
                    // 先假设所有航班数据都符合筛选条件，再根据条件排除不符合条件的数据，将vaild改为false
                    let vaild = true;

                    if(this.filters.company && this.filters.company !== v.airline_name){
                        vaild = false;
                    }

                    if(this.filters.flightTimes){
                        let time = this.filters.flightTimes.split(',');
                        let start = v.dep_time.split(':')[0];
                        if(start < +time[0] || start >= +time[1]){
                            vaild = false;
                        }
                    }
                    
                    if(this.filters.airport && this.filters.airport !== v.org_airport_name){
                        vaild = false;
                    }

                    if(this.filters.airSize && this.filters.airSize !== v.plane_size){
                        vaild = false;
                    }

                    return vaild;
                });

                this.$emit('setDataList',arr);
            }
        }
    },
    methods: {
       
        // 撤销条件时候触发
        handleFiltersCancel() {
            this.filters.airport='';
            this.filters.flightTimes='';
            this.filters.company='';
            this.filters.airSize='';
            this.$emit('setDataList',this.flightData.flights);
        }
    },
    mounted() {}
};
</script>

<style scoped lang="less">
.filters {
    margin-bottom: 20px;
}

.filters-top {
    > div {
        /deep/ .el-select {
            margin-left: 10px;
        }
    }
}

.filter-cancel {
    margin-top: 10px;
}
</style>