import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Define your routes here
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        auth: false
      }
    },

    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        auth: false
      }
    },
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/tasks",
      name: "tasks",
      component: () => import("../views/Tasks/Tasks.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/tasks/edit/:id",
      name: "edit-task",
      component: () => import("../views/Tasks/Edit.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: "/tasks/create",
      name: "task-create",
      component: () => import("../views/Tasks/Create.vue"),
      meta: {
        auth: true
      }
    },
    {
      path:"/reports",
      name:"reports",
      component: () => import("../views/Reports/Index.vue"),
      meta: {
        auth: true
      }
    },
    
    
    {
      path: "/task-reports",
      name: "task-reports",
      component: () => import("../views/Reports/Index.vue"),
      meta: {
        auth: true
      }
    }
  ],
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("access_token");
  if (to.meta.auth && !isAuthenticated) {

    next({ name: "login" });
  } else {
    next();
  }
});

const currentUser = () => {
  return new Promise((resolve, reject) => {
    const token = JSON.parse(localStorage.getItem("access_Token"));
    resolve(token);
    reject;
  });
};




export default router;