<template>
  <div class="roomsBox">
    <h4 class="roomsTitle">-------Rooms-------</h4>
    <!-- ここにv-forでroome情報を持ってくる様にする -->
    <div v-for="item in items" :key="item.id">
      <h1 @click="hoge" class="roomsText">{{item.name}}</h1>
    </div>
    <div>
      <button @click="openModal">room Add</button>
    </div>
    <modal v-if="modal" @close="closeModal">
      <p>追加するRoom名</p>
      <div>
        <input v-model="roomName" />
      </div>
      <template slot="footer">
        <button @click="addRoom">追加</button>
      </template>
    </modal>
  </div>
</template>

<script>
import firebase from "firebase";
const db = firebase.firestore();
import modal from "~/components/chat/modal";

export default {
  components: {
    modal
  },
  methods: {
    hoge(test) {
      console.log(test.target.innerText);
      this.$nuxt.$emit("hoge", test.target.innerText);
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    addRoom() {
      if (this.roomName.length > 0) {
        let data = {
          id: 1,
          name: "hoge"
        };

        // ここいつか直したい
        db.collection("rooms")
          .doc(this.roomName)
          .set(data)
          .then(res => {
            db.collection("rooms")
              .doc(this.roomName)
              .collection("Messages")
              .doc(this.roomName)
              .set(data)
              .catch(err => {
                console.log(err);
              })
              .then(res => {
                db.collection("rooms")
                  .doc(this.roomName)
                  .collection("Messages")
                  .doc(this.roomName)
                  .delete()
                  .then(res => {
                    console.log(res);
                    alert("roomの追加が成功しました");
                  });
                console.log(res);
              });
          });
      } else {
        alert("Room名を入力してください");
      }
    }
  },
  data() {
    return {
      items: [],
      modal: false,
      roomName: ""
    };
  },
  async mounted() {
    await db.collection("rooms").onSnapshot(querySnapshot => {
      this.items = [];
      querySnapshot.forEach(doc => {
        this.items.push({ name: doc.id });
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.rooms {
  &Text {
    color: #fff;
    margin: 1rem 0;
    cursor: pointer;
  }
  &Box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90vh;
    border-top: 2px solid #fff;
    border-bottom: 2px solid #fff;
    overflow-y: auto;
  }
  &Title {
    color: #fff;
    margin: 1rem 0 0 0;
  }
}
</style>