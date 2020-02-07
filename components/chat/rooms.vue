<template>
  <div class="roomsBox">
    <h4 class="roomsTitle">-------Rooms-------</h4>
    <!-- ここにv-forでroome情報を持ってくる様にする -->
    <div v-for="item in items" :key="item.id">
      <h1 @click="hoge" class="roomsText">{{item.name}}</h1>
    </div>
    <div class="addButtonBox">
      <button class="addButtonStyle" @click="openModal">room Add</button>
    </div>
    <modal v-if="modal" @close="closeModal">
      <div class="modalGroup">
        <input class="modalInput" type="text" v-model="roomName" required />
        <span class="modalHighlight"></span>
        <span class="modalBar"></span>
        <label class="modalLabel">追加するルーム名</label>
      </div>
      <template slot="footer">
        <button @click="addRoom" class="modalPushRoom">追加</button>
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
                    alert("ルームの追加が成功しました");
                  });
                console.log(res);
              });
          });
      } else {
        alert("ルーム名を入力してください");
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
$color: #1aab8a;

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
  from {
    background: $color;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@-moz-keyframes inputHighlighter {
  from {
    background: $color;
  }
  to {
    width: 0;
    background: transparent;
  }
}
@keyframes inputHighlighter {
  from {
    background: $color;
  }
  to {
    width: 0;
    background: transparent;
  }
}

.modal {
  &Group {
    position: relative;
    margin-bottom: 45px;
  }
  &Input {
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    border: none;
    border-bottom: 1px solid #757575;
    &:focus {
      outline: none;
    }
  }
  &Label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }
  &Input:focus ~ &Label,
  &Input:valid ~ &Label {
    top: -20px;
    font-size: 14px;
    color: $color;
  }
  &Bar {
    position: relative;
    display: block;
    &:before,
    &:after {
      content: "";
      height: 2px;
      width: 0;
      bottom: 1px;
      position: absolute;
      background: $color;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
    }
    &:before {
      left: 50%;
    }
    &:after {
      right: 50%;
    }
  }
  &Input:focus ~ &Bar:before,
  &Input:focus ~ &Bar:after {
    width: 50%;
  }
  &Highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }
  &Input:focus ~ &Highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    -moz-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
  }
  &Push {
    &Room {
      background-color: #fff;
      border: 2px solid;
      font: inherit;
      line-height: 1;
      margin: 0.5em;
      padding: 1em 2em;
      transition: 0.25s;
      color: $color;
      &:hover,
      &:focus {
        color: #fff;
        box-shadow: inset 6.5em 0 0 0 $color;
      }
    }
  }
}

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

.add {
  &Button {
    &Box {
      height: 100%;
      width: 100%;
      padding: 1rem;
      display: flex;
      align-items: flex-end;
    }
    &Style {
      width: 100%;
      background: $color;
      color: #fff;
      border: none;
      position: relative;
      font-size: 1rem;
      padding: 0.5em 1em;
      cursor: pointer;
      transition: 800ms ease all;
      outline: none;
      &:hover {
        background: #fff;
        color: $color;
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 2px;
        width: 0;
        background: $color;
        transition: 400ms ease all;
      }
      &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 2px;
        width: 0;
        background: $color;
        transition: 400ms ease all;
        right: inherit;
        top: inherit;
        left: 0;
        bottom: 0;
      }
      &:hover {
        &:after,
        &:before {
          width: 100%;
          transition: 800ms ease all;
        }
      }
    }
  }
}
</style>