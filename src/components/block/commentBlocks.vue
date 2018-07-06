<template>
  <div>
    <div v-for="comment in comments" v-bind:key="comment.commentId">
      <div class="cmt-title">
        <div class="cmt-head">
          <img :src="comment.user.avatarUrl"/>
        </div>
        <div class="cmt-wrap">
          <div class="cmt-header">
            <div class="cmt-meta">
              <div class="cmt-user" :class="isSongPage === `yes` ? `cmt-user-songPage`:``">
                {{comment.user.nickname}}
              </div>
              <div class="cmt-time">
                {{ formatDate(comment.time) }}
              </div>
            </div>
            <div class="cmt-like">
              {{comment.likedCount}}liked
            </div>
          </div>
          <div class="cmt-content" :class="isSongPage === `yes` ? `cmt-content-songPage`:``">
            <span v-if="comment.beReplied.length>0">
              回复
              <span style="color:blue">@{{comment.beReplied[0].user.nickname}}
              </span>
              ：
            </span>
            {{comment.content}}
          </div>
          <div v-if="comment.beReplied.length>0" class="reply">
            @{{comment.beReplied[0].user.nickname}}：{{comment.beReplied[0].content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    comments: Array,
    isSongPage: String
  },
  methods: {
    formatDate (t) {
      let time = new Date(t).toLocaleString()
      return time.substring(0, time.indexOf(','))
    }
  }
}
</script>

<style scoped>
.cmt-title{
  padding-top: 10px;
  width: 100%;
  text-align: left;
  display: flex;
}
.cmt-head{
  height: 35px;
  margin: 0 10px;
  display: inline-block;
}
img{
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline-block;
}
.cmt-wrap{
  padding-right: 10px;
  padding-bottom: 11px;
  flex: auto;
  border-bottom:1px solid rgba(0,0,0,.1);
}
.cmt-header{
  width: 100%;
  display: flex;
  flex: auto;
  justify-content: space-between;
}
.cmt-meta{
  display: inline-block;
}
.cmt-user{
  font-size: 14px;
  color: #666;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cmt-user-songPage{
  color: hsla(0,0%,100%,.7);
}
.cmt-time{
  font-size: 9px;
  color: #999;
}
.cmt-like{
  padding-left: 5px;
  line-height: 22px;
  font-size: 11px;
  color: #999;
  display: inline-block;
}
.cmt-content{
  width: 100%;
  color: #333;
  font-size: 15px;
  line-height: 22px;
  margin-top: 5px;
  display: block;
  text-align: left;
}
.cmt-content-songPage{
  color: #fff;
}
.reply{
  margin: 5px 0;
  padding: 10px;
  color: #888;
  font-size: 14px;
  line-height: 21px;
  border: 1px solid rgba(0,0,0,.1);
}
</style>
