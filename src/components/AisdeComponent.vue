<template>
	<div
		class="root"
		:style="{ width: props.width }"
	>
		<div v-if="!postShow">
			<h2>water</h2>
			<div class="blog-data">
				<div>
					<span class="num">{{ postsData.postsNum }}</span
					><br /><span>日志</span>
				</div>
				<div>
					<span class="num">{{ postsData.tagsNum }}</span
					><br /><span>分类</span>
				</div>
			</div>
		</div>
		<div else></div>
	</div>
</template>
<script setup>
import { ref, inject, watch, computed, defineProps } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
	width: {
		type: String,
		default: '0',
	},
});

const blog = inject('blog');
const posts = ref(blog.value.posts);
const postsData = ref({
	postsNum: blog.value.posts.length,
	tagsNum: blog.value.tags.length,
});
const currentPost = ref(null);

const postShow = computed(() => {
	return /^\/post/.test(route.fullPath);
});

watch(route, (to) => {
	if (to.params.title && posts.value) {
		currentPost.value = posts.value.find(
			(post) => post.title === to.params.title
		);
	}
});

defineExpose({
	name: 'AsideComponent',
});
</script>
<style scoped>
.root {
	background-color: rgb(0, 0, 0);
	height: 100%;
	position: fixed;
	color: white;
}
h2{
	margin-left: auto;
	margin-right: auto;
	text-align: center;
	margin-top: 10%;
}
.blog-data {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.blog-data div {
	margin-left: auto;
	margin-right: auto;
	margin-top: 10%;
}
@media screen and (max-width: 768px) {
	.root {
		background-color: rgba(37, 37, 37, 0.9);
	}
}
</style>
