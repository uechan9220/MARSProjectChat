<template>
  <div class="chatRightBackground">
    <input type="text" v-model="message" />

    <button @click="pushMassage">Push Message</button>
    <div v-for="data in datas" :key="data.id">
      <div>
        <img style=" height: 80px" :src="items.photoURL" />
        <p class="accountBoxText">{{ items.displayName }}</p>
        <p>{{ data.message }}</p>
      </div>
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
      message: ""
    };
  },
  props: ["items"],
  methods: {
    pushMassage() {
      db.collection("rooms")
        .doc("inu")
        .collection("messages")
        .add({
          name: items.displayName,
          message: this.message,
          phot: items.photoURL
        })
        .then((this.message = ""));
    }
  },
  mounted() {
    db.collection("rooms")
      .doc("inu")
      .collection("messages")
      .get()
      .then(res => {
        res.forEach(doc => {
          this.datas.push(doc.data());
        });
      });
  }
};
</script>



<style lang="scss" scoped>
.chatRightBackground {
  background-color: rgba($color: #3676ca, $alpha: 1);
}
</style>