<template>
	<div id="root" :style="rootStyle">
		<AsideComponent
			ref="aside"
			class="aside"
			:width="asideWidth"
		/>
		<div v-if="isPC" class="none" :style="noneStyle"> </div>
		<button
			@click="toggleAside"
			id="navButton"
			class="hamburger"
		>
			<div class="hamburger__line"></div>
			<div class="hamburger__line"></div>
			<div class="hamburger__line"></div>
		</button>
		<main>
			<header>
				<h1>water's blog</h1>
				<div>
					<span @click="toMain" :class="page === 0?'selected':''">首页</span>
					<span @click="toArchive" :class="page === 1?'selected':''">归档</span>
				</div>
			</header>
			<div class="content">
				<router-view class="router-view" />
			</div>
		</main>
	</div>
</template>
<script setup>
import { ref, provide, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AsideComponent from '@/components/AisdeComponent.vue';

import blogJson from '@/store/blog.json';

const blog = ref(blogJson);
provide('blog', blog);

const route = useRoute();
const router = useRouter();

const asideWidth = ref("0")
const noneStyle = computed(()=>{
	return {
		width:asideWidth.value
	}
})
const rootStyle = ref({})
const page = computed(()=>{
	const path = route.path;
	console.log(path)
	switch(path){
		case '/':
			return 0;
		case '/archive':
			return 1;
		default:
			return 2;
	}
})
const isPC = computed(()=>{
	return window.innerWidth >= 768;
})

const toggleAside = () => {
	if(!isPC.value){
		asideWidth.value = asideWidth.value == "0"?"80%":"0"
		rootStyle.value = {
			//玻璃板
			background: asideWidth.value == "0"?"rgba(0,0,0,0)":"rgba(0,0,0,0.5)",
		}
		return;
	}
	asideWidth.value = asideWidth.value == "0"?"20%":"0"
};
const toMain = () => {
	router.push('/')
};
const toArchive = () => {
	router.push('/archive')
};
</script>
<style scoped>
#root {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	transition: all 0.5s;
}
main {
	width: 100%;
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.none{
	display: block;
	transition: all 0.5s;
}
.hamburger {
	background: rgb(0, 0, 0) !important;
	border: transparent;
	cursor: pointer;
	padding: 5px;
	position: fixed;
	z-index: 1000;
	height: 35px;
	bottom: 15%;
	left: 5%;
}
.hamburger__line {
	background: rgb(255, 255, 255);
	margin: 0.25rem 0;
	height: 0.25rem;
	width: 2rem;
	transition: all 0.3s;
}
.hamburger:hover .hamburger__line:nth-child(1) {
	transform: translate(17px, 4px) rotate(45deg);
	width: 16px;
}
.hamburger:hover .hamburger__line:nth-child(3) {
	transform: translate(17px, -4px) rotate(-45deg);
	width: 16px;
}
.aside {
	transition: all 0.5s;
	overflow: hidden;
	z-index: 150;
}
header {
	padding-top: 100px;
}
header div {
	display: flex;
	justify-content: space-around;
	width: 100%;
	margin-top: 25px;
	margin-bottom: 10px;
}
.content {
	display: block;
	width: 100%;
	margin-top: 50px;
}
.router-view {
	width: 100%;
	margin-top: 0;
}
.selected {
	/* 下划线 */
    background-image:linear-gradient(0deg, #000000, #000000);
    background-repeat: no-repeat;
    background-size: 100% 2px;
    background-position: right bottom;
    transition: background-size 0.5s ease-in;
}
header span {
    background-image: linear-gradient(0deg, #000000, #000000);
    background-repeat: no-repeat;
    background-size: 0 2px;
    background-position: right bottom;
    transition: background-size 0.5s ease-in;
	padding-bottom: 5px;
	cursor: pointer;
}
header span:hover{
	background-size: 100% 2px;
    background-position: left bottom;
	color: rgb(55, 55, 55);
}
@media screen and (max-width: 768px) {
	none{
		display: none;
	}
}
</style>
