<script setup>
import { ref, onMounted } from 'vue'
import { getListModels } from "../api/llm_models"
import { getKnowledgeBase } from "../api/knowledge_base"
import { chatchat } from "../api/chat"

defineProps({
  msg: String,
})

const count = ref(0)
const message = ref("你好")
const reqData = {
  controller_address: "http://120.133.83.144:20001",
  placeholder: "string"
};

const Sse = () => {
  console.log(message.value)
  const data = {
    query: message.value,
    history: [],
    model: 'Qwen-7B-Chat',
    stream: false,
    temperature: 0.7
  }
  chatchat(data)
}
const getModelsList = () => {
  getListModels(reqData).then(e => {
    const info = e.data.data;
    console.log(info)
  })
    .catch(err => {
      console.log(err)
    })
}

const getKnowledge = () => {
  getKnowledgeBase().then(e => {
    const info = e.data.data;
    console.log(info)
  })
    .catch(err => {
      console.log(err)
    })
}

onMounted(() => {
  getModelsList()
  getKnowledge()
  // Sse()
})

</script>

<template>
  <h1>{{ message }}</h1>

  <div class="card">
    <el-input v-model="message" placeholder="Please input" />
    <button type="button" @click="Sse">send</button>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
