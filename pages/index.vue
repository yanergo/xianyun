<template>
    <div class="container">
        <!-- 轮播图 -->
        <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="(item, index) in banners" :key="index">
                <div class="banner_image" :style="`
                background:url(${$axios.defaults.baseURL + item.url}) center center no-repeat;
                bcakground-size:contain contain;`"></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            banners: []
        };
    },
    mounted() {
        this.$axios({
            url: "/scenics/banners"
        }).then(res => {
            const { data } = res.data;
            console.log(data);
            this.banners = data;
        });
    }
};
</script>

<style scoped lang="less">
.container{
    min-width: 1000px;
    margin: 0 auto;
    position: relative;

    /deep/ .el-carousel__container{
        height: 700px;
    }

    .banner_image{
        width: 100%;
        height: 100%;
    }
}
</style>