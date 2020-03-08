import Vue from 'vue'
import VueRouter from 'vue-router'
import CreatorView from '../views/CreatorView.vue'
import RollerView from '../views/RollerView.vue'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/', component: CreatorView },
        { path: '/:id', component: RollerView, props: true }
    ]
});