<template>
  <div class="chatRightBackground">
    <div class="chatBox">
      <div v-for="data in datas" :key="data.id">
        <!-- 投稿したのが自分の時 -->
        <div v-if="data.name == items.displayName" class="chatMyUserBox chatUserBox">
          <div class="chatNameAndTextBox chatNameAndTextBoxRight">
            <p class="accountBoxText">{{ data.name }}</p>
            <div class="chatMyUserMessageBox">
              <p class="chatMessage">{{ data.message }}</p>
            </div>
          </div>
          <div v-if="data.photoURL ==  ''">
            <img src="~/assets/images/guest.svg" />
          </div>
          <div v-else>
            <img :src="data.photoURL" />
          </div>
        </div>

        <!-- 投稿したのが他人の場合 -->
        <div v-else class="chatUserBox">
          <div v-if="data.photoURL ==  ''">
            <img src="~/assets/images/guest.svg" />
          </div>
          <div v-else>
            <img :src="data.photoURL" />
          </div>
          <div class="chatNameAndTextBox chatNameAndTextBoxLeft">
            <p class="accountBoxText">{{ data.name }}</p>
            <div class="chatMessageBox">
              <p class="chatMessage">{{ data.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="roomeName != ''" class="pushMessageBox">
      <textarea type="text" v-model="message" class="pushMessageInput" />
      <button @click="pushMessage">投稿</button>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";

const db = firebase.firestore();

export default {
  data() {
    return {
      datas: [],
      roomid: this.$route.params.roomid,
      message: "",
      roomeName: ""
    };
  },
  props: ["items"],
  methods: {
    pushMessage() {
      if (this.message != "") {
        db.collection("rooms")
          .doc(this.roomeName)
          .collection("messages")
          .add({
            name: this.items.displayName,
            message: this.message,
            photoURL: this.items.photoURL,
            timestamp: new Date()
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
          );
      } else {
        alert("メッセージを入力してください");
      }
    }
  },
  created() {
    this.$nuxt.$on("hoge", data => {
      this.roomeName = "";
      this.roomeName = data;
      this.datas = [];
      db.collection("rooms")
        .doc(data)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get()
        .then(res => {
          res.forEach(doc => {
            this.datas.push(doc.data());
          });
        });
    });
  },
  mounted() {
    // db.collection("rooms")
    //   .doc("golang")
    //   .collection("messages")
    //   .get()
    //   .then(res => {
    //     res.forEach(doc => {
    //       this.datas.push(doc.data());
    //     });
    //   });
    console.log(this.datas);
    console.log(this.items);
  }
};
</script>



<style lang="scss" scoped>
.chatRightBackground {
  background-color: rgba($color: #3676ca, $alpha: 1);
}

.chat {
  &Box {
    padding: 1rem;
    margin: 0.5rem;
    height: 90vh;
    background-color: #fff;
    overflow-y: auto;
  }
  &User {
    &Box {
      align-items: center;
      display: flex;
    }
  }
  &MyUser {
    &Box {
      align-items: center;
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
      }
    }
  }
  &Name {
    &And {
      &Text {
        &Box {
          margin: 2rem 0;
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
    &Box {
      width: 100%;
      position: relative;
      padding: 16px;
      background-color: #f2f3f7;
      font-size: 18px;
      color: #231815;
      border-radius: 12px;
      box-sizing: border-box;
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
</style>