<template>
  <ul class="todo-main">
    <li
      v-for="(todo, index) in todoList"
      :key="todo.id"
      :class="{ active: mouseEnterIndex === index }"
      @mouseenter="mouseEnterIndex = index"
      @mouseleave="mouseEnterIndex = -1"
    >
      <label>
        <input
          type="checkbox"
          :checked="todo.done"
          @change="emits('changeSingle', index)"
        />
        <span>{{ todo.thing }}</span>
      </label>
      <button class="btn btn-danger" @click="emits('deleteSingle', index)">
        删除
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "List",
});
</script>

<script setup lang="ts">
import type { todoListType } from "../../App.vue";
import { ref } from "vue";

// 接收父组件App传递过来的props遍历数据
defineProps<{ todoList: todoListType }>();

// 接收自定义事件
const emits = defineEmits<{
  (event: "changeSingle", index: number): void;
  (event: "deleteSingle", index: number): void;
}>();

// 定义响应式数据 控制鼠标移入动态样式
const mouseEnterIndex = ref(-1);
</script>

<style scoped lang="scss">
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li.active {
  background-color: #ccc;
}
li.active button {
  display: block;
}
li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
