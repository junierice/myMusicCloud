<template>
    <div class="m-hometop">
        <div class="topfl">
            <img src="../../../../../img/musicLogo.png" alt="Music Logo"/>
            <img src="../../../../../img/brand.png" alt="我的好音乐" />
        </div>
        <div class="topfr" @click="toMyGit()">
            下载
        </div>
    </div>
</template>

<script>
export default {
  name: 'brand',
  methods: {
    toMyGit () {
      window.location.href = 'https://github.com/junierice/myMusicCloud.git'
    }
  }
}
</script>

<style scoped>
.m-hometop {
    width: 100%;
    height: 64px;
    background-color: #d43c33;
    color: white;
    display: -webkit-flex; /* Safari */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: space-between;
}
.topfl{
    height: 25px;
    width: 170px;
    margin: 0 3px;
}
.topfr{
    height: 30px;
    width: 80px;
    margin: 0 8px;
    border: 1px solid white;
    border-radius: 15px;
    font-size: 15px;
    line-height: 30px;
}
img {
    height: 100%;
}
</style>
