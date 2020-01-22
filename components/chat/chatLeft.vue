<template>
  <div class="chatLeftBackground">
    <div>
      <div class="accountBox">
        <img class="accountBoxImage" :src="items.photoURL" />
        <p>{{ items.displayName }}</p>
      </div>
    </div>
    <button @click="logOut">ログアウト</button>
    <button @click="hoge">aaaaaaaaaa</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  props: ["items"],
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    hoge() {
      console.log(this.items);
    }
  }
};
</script>

<style lang="scss" scoped>
.account {
  &Box {
    display: flex;
    align-items: center;
    &Image {
      max-height: 4rem;
      max-width: 4rem;
      border-radius: 50%;
    }
  }
}

.chatLeftBackground{
  background-color: rgba($color: #ca3636, $alpha: 1.0)
}
</style>
