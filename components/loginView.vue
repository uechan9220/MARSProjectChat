<template>
  <div class="loginBox">
    <video
      id="bg-video"
      src="~/assets/videos/example.mp4"
      poster="~/assets/images/example.png"
      type="video/mp4"
      autoplay
      loop
    ></video>
    <div class="loginContent">
      <div class="loginContentText">
        <p>MARS</p>
        <p>PROJECT</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebase from "firebase";

export default Vue.extend({
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }
});
</script>

<style lang="scss" scoped>
.login {
  &Box {
    height: 100vh;
    background: linear-gradient(
      -45deg,
      rgba(4, 114, 124, 0.4),
      rgba(17, 66, 99, 0.6)
    );
  }
  &Content {
    position: relative;
    z-index: 2;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 767px) {
      align-items: center;
    }
    &Text {
      @media screen and (max-width: 767px) {
        font-size: 4rem;
        margin: 0;
      }
      font-size: 10rem;
      margin: -15rem 0 0 1rem;
      font-weight: bold;
      position: relative;
      color: #ff7c00;
      background: -webkit-linear-gradient(
        top,
        #ffb76b 0%,
        #ffa73d 50%,
        #ff7c00 51%,
        #ff7f04 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

#bg-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  background: url("/assets/images/example.png") no-repeat;
  background-size: cover;
}
</style>
