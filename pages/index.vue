<template>
  <section class="container">
    <div v-if="isWaiting">
      <LoadingView />
    </div>
    <div v-else>
      <div v-if="!isLogin">
        <LoginView />
      </div>
      <div v-else class="chatFlex">
        <ChatLeft :items='user' class="chatLeft"/>
        <ChatRight :items='user' class="chatRight"/>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'
import ChatLeft from '~/components/chat/chatLeft.vue'
import ChatRight from '~/components/chat/chatRight.vue'
import LoginView from '~/components/loginView.vue'
import LoadingView from '~/components/loadingView.vue'

export default {
  components: {
    ChatLeft,
    ChatRight,
    LoginView,
    LoadingView
  },
  asyncData () {
    return {
      isWaiting: true,
      isLogin: false,
      user: []
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
      } else {
        this.isLogin = false
        this.user = []
      }
    })
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
    },
    hoge(){
      console.log(this.user)
    }
  }
}
</script>

<style lang="scss" scoped>
.chat{
  &Flex{
    display: flex;
    height: 100vh;
  }
  &Left{
    flex-basis: 25%;
  }
  &Right{
    flex-basis: 75%;
  }
}
</style>