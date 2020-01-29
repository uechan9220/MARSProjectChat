<template>
  <div class="chatRightBackground">
    <div class="chatBox">
      <div v-for="data in datas" :key="data.id">
        <div v-if="data.photoURL ==  ''">
          <img src="~/assets/images/guest.svg" />
        </div>
        <div v-else>
          <img :src="data.photoURL" />
        </div>
        <p class="accountBoxText">{{ data.name }}</p>
        <p>{{ data.message }}</p>
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
      db.collection("rooms")
        .doc("golang")
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
          this.datas = [],
          db
            .collection("rooms")
            .doc(this.roomeName)
            .collection("messages")
            .orderBy('timestamp', 'asc')
            .get()
            .then(res => {
              console.log("hello");
              res.forEach(doc => {
                this.datas.push(doc.data());
              });
            })
        );
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
        .orderBy('timestamp', 'asc')
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
    overflow: scroll;
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

img {
  max-height: 3rem;
  max-width: 3rem;
  border-radius: 50%;
}
</style>