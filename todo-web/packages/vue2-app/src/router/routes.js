import Layout from "@/layout";

export const routes = [
  {
    path: "/",
    redirect: "/todolist",
  },
  {
    path: "/todolist",
    name: "todolist",
    redirect: "/todolist/list",
    component: Layout,
    children: [
      {
        path: "list",
        name: "list",
        component: () => import("@/views/todolist/index.vue"),
      },
    ],
  },
];
