<template>
  <div class="chatRightBackground">
    <div class="chatBox" id="chat">
      <div v-for="data in datas" :key="data.id">
        <!-- 投稿したのが自分の時 -->
        <div
          v-if="data.name == items.displayName"
          class="chatMyUserBox chatUserBox"
        >
          <!-- stampの場合 -->
          <div v-if="data.stampFlag == 1">
            <div class="chatNameAndTextBox chatNameAndTextBoxRight">
              <p class="accountBoxText">{{ data.name }}</p>
              <img :src="data.stamp" class="stamp" />
            </div>
          </div>
          <!-- stampじゃない場合 -->
          <div v-else>
            <div class="chatNameAndTextBox chatNameAndTextBoxRight">
              <p class="accountBoxText">{{ data.name }}</p>
              <div class="chatMyUserMessageBox">
                <p class="chatMessage">{{ data.message }}</p>
              </div>
            </div>
          </div>
          <div v-if="data.photoURL == ''">
            <img src="~/assets/images/guest.svg" />
          </div>
          <div v-else>
            <img :src="data.photoURL" />
          </div>
        </div>

        <!-- 投稿したのが他人の場合 -->
        <div v-else class="chatUserBox">
          <div v-if="data.photoURL == ''">
            <img src="~/assets/images/guest.svg" />
          </div>
          <div v-else>
            <img :src="data.photoURL" />
          </div>
          <!-- stampの場合 -->
          <div v-if="data.stampFlag == 1">
            <div class="chatNameAndTextBox chatNameAndTextBoxLeft">
              <p class="accountBoxText">{{ data.name }}</p>
              <img :src="data.stamp" class="stamp" />
            </div>
          </div>
          <!-- stampじゃない場合 -->
          <div v-else>
            <div class="chatNameAndTextBox chatNameAndTextBoxLeft">
              <p class="accountBoxText">{{ data.name }}</p>
              <div class="chatMessageBox">
                <p class="chatMessage">{{ data.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="roomeName != ''" class="pushMessageBox">
      <div>
        <button class="stampButton" @click="openStampModal">スタンプ</button>
        <stampModal v-if="stampModal" @close="closeStampModal">
          <div class="stampBox">
            <div v-for="(item, index) in icons" :key="index">
              <img @click="pushStamp" :src="item.stamp" class="stampStyle" />
            </div>
          </div>
        </stampModal>
      </div>
      <textarea type="text" v-model="message" class="pushMessageInput" />
      <button @click="pushMessage" class="addMessageButtonStyle">投稿</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

const db = firebase.firestore();

import stampModal from "~/components/chat/stampModal";
import stamp01 from "@/assets/images/stamp/stamp01.png";
import stamp02 from "@/assets/images/stamp/stamp02.png";
import stamp03 from "@/assets/images/stamp/stamp03.png";
import stamp04 from "@/assets/images/stamp/stamp04.png";
import stamp05 from "@/assets/images/stamp/stamp05.png";
import stamp06 from "@/assets/images/stamp/stamp06.png";
import stamp07 from "@/assets/images/stamp/stamp07.png";
import stamp08 from "@/assets/images/stamp/stamp08.png";
import stamp09 from "@/assets/images/stamp/stamp09.png";

export default {
  components: {
    stampModal
  },
  data() {
    return {
      datas: [],
      roomid: this.$route.params.roomid,
      message: "",
      roomeName: "",
      stampModal: false,
      icons: [
        { stamp: stamp01 },
        { stamp: stamp02 },
        { stamp: stamp03 },
        { stamp: stamp04 },
        { stamp: stamp05 },
        { stamp: stamp06 },
        { stamp: stamp07 },
        { stamp: stamp08 },
        { stamp: stamp09 }
      ]
    };
  },
  props: ["items"],
  methods: {
    openStampModal() {
      this.stampModal = true;
    },
    closeStampModal() {
      this.stampModal = false;
    },
    pushStamp(event) {
      console.log(event.target.src);
      const chatLog = document.getElementById("chat");
      db.collection("rooms")
        .doc(this.roomeName)
        .collection("messages")
        .add({
          name: this.items.displayName,
          message: "",
          photoURL: this.items.photoURL,
          timestamp: new Date(),
          stamp: event.target.src,
          stampFlag: 1
        })
        .catch(err => {
          console.llg(err);
        })
        .then(
          (this.message = ""),
          (this.datas = []),
          db
            .collection("rooms")
            .doc(this.roomeName)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .get()
            .then(res => {
              res.forEach(doc => {
                this.datas.push(doc.data());
              });
            })
            .then(() => {
              setTimeout(() => {
                chatLog.scrollTop = chatLog.scrollHeight;
              }, 100);
            })
        );
    },
    pushMessage() {
      if (this.message != "") {
        const chatLog = document.getElementById("chat");
        db.collection("rooms")
          .doc(this.roomeName)
          .collection("messages")
          .add({
            name: this.items.displayName,
            message: this.message,
            photoURL: this.items.photoURL,
            timestamp: new Date(),
            stamp: "",
            stampFlag: 0
          })
          .catch(err => {
            console.llg(err);
          })
          .then(
            (this.message = ""),
            (this.datas = []),
            db
              .collection("rooms")
              .doc(this.roomeName)
              .collection("messages")
              .orderBy("timestamp", "asc")
              .get()
              .then(res => {
                res.forEach(doc => {
                  this.datas.push(doc.data());
                });
              })
              .then(() => {
                setTimeout(() => {
                  chatLog.scrollTop = chatLog.scrollHeight;
                }, 100);
              })
          );
      } else {
        alert("メッセージを入力してください");
      }
    }
  },
  created() {
    this.$nuxt.$on("hoge", data => {
      const chatLog = document.getElementById("chat");
      this.roomeName = "";
      this.roomeName = data;
      this.datas = [];
      db.collection("rooms")
        .doc(data)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get()
        .then(res => {
          if (res.docs.length != 0) {
            res.forEach(doc => {
              this.datas.push(doc.data());
            });
          } else {
            this.datas.push({
              message: "まだ書き込みはない様です。",
              name: "System Manager",
              photoURL: ""
            });
          }
        })
        .then(() => {
          setTimeout(() => {
            chatLog.scrollTop = chatLog.scrollHeight;
          }, 100);
        });
    });
  }
};
</script>

<style lang="scss" scoped>
$color: #1aab8a;

@keyframes sheen {
  0% {
    transform: skewY(-45deg) translateX(0);
  }
  100% {
    transform: skewY(-45deg) translateX(12.5em);
  }
}
.stamp {
  max-width: 12rem;
  max-height: 12rem;
  border-radius: inherit;
  &Box {
    display: flex;
    flex-wrap: wrap;
  }
  &Style {
    transition-duration: 0.3s;
    &:hover {
      transform: scale(1.1);
      transition-duration: 0.3s;
    }
  }
  &Button {
    height: 100%;
    padding: 0.5rem;
    text-align: center;
    text-decoration: none;
    color: $color;
    border: 2px solid $color;
    display: inline-block;
    border-radius: 0.3em;
    transition: all 0.2s ease-in-out;
    position: relative;
    overflow: hidden;
    &:before {
      content: "";
      background-color: rgba(255, 255, 255, 0.5);
      height: 100%;
      width: 3em;
      display: block;
      position: absolute;
      top: 0;
      left: -4.5em;
      transform: skewX(-45deg) translateX(0);
      transition: none;
    }
    &:hover {
      background-color: $color;
      color: #fff;
      border-bottom: 4px solid darken($color, 10%);
      &:before {
        transform: skewX(-45deg) translateX(13.5em);
        transition: all 0.5s ease-in-out;
      }
    }
  }
}

.menuButton {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  -webkit-appearance: none;
  border: 0;
  background: transparent;
  border-radius: 0;
  width: 30px;
  cursor: pointer;
  pointer-events: auto;
  margin-left: 1.6rem;
  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  height: 8vh;
}
.icon-bar {
  display: block;
  width: 100%;
  height: 3px;
  background: #aaa;
  transition: 0.3s;
}
.icon-bar + .icon-bar {
  margin-top: 5px;
}

.menuBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chatRightBackground {
  background-color: rgba($color: #3676ca, $alpha: 1);
}

.project {
  &Name {
    color: #fff;
    margin-right: 1.5rem;
    font-weight: bold;
    font-size: 2rem;
  }
}

.chat {
  &Box {
    padding: 1rem;
    margin: 0.5rem;
    height: 90vh;
    background-color: #fff;
    overflow-y: auto;
    @media screen and(max-width:767px) {
      height: 83vh;
    }
  }
  &User {
    &Box {
      display: flex;
    }
  }
  &MyUser {
    &Box {
      display: flex;
      justify-content: flex-end;
    }
    &Message {
      &Box {
        width: 100%;
        position: relative;
        padding: 16px;
        background-color: #fde5e5;
        font-size: 18px;
        color: #231815;
        border-radius: 12px;
        box-sizing: border-box;
        max-width: 16rem;
        &:before {
          left: auto;
          right: -15px;
          border-left: 25px solid transparent;
          border-top: 25px solid #fde5e5;
          content: "";
          position: absolute;
          display: block;
          width: 0;
          height: 0;
          border-radius: 50%;
          transform: rotate(10deg);
          top: 10px;
          border-right: 25px solid transparent;
          border-bottom: 25px solid transparent;
        }
        /deep/p {
          text-align: left;
        }
      }
    }
  }
  &Name {
    &And {
      &Text {
        &Box {
          margin: 1rem 0;
          &Right {
            display: flex;
            flex-direction: column;
            text-align: right;
            margin-right: 16px;
          }
          &Left {
            display: flex;
            flex-direction: column;
            text-align: left;
            margin-left: 16px;
          }
        }
      }
    }
  }
  &Message {
    white-space: pre-wrap;
    word-break: break-all;
    &Box {
      width: 100%;
      position: relative;
      padding: 16px;
      background-color: #f2f3f7;
      font-size: 18px;
      color: #231815;
      border-radius: 12px;
      box-sizing: border-box;
      max-width: 16rem;
      &:before {
        left: -15px;
        border-left: 25px solid #f2f3f7;
        border-top: 25px solid transparent;
        content: "";
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-radius: 50%;
        transform: rotate(80deg);
        top: 10px;
        border-right: 25px solid transparent;
        border-bottom: 25px solid transparent;
      }
      /deep/p {
        text-align: left;
      }
    }
  }
}

.push {
  &Message {
    &Box {
      margin: 0 0.5rem;
      height: 7vh;
      display: flex;
    }
    &Input {
      height: 100%;
      flex-grow: 3;
    }
  }
}

/deep/img {
  max-height: 5rem;
  max-width: 5rem;
  min-width: 5rem;
  border-radius: 50%;
}

/deep/textarea {
  resize: none;
}

.addMessageButtonStyle {
  background-color: #fff;
  border: 2px solid;
  font: inherit;
  line-height: 1;
  transition: 0.25s;
  color: $color;
  &:hover,
  &:focus {
    color: #fff;
    box-shadow: inset 6.5em 0 0 0 $color;
  }
}
</style>
