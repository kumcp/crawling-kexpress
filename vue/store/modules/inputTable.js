const state = {
    groups =[],
    groupNum = 0
}


const getters = {
    getKeywordsFromGroup: (state, groupName) => {
        let group = state.groups.find(({ name }) => groupName === name)
        return group.keywords
    }
}

const actions = {
    callAPI: ({ commit, state }, groups) => {
        serverApi.request(groups,
            () => commit('REQUEST_SUCCESS'),
            () => commit('REQUEST_FAILED',groups)
        )
    }
}

const mutations = {
    REQUEST_SUCCESS(state) {
        console.log('REQUEST_SUCCESS')
    },

    REQUEST_FAILED(state,groups){
        console.log('REQUEST_FAILED')
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}