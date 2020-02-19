<template>
  <div class="loginBox">
    <video id="bg-video" src="~/assets/videos/example.mp4" type="video/mp4" autoplay loop></video>
    <div class="loginContent">
      <div class="loginContentText">
        <p>CATS</p>
      </div>
      <div class="loginButtonBox">
        <div>
          <p class="loginText">Login</p>
          <div @click="googleLogin" class="googleLoginButtonBox">
            <div class="googleLoginButtonImageBox">
              <img src="~/assets/images/google-icon.svg" class="googleLoginButtonImage" />
            </div>
            <p class="googleLoginButtonText">Login with Google</p>
          </div>
        </div>
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
      margin: -5rem 0 0 1rem;
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
  &Button {
    &Box {
      display: flex;
      align-items: flex-end;
      margin: 5rem 1rem 0 0;
      flex-direction: column;
    }
  }
  &Text {
    color: #fff;
    font-family: Roboto, arial, sans-serif;
    font-weight: 500;
    letter-spacing: 0.21px;
    font-size: 3rem;
    text-align:center;
    margin:1rem 0;
  }
}

.google {
  &Login {
    &Button {
      &Box {
        background-color: #fff;
        margin: 1px;
        display: inline-flex;
        align-items: center;
        background-color: #4285f4;
        cursor: pointer;
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
      }
      &Image {
        min-width: 2rem;
        min-height: 2rem;
        max-width: 2rem;
        max-height: 2rem;
        margin: 15px;
        &Box {
          background-color: #fff;
          margin: 1px;
        }
      }
      &Text {
        font-family: Roboto, arial, sans-serif;
        font-weight: 500;
        letter-spacing: 0.21px;
        font-size: 16px;
        color: #fff;
        padding: 16px 32px;
      }
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
