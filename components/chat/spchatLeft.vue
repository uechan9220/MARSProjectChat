<template>
  <div class="chatLeftBackground chatLeft" id="sidebarMenu">
    <div class="accountBox">
      <img class="accountBoxImage" :src="items.photoURL" />
      <div class="accountTextBox">
        <p class="accountBoxText">{{ items.displayName }}</p>
        <p>Guest</p>
      </div>
    </div>
    <Rooms />
    <div class="logoutButtonBox">
      <button id="logoutButton" @click="logOut" class="logoutButton">ログアウト</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Rooms from "~/components/chat/rooms.vue";

export default {
  props: ["items"],
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    hoge() {
      console.log(this.items);
    }
  },
  components: {
    Rooms
  }
};
</script>

<style lang="scss" scoped>
#sidebarMenu {
  @media screen and(max-width: 767px) {
    height: 95vh;
    position: fixed;
    left: 0;
    width: 100vw;
    top: 0;
    margin-top: 6vh;
    transform: translateX(-105%);
    transition: transform 250ms ease-in-out;
    z-index: 9;
  }
}

.account {
  &Box {
    display: flex;
    align-items: center;
    padding: 1rem;
    justify-content: space-evenly;
    &Image {
      max-height: 3rem;
      max-width: 3rem;
      border-radius: 50%;
    }
    &Text {
      color: #acb6e5;
      background: -webkit-linear-gradient(0deg, #acb6e5, #86fde8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  &Text {
    &Box {
      color: #fff;
      display: flex;
      flex-direction: column;
      text-align: center;
      font-weight: bold;
    }
  }
}

.chat {
  &Left {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and(min-width: 768px) {
      display: none;
    }
  }
}

.chatLeftBackground {
  background-color: rgba($color: #424549, $alpha: 1);
}

//////////////////////
// logout Button Style
//////////////////////
button {
  border-style: solid;
  display: inline-block;
  text-align: center;
}
button:before,
button:after {
  content: "";
  display: block;
  position: absolute;
  border-color: #454545;
  box-sizing: border-box;
  border-style: solid;
  width: 1em;
  height: 1em;
  transition: all 0.3s ease-in-out;
}
button:before {
  top: -6px;
  left: -6px;
  border-width: 2px 0 0 2px;
  z-index: 5;
}
button:after {
  bottom: -6px;
  right: -6px;
  border-width: 0 2px 2px 0;
}
button:hover:before,
button:hover:after {
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  border-color: #fff;
}
button:hover {
  color: #353535;
  background-color: #fff;
  border-color: #fff;
}

.logout {
  &Button {
    width: 100%;
    color: #eb1777;
    border-color: #eb1777;
    background: transparent;
    border-width: 2px;
    position: relative;
    margin: 1em;
    padding: 0.5em 1em;
    transition: all 0.3s ease-in-out;
    font-family: comfortaa;
    font-weight: bold;
    &:after {
      border-color: #eb1777;
    }
    &:before {
      border-color: #eb1777;
    }
    &:hover {
      color: #fff;
      background-color: #eb1777;
      border-color: #eb1777;
      &:after {
        border-color: #eb1777;
      }
      &:before {
        border-color: #eb1777;
      }
    }
    &Box {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
