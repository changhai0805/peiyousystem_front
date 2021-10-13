<!-- im服务端入口 -->
<template >
    <div  class="imServer-wrapper" >
        <main class="imServer-main">
            <im-record class="item im-record" @selectedChat="selectedChat()"></im-record>
            <im-chat v-if="storeSelectedChatEn!=null" ref="im_chat" class="item im-chat"></im-chat>
        </main>
    </div>
</template>

<script >
import imRecord from './imRecord.vue';
import imChat from './imChat.vue';

export default {
    components: {
        imRecord: imRecord,
        imChat: imChat
    },
    data() {
        return {
            currentUrl:"",
            socket: null
        };
    },
    computed: {
        storeSelectedChatEn() {
            return this.$store.imServerStore.getters.selectedChatEn;
        }
    },
    watch: {},
    methods: {
        /**
         * 选中了会话
         */
        selectedChat: function() {}
    },
    mounted() {
        this.currentUrl = window.location.herf
        this.$store.imServerStore.dispatch('SERVER_ON');
    },
  beforeRouteLeave(to,from,next){
    this.$confirm("是否离开当前页面，您将不会接收新的消息","离开此页面?",{
      confirmButtonText:"离开",
      cancelButtonText:"取消",
      type:"warning"
    }).then(()=>{
      next()
    }).catch(()=>{
      window.history.pushState("","",this.currentUrl)
    })
  },
  back(){
      this.$router.go(-1);
  },
  destroyed() {
    this.$store.imServerStore.dispatch('SERVER_OFF');
    }
};
</script>

<style lang="less">
@import '../../common/css/base.less';
.imServer-wrapper {
    #common-wrapper();
}

.imServer-wrapper {
    width: 80%;
    height: 80%;
    position: absolute;
    overflow: hidden;
    .imServer-main {
        height: 80%;
        max-width: 80%;
        position: relative;
        & > .item {
            float: left;
            border-right: 1px solid #e6e6e6;
            height: 100%;
        }
        & > .im-record {
            width: 280px;
        }
        & > .im-chat {
            width: calc(~'99% - 280px');
        }
    }
}
</style>
