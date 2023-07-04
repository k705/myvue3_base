<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="allComplete"/>
    </label>
    <span>
      <span>已完成{{ completeNum }}</span> / 全部{{ todoList.length }}
    </span>
    <button class="btn btn-danger" @click="emits('deleteAllComplete')">清除已完成任务</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<script setup lang="ts">
import { computed } from "vue";
// 引入数据类型
import { todoListType } from "../../App.vue";
// 引入数据
const props = defineProps<{ todoList: todoListType }>();
// 引入事件
const emits = defineEmits<{
  (event: "allComplete", type: boolean): void;
  (event:"deleteAllComplete"):void}>()
// 定义计算属性
const completeNum = computed(() => {
  return props.todoList.reduce((p, c) => (c.done ? p + 1 : p), 0);
});
// 定义全选框事件
const allComplete = computed({
  get() {
    // 所有todolist都为done则全选框为done
    return props.todoList.every(item=>item.done) && props.todoList.length !==0
  },
  set(newVal) {
    emits("allComplete",newVal)
  },
});
</script>

<style scoped lang="scss">
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
