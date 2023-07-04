<template>
  <div class="todo-footer" >
    <label>
      <input type="checkbox" v-model="allComplete"/>
    </label>
    <span> <span>已完成{{completeNum}}</span> / 全部{{todoList.length}} </span>
    <button class="btn btn-danger">清除已完成任务</button>
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
import type { todoListType } from "../../App.vue";
// 接收todoList
const props = defineProps<{ todoList: todoListType }>();
// 接收方法
const emits = defineEmits<{(event:"allComplete",type:boolean):void}>()
// 计算属性计算已完成数量
const completeNum = computed(() => {
  return props.todoList.reduce((p, c)=>(c.done?p+1:p), 0);
});

// 计算属性控制全选按钮逻辑
const allComplete = computed({
  get() { 
    // 每个todo全部勾选则全选按钮勾选，有一个未勾选全选按钮不勾选 用every遍历
    return props.todoList.every((item)=>item.done)&&props.todoList.length!==0
  },
  set(newVal) {
    emits("allComplete",newVal)
  }
})


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
