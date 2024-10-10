<template>
	<div class="root">
		<div></div>
		<div ref="root" @click="copyCode" v-html="safeHTML(post)"></div>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const route = useRoute();
const postTitle = ref(route.params.title);
const post = ref(null);

const root = ref(null);

const safeHTML = (str) => {
	if (!str) {
		return;
	}
	marked.setOptions({
		renderer: new marked.Renderer(),
		pedantic: false,
		gfm: true,
		breaks: true,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		xhtml: false,
	});
	const target = marked(str);
	setTimeout(() => {
		highlightcode();
		const childElements = root.value.querySelectorAll('*');
		childElements.forEach((child) => {
			child.style.whiteSpace = 'pre-wrap';
		});
	}, 0);
	return target;
};

const highlightcode = () => {
	const blocks = root.value.querySelectorAll('pre code'); // 使用 refs 获取元素
	blocks.forEach((block) => {
		hljs.highlightElement(block); // 高亮每个代码块
	});
};

const copyCode = async (event) => {
	if (event.target.tagName === 'PRE') {
		const code = event.target.innerText;
		await navigator.clipboard.writeText(code);
	}
};

onMounted(() => {
	import(`@/posts/${postTitle.value}.md`).then((res) => {
		post.value = res.default;
	});
});
</script>

<style scoped>
:deep(pre) {
	display: block;
	background-color: #f4f4f4;
	border: 1px solid #ccc;
	padding: 10px;
	margin-bottom: 5px;
	position: relative;
	overflow: auto;
	pointer-events: none;
	white-space: pre-wrap;
	font-size: 20px !important;
}

:deep(pre::before) {
	content: '';
	background-image: url('https://img.icons8.com/?size=100&id=86206&format=png&color=000000');
	background-size: cover;
	display: block;
	width: 20px;
	height: 20px;
	position: absolute;
	z-index: 10;
	top: 3px;
	right: 3px;
	pointer-events: auto;
	/* 确保伪元素可以接收鼠标事件 */
}
</style>
