<template>
  <div class="todo-header" >
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="publish"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>

<script setup lang="ts">

// 接收父组件传递的自定义事件
const emits = defineEmits<{ (event: "addTodo", thing: string): void }>()
// 
const publish = (e: Event) => {
  const thing = (e.target as HTMLInputElement).value.trim()
  // 如果输入框中为空则返回
  if (!thing) return
  // 否则调用addTodo
  emits("addTodo",thing)
}
</script>

<style scoped lang="scss">
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
