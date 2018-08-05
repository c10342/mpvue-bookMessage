<template>
    <div class="comments-list">
        <div class="comment-title" v-if="comments.length">评论</div>
        <div 
        class="comment" 
        v-for="(comment,i) in comments" 
        :key="i"
        @click='goToBookDetail(comment)'
        >
            <div class="user">
                <img 
                :src="comment.user_info.avatarUrl" 
                mode='aspectFit' 
                class="avatar"
                />
                <div class="username">{{comment.user_info.nickName}}</div>
            </div>
            <div class="other">
                {{comment.phone || '未知手机型号'}}
                --
                {{comment.location || '未知地理位置'}}
            </div>
            <div class="content">
                评论内容:
                {{comment.comment}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['comments','types'],
  methods:{
      goToBookDetail(comment){
        //   如果实在个人评论页面，点击后就跳转到该评论对应的图书详情页面
          if(this.types==='user'){
              wx.navigateTo({
                  url:`/pages/bookDetail/main?bookid=${comment.bookid}`
              })
          }
      }
  }
}
</script>

<style lang="less" scoped>
.comments-list{
    .comment-title{
        font-size: 16px;
        font-weight: 500;
        background-color: #eeeeee;
        padding: 15px;
    }
    .comment{
        margin-bottom: 15px;
        background-color: white;
        padding: 15px;
        border-bottom: 1px solid #cccccc;
        .user{
        display: flex;
        flex-direction: row;
        padding: 0 10px 10px;
        align-items: center;
        .avatar{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .username{
            margin-left: 15px;
            font-size: 22px;
        }
    }
    }
}
</style>
