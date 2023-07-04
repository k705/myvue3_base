<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="allComplete" />
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
// 获取数据类型
import { todoListType } from "../../App.vue";
// 获取计算属性
import { computed } from "vue";
// 获取数据
const props = defineProps<{ todoList: todoListType }>();
// 获取方法
const emits = defineEmits<{ (event: "allComplete", type: boolean): void;(event: "deleteAllComplete"): void }>();
// 通过计算属性获取已完成数量
const completeNum = computed(() => {
  return props.todoList.reduce((p, c) => (c.done ? p + 1 : p), 0);
});
// 全选框事件
const allComplete = computed({
  get() {
    return (
      props.todoList.every((item) => item.done) && props.todoList.length !== 0
    );
  },
  set(newVal: boolean) {
    emits("allComplete", newVal);
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
