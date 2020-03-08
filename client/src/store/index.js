import Vue from 'vue'
import Vuex from 'vuex'
import creatorModule from './creator'

Vue.use(Vuex)

const rollerModule = {
    state: {

    },
    mutations: {

    },
    actions: {

    }
}

export default new Vuex.Store({
    modules: {
        creator: creatorModule,
        roller: rollerModule
    }
})
