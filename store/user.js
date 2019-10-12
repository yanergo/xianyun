// 用户管理
export const state = () =>{
    return {
        userInfo:{
            token:'',
            user:{}
        }
    };
}

export const mutations = {
    setUserInfo(state,data){
        state.userInfo = data;
    }
};

export const actions = {};