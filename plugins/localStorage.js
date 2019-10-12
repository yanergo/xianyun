import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store,可以不写默认读取到store
        })(store)
    })
}