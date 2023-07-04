import { createApp } from "vue";
import App from "./App.vue";

/* 
  createApp:创建一个应用实例
    - 提供了很多全局操作的方法(mixin,component,directive,mount,unmount)
    - 参数有两个
      1. 根组件
      2. 第二个参数可选，它是要传递给根组件的 props

*/
const app = createApp(App);
console.log(app);

/* 
  app.mount():将应用实例挂载在一个容器元素中

*/
app.mount("#app");
