<template>
  <section class="container">
    <div v-if="isWaiting">
      <p>読み込み中</p>
    </div>
    <div v-else>
      <div v-if="!isLogin">
        <LoginView />
      </div>
      <div v-else>
        <Chat :items='user'/>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from '@/plugins/firebase'
import Chat from '~/components/chat.vue'
import LoginView from '~/components/loginView.vue'

export default {
  components: {
    Chat,
    LoginView
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