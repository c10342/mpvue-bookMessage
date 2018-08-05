<template>
    <div>
        <CommentsList :comments='comments' types='user'/>
        <div class="text-footer" v-if="!comments.length">还没有评论或者没有登录</div>
        <div class="mybook">我的图书</div>
        <card v-for="(book,i) in booklist" :key="i" :book='book' />
        <div class="text-footer" v-if="!booklist.length">还没有添加图书或者没有登录</div>
    </div>
</template>

<script>
import CommentsList from "@/components/CommentsList.vue";
import { get } from "@/utils/index.js";
import Card from '@/components/Card.vue';
export default {
  components: {
    CommentsList,
    Card
  },
  data() {
    return {
      comments: [],
      userinfo: {},
      booklist: []
    };
  },
  methods: {
    //   获取用户的所有评论
    async getcommentlist() {
      try {
        const result = await get("/getcommentslist", {
          openId: this.userinfo.openId
        });
        if (result.code === 0) {
          this.comments = result.data.commentslist;
        } else {
          this.comments = [];
        }
      } catch (e) {
        this.comments = [];
      }
    },
    //   获取用户添加的图书
    async getbooklist() {
      try {
        const result = await get("/booklist", {
          openId: this.userinfo.openId
        });
        if (result.code === 0) {
          this.booklist = result.data.booklist;
        } else {
          this.booklist = [];
        }
      } catch (e) {
        this.booklist = [];
      }
    }
  },
  //   页面显示，mounted只触发一次
  onShow() {
    if (!this.userinfo.openId) {
      const userinfo = wx.getStorageSync("userinfo");
      // 没有userinfo,说明用户没有登陆
      if (!userinfo) {
        return;
      }
      this.userinfo = userinfo;
    }

    this.getcommentlist();
    this.getbooklist();
  }
};
</script>

<style lang="less" scoped>
.mybook{
    background-color: #eeeeee;
    font-size: 20px;
    font-weight: 600;
    padding: 15px;
}
</style>

