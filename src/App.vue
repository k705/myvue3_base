<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header @addTodo="addTodo" />
      <List
        :todoList="todoList"
        @changeSingle="changeSingle"
        @deleteSingle="deleteSingle"
      />
      <Footer :todoList="todoList" @allComplete="allComplete" @deleteAllComplete="deleteAllComplete"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import { nanoid } from "nanoid";
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
import List from "./components/List/index.vue";
// 定义todo的数据类型
export interface todoType {
  id: string;
  thing: string;
  done: boolean;
}
export type todoListType = todoType[];

// 定义todo数据
const todoList = ref<todoListType>([
  { id: nanoid(), thing: "study", done: false },
  { id: nanoid(), thing: "sing", done: false },
  { id: nanoid(), thing: "eat", done: false },
]);

// 自定义事件定义list组件修改单个状态
const changeSingle = (index: number) => {
  todoList.value[index].done = !todoList.value[index].done;
};
//定义list组件删除单个 自定义事件的回调函数
const deleteSingle = (index: number) => {
  todoList.value.splice(index, 1);
};

// 定义Header组件input框输入
const addTodo = (thing: string) => {
  const newTodo = { id: nanoid(), thing, done: false };
  todoList.value.unshift(newTodo);
};

// 全选按钮
const allComplete = (type: boolean) => {
  todoList.value.forEach((item) => (item.done = type));
};
// deleteAllComplete删除已完成
const deleteAllComplete = () => {
  todoList.value =  todoList.value.filter(item=>!item.done)
}
</script>

<style lang="scss">
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
