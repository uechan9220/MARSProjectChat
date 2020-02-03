<template>
  <section class="container">
    <div v-if="isWaiting">
      <LoadingView />
    </div>
    <div v-else>
      <div v-if="!isLogin">
        <LoginView />
      </div>
      <div v-else id="nav-container">
        <div class="chatFlex pcMedia">
          <ChatLeft :items="user" class="chatLeft" />
          <ChatRight :items="user" class="chatRight" />
        </div>
        <div class="spMedia">
          <div>
            <spHeader />
          </div>
          <div class="chatFlex">
            <ChatLeft :items="user" class="chatLeft" />
            <ChatRight :items="user" class="chatRight" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "@/plugins/firebase";
import ChatLeft from "~/components/chat/chatLeft.vue";
import ChatRight from "~/components/chat/chatRight.vue";
import LoginView from "~/components/loginView.vue";
import LoadingView from "~/components/loadingView.vue";
import spHeader from '~/components/chat/spHeader.vue';

export default {
  components: {
    ChatLeft,
    ChatRight,
    LoginView,
    LoadingView,
    spHeader
  },
  asyncData() {
    return {
      isWaiting: true,
      isLogin: false,
      user: []
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      this.isWaiting = false;
      if (user) {
        this.isLogin = true;
        this.user = user;
      } else {
        this.isLogin = false;
        this.user = [];
      }
    });
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    hoge() {
      console.log(this.user);
    }
  }
};
</script>

<style lang="scss" scoped>
.chat {
  &Flex {
    display: flex;
    height: 100vh;
  }
  &Left {
    @media screen and(max-width: 766px) {
      flex-basis: none;
    }
    flex-basis: 25%;
  }
  &Right {
    @media screen and(min-width: 766px) {
      flex-basis: 75%;
    }
    width: 100vw;
  }
}

#nav-container {
  position: fixed;
  height: 100vh;
  width: 100%;
}
#nav-container .bg {
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
  visibility: hidden;
  opacity: 0;
  transition: 0.3s;
  background: #000;
}
#nav-container:focus-within .bg {
  visibility: visible;
  opacity: 0.6;
}
#nav-container * {
  visibility: visible;
}

#nav-container:focus-within .icon-bar:nth-of-type(1) {
  transform: translate3d(0, 8px, 0) rotate(45deg);
}
#nav-container:focus-within .icon-bar:nth-of-type(2) {
  opacity: 0;
}
#nav-container:focus-within .icon-bar:nth-of-type(3) {
  transform: translate3d(0, -8px, 0) rotate(-45deg);
}
#nav-container:focus-within #nav-content {
  transform: none;
}
.pcMedia {
  @media screen and(max-width:767px) {
    display: none;
  }
}

.spMedia {
  @media screen and(min-width:766px) {
    display: flex;
  }
}
</style>