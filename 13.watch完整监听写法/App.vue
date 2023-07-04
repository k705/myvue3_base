<template>
  <div>App</div>
  <p>person:{{ person }}</p>
  <p>count:{{ count }}</p>
  <button @click="changeCount">修改count</button>
  <button @click="changePerson1">修改Person1</button>
  <button @click="changePerson2">修改Person2</button>
  <Header/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<script setup lang="ts">
import { ref,watch } from "vue"
import Header from "./components/Header.vue"
interface personType {
  name: string;
  age?: number;
  sex: string;
  height?: number;
  score: {
    ch: number;
    math: number;
  };
  girlFri: string[];
}
const person = ref<personType>({
  name: "xiaowang",
  age: 18,
  sex: "nan",
  score: {
    ch: 100,
    math: 100,
  },
  girlFri: ["lily", "lucy"],
})

const count = ref(1);
const changeCount = () => {
  count.value++
}
const changePerson1 = () => {
  person.value.age = (person.value.age as number) + 1
  person.value.girlFri.push("xiaohua")
}

const changePerson2 = () => {
  person.value = {...person.value,height:180}
}
//1. 监听一个ref对象:可以监听ref对象value属性的改变(被替换)
watch(count, () => {
  console.log("count变了变了");
})

watch(person, () => {
  console.log("person变了变了");
});
//无法监听ref对象内部的代理对象内部的改变(需要深度监听)
watch(
  person,
  () => {
    console.log("person变了变了");
  },
  {
    deep: true,
  }
);

//2. 监听ref对象的value属性
//只能监听value被替换，如果要监听内部的属性需要深度监听
watch(
  () => person.value,
  () => {
    console.log("person.value变了变了吗");
  }
);
watch(
  () => count.value,
  () => {
    console.log("count.value变了变了");
  }
);


//如果监听的属性值是对象类型，则可以不写函数式写法，并且默认深度监听
// watch(person.value, () => {
//   console.log("person.value变了变了");
// });

//3. 监听ref对象中proxy代理对象的某个属性
watch(
  () => person.value.age,
  () => {
    console.log("age变了");
  }
);
watch(
  () => person.value.girlFri,
  () => {
    console.log("girlFri变了");
  },
  {
    deep: true,
  }
); 
</script>

<style  scoped lang="scss">
  
</style>