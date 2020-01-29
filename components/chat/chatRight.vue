<template>
  <div class="chatRightBackground">
    <div class="chatBox">
      <div v-for="data in datas" :key="data.id">
        <!-- 投稿したのが自分の時 -->
        <div v-if="data.name == items.displayName" class="chatMyUserBox chatUserBox">
          <div class="chatNameAndTextBoxRight">
            <p class="accountBoxText">{{ data.name }}</p>
            <p>{{ data.message }}</p>
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
          <div class="chatNameAndTextBoxLeft">
            <p class="accountBoxText">{{ data.name }}</p>
            <p>{{ data.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="roomeName != ''" class="pushMessageBox">
      <textarea type="text" v-model="message" class="pushMessageInput" />
      <button @click="pushMassage">投稿</button>
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
    pushMassage() {
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
      display: flex;
    }
  }
  &MyUser {
    &Box {
      display: flex;
      justify-content: flex-end;
    }
  }
  &Name {
    &And {
      &Text {
        &Box {
          &Right {
            display: flex;
            flex-direction: column;
            text-align: right;
          }
          &Left {
            display: flex;
            flex-direction: column;
            text-align: left;
          }
        }
      }
    }
  }
}

.push {
  &Message {
    &Box {
      margin: 0 0.5rem;
      height: 7vh;
    }
    &Input {
      width: 94%;
    }
  }
}

/deep/img {
  max-height: 3rem;
  max-width: 3rem;
  min-width: 3rem;
  border-radius: 50%;
}
</style>