import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Course from './views/Course'
import myCourse from './views/myCourse'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/Course',
      name: 'course',
      component: Course
    },
    {
      path: '/myCourse',
      name: 'myCourse',
      component: myCourse
    }
  ]
})
