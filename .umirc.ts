import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/login", component: "Login", layout: false },
    { path: "/", component: "index" },
    { path: "/merchants", component: "MerchantList" },
    { path: "/profit-sharing", component: "SetProfitSharing" },
    { path: "/orders", component: "OrderManagement" },
    { path: "/work-records", component: "WorkRecords" },
    { path: "/reports", component: "Reports" },
    { path: "/workerList", component: "WorkerList" },
    { path: "/workerDetail", component: "WorkerDetail" },
    { path: "*", redirect: "/" },
  ],
  npmClient: 'yarn',
  plugins: [
    '@umijs/plugins/dist/model'
  ],
  model: {}
});
