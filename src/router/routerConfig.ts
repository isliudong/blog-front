import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import HelloWorld from "../components/main/Top.vue";
import Home from "../views/Home.vue";
import LoginOrRegister from "../views/login/LoginOrRegister.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/auth2/login/:platform",
        component: () => import("../components/nav/OauthLogin.vue")
    }
    ,
    {
        path: "/login",
        name: "login",
        component: LoginOrRegister
    },
    {
        path: "/helloWorld",
        name: "HelloWorld",
        component: HelloWorld,
    },
    {
        path: "/writeArticle",
        name: "writeArticle",
        component: () => import("../views/WriteArticle.vue"),
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("../components/person/profile/profile.vue"),
    },
    {
        path: "/articles",
        name: "articles",
        redirect: "/articles/list",
        component: () => import("../views/Articles.vue"),
        children: [
            {
                path: 'list',
                component: () => import("../components/main/articles.vue"),
            },
            {
                path: 'follow',
                component: () => import("../components/main/Follow.vue"),
            },
            {
                path: 'recommend',
                component: () => import("../components/main/Recommend.vue"),
            },
            {
                path: 'top',
                component: () => import("../components/main/Top.vue"),
            }
        ]
    },
    {
        path: "/archive",
        name: "archive",
        component: () =>
            import(/* webpackChunkName: "archive" */ "../views/Archive.vue")
    },
    {
        path: "/personCenter",
        name: "personCenter",
        redirect: "/personCenter/articles",
        component: () =>
            import(/* webpackChunkName: "timeline" */ "../views/PersonCenter.vue"),
        children: [
            {
                path: 'articles',
                component: () => import("../components/person/Articles.vue"),
            },
            {
                path: 'self',
                component: () => import("../components/person/Self.vue"),
            },
            {
                path: 'new',
                component: () => import("../components/person/new.vue"),
            }
        ]
    },
    {
        path: "/project",
        name: "project",
        component: () =>
            import(/* webpackChunkName: "project" */ "../views/Project.vue")
    },
    {
        path: "/message",
        name: "message",
        component: () =>
            import(/* webpackChunkName: "message" */ "../views/Message.vue")
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/ArticleDetail.vue")
    },
    {
        path: "/articles/:id",
        name: "articleDetail",
        component: () =>
            import(/* webpackChunkName: "articleDetail" */ "../views/ArticleDetail.vue")
    },
    {
        path: "/edit/articles",
        name: "articleEdit",
        meta: {
            title: "编辑文章"
        },
        component: () =>
            import(/* webpackChunkName: "articleDetail" */ "../components/common/editer/MdEditor.vue")
    },
    {
        path: "/person/center",
        meta: {
            //keepAlive: true
        },
        name: "center",
        component: () =>
            import(/* webpackChunkName: "articleDetail" */ "../views/PersonCenter.vue")
    },
    {
        path: "/b",
        name: "b",
        component: () =>
            import(/* webpackChunkName: "articleDetail" */ "../test/B.vue")
    }
];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
