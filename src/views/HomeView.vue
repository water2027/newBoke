<template>
	<div
		class="root"
		@scroll="handleScroll"
		ref="scrollContainer"
	>
		<div
			v-for="post in posts"
			:key="post.id"
			class="post"
		>
			<div class="post-title">{{ post.title }}</div>
			<div class="post-date">
				发表于{{ post.date }}|分类于{{ post.tag }}
			</div>
			<div class="post-des">{{ post.description }}</div>
			<router-link
				class="post-link"
				:to="`/post/${post.title}`"
				>阅读全文</router-link
			>
			<hr />
		</div>
		<div v-if="loading">Loading...</div>
		<div
			v-else-if="!(loading || noMore)"
			@click="loadPosts"
			class="load-more"
		>
			more
		</div>
		<div v-if="noMore">No more</div>
	</div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';

const blog = inject('blog');
const posts = ref([]);
const loading = ref(false);
const noMore = ref(false);
const scrollContainer = ref(null);
const currentIndex = ref(0);

const loadPosts = () => {
	const newPosts = blog.value.posts.slice(
		currentIndex.value,
		currentIndex.value + 5
	);
	console.log(currentIndex.value);
	console.log(blog.value.posts.length);
	console.log(newPosts);
	if (newPosts.length > 0) {
		posts.value.push(...newPosts);
		currentIndex.value += 5;
	} else {
		noMore.value = true;
	}
	if (currentIndex.value >= blog.value.posts.length) {
		noMore.value = true;
	}
};

onMounted(() => {
	loadPosts();
});
</script>

<style scoped>
.root {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: auto;
	margin-top: 0;
}
.post {
	width: 60%;
	margin: 20px 0;
	margin-top: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-left: auto;
	margin-right: auto;
	z-index: 100;
	transition: all 0.5s;
	animation: fadeIn 1s;
}
@keyframes fadeIn {
	from {
		transform: translateX(-50%);
		opacity: 0;
	}
	to {
		transform: translateX(0);
		opacity: 1;
	}
}
.post:nth-child(1) {
	animation-delay: 0;
}
.post:nth-child(2) {
	animation-delay: 0.1s;
}
.post:nth-child(3) {
	animation-delay: 0.2s;
}
.post:nth-child(4) {
	animation-delay: 0.3s;
}
.post:nth-child(5) {
	animation-delay: 0.4s;
}
.post:nth-child(1) {
	margin-top: 0;
}
.post-link {
	/* 去掉原本的样式 */
	text-decoration: none;
	display: block;
	background-color: #000000;
	color: #ffffff;
	margin-top: 25px;
	margin-bottom: 25px;
	padding: 3%;
	padding-top: 15px;
	padding-bottom: 15px;
	color: white;
	border-radius: 5px;
	transition: all 0.3s;
}
.post-link:hover {
	background-color: #ffffff8f;
	color: #000000;
	border: black 2px solid;
}
hr {
	width: 50%;
	border: 1px solid #4d4d4d61;
}
.load-more{
	display: block;
	pointer-events: all;
	background-color: #333;
	color: #f1f1f1;
	margin-top: 25px;
	margin-bottom: 25px;
	padding: 15px;
	color: white;
	border-radius: 5px;
	transition: all 0.5s;
}
.load-more:hover {
	background-color: #f1f1f18f;
	color: #333;
}
</style>
