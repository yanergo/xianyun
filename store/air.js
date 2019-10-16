export const state = () => {
    return {
        // 搜索的历史记录
        history: []
    }
}

export const mutations = {
    // 设置history的值，data是表单搜索表单的对象
    setHistory(state, data) {
        // 把最新记录添加到第一个
        state.history.unshift(data);
    }
}