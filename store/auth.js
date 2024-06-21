export const state = () =>({
    token : null,
    });
export const mutations = {
    saveToken(state, token) {
        state.token = token;
    },
   
}
export const getters = {
    getCounter(state){
        return state.token
    },
    
}

