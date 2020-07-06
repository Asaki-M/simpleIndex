<template>
<div class="motaichuang">
	<div class="bizhikuang">
		<header>
			<span>选择壁纸</span>
			<i class="iconfont icon-guanbi" @click="changeOpen"></i>
		</header>
		<article @scroll="scrollLazyload" ref="box">
			<div class="bizhiBox" ref="animePeople">
				<p>动漫人物:</p>
				<div class="bizhi">
					<img :src="loadingImg"
						 v-for="item in 6"
						 :data-src="'indexBg/anime-people-'+item+'.jpg'"
						 :key="this"
						 @click="checkClick($event)">
				</div>
			</div>
			<div class="bizhiBox" ref="animeScape">
				<p>动漫风景:</p>
				<div class="bizhi">
					<img :src="loadingImg"
						 v-for="item in 6"
						 :data-src="'indexBg/animescape-'+item+'.jpg'"
						 :key="this"
						 @click="checkClick($event)">
				</div>
			</div>
			<div class="bizhiBox" ref="landscape">
				<p>风景:</p>
				<div class="bizhi">
					<img :src="loadingImg" 
						 v-for="item in 6"
						 :data-src="'indexBg/landscape-'+item+'.jpg'" 
						 :key="this"
						 @click="checkClick($event)">
				</div>
			</div>
			<div class="bizhiBox" ref="wangzhe">
				<p>王者荣耀:</p>
				<div class="bizhi">
					<img :src="loadingImg" 
						 v-for="item in 6"
						 :data-src="'indexBg/wangzhe-'+item+'.jpg'" 
						 :key="this"
						 @click="checkClick($event)">
				</div>
			</div>
		</article>
		<footer>
			<button @click="setBgSrc">确定</button>
		</footer>
	</div>
</div>
</template>

<script>
	export default {
		name: 'bizhi',
		data() {
			return {
				isOpen: this.isToggleBizhi,
				loadingImg: '',
				selectedSrc: ''
			}
		},
		props:['isToggleBizhi'],
		methods: {
			changeOpen() {
				this.isOpen = !this.isOpen
				this.$emit("changeOpen",this.isOpen)
			},
			checkClick(event) {
				document.querySelectorAll("img").forEach(ele=>{
					ele.classList.remove("active")
				})
				event.target.classList.add("active")
				this.selectedSrc = event.target.dataset.src
			},
			setBgSrc() {
				this.$emit("setBgSrc", this.selectedSrc)
			},
			
			// 懒加载图片
			checkVisible(img) {
				// this.$refs.box   box
				// this.$refs.animePeople.children[1].children   img
				//  img.getBoundingClientRect.top - box.getBoundingClientRect.top < box.clientHeight  可视
				const box = this.$refs.box
				if ((img.getBoundingClientRect().top - box.getBoundingClientRect().top) < box.clientHeight) {
					return true
				} 
				return false
			},
			scrollLazyload() {
				const imgs1 = this.$refs.animeScape.children[1].children
				const imgs2 = this.$refs.landscape.children[1].children
				const imgs3 = this.$refs.wangzhe.children[1].children
				this.scrollLazyloadUtil(imgs1)
				this.scrollLazyloadUtil(imgs2)
				this.scrollLazyloadUtil(imgs3)
			},
			scrollLazyloadUtil(imgs) {
				for (let i = 0; i < imgs.length; i = i + 3) {
					if (this.checkVisible(imgs[i])) {
						setTimeout(()=>{
							imgs[i].setAttribute('src', imgs[i].dataset.src)
							imgs[i+1].setAttribute('src', imgs[i+1].dataset.src)
							imgs[i+2].setAttribute('src', imgs[i+2].dataset.src)
						}, 1000)
					}
				}
			},
			lazyload() {
				const imgs = this.$refs.animePeople.children[1].children
				for (let i = 0; i < imgs.length; i = i + 3) {
					if (this.checkVisible(imgs[i])) {
						setTimeout(()=>{
							imgs[i].setAttribute('src', imgs[i].dataset.src)
							imgs[i+1].setAttribute('src', imgs[i+1].dataset.src)
							imgs[i+2].setAttribute('src', imgs[i+2].dataset.src)
						}, 1000)
					}
				}
			}
			// 懒加载图片结束
		},
		created() {
			const loading = new Image()
			loading.src = "loading.gif"
			loading.onload = ()=>{
				this.loadingImg = loading.src
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.lazyload()
			})
		}
	}
</script>

<style scoped="scoped">
	.motaichuang{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.5);
	}
	.bizhikuang{
		width: 60vw;
		height: 80vh;
		background-color: rgba(255,255,255,1);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border-radius: 1vw;
		padding: 1em;
		box-sizing: border-box;
	}
	
	.bizhikuang > header{
		width: 100%;
		height: 10%;
		font-size: 1.3em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	
	.bizhikuang > header > i{
		font-size: 1.3em;
		cursor: pointer;
		color: #a3a3a3;
		transition: all 0.5s;
	}
	.bizhikuang > header > i:hover{
		color: #333;
		transition: all 0.5s;
	}
	
	.bizhikuang > article{
		width: 100%;
		height: 80%;
		overflow-y: scroll;
		overflow-x: hidden;
		padding-right: 0.5em;
		display: flex;
		flex-direction: column;
	}
	
	.bizhikuang > article::-webkit-scrollbar{
		width: 0.5em;
	}
	.bizhikuang > article::-webkit-scrollbar-thumb{
		border-radius: 1em;
		background-color: rgba(144,147,153,.3);
	}
	.bizhikuang > article::-webkit-scrollbar-thumb:hover{
		background-color: rgba(144,147,153,.6);
	}
	
	.bizhiBox{
		width: 100%;
		height: 100%;
		margin-top: 1em;
	}
	
	.bizhiBox > p{
		box-sizing: border-box;
		padding: 0.5em 1em;
		font-size: 1.1em;
	}
	
	.bizhi{
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content:flex-start
	}
	
	.bizhi > img{
		width: 30%;
		height: 35%;
		margin-bottom: 1em;
		cursor: pointer;
		border-radius: 0.5em;
		transition: all 0.5s;
	}
	.bizhi > img.active{
		transform: scale(1.1);
		border: 2px solid #409eff;
		transition: all 0.5s;
	}
	
	.bizhikuang > footer{
		width: 100%;
		height: 10%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bizhikuang > footer > button{
		height: 80%;
		width: 15%;
		outline: none;
		border: none;
		background-color: #409eff;
		color: #fff;
		border-radius: 2em;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		transition: all 0.5s;
	}
	.bizhikuang > footer > button:hover{
		background-color: #66b1ff;
		transition: all 0.5s;
	}
	.bizhikuang > footer > button:active{
		background-color: #3a8ee6;
		transition: all 0.5s;
	}
</style>
