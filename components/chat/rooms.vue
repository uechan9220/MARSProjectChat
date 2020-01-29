<template>
  <div class="roomsBox">
    <h1 class="roomsTitle">Rooms</h1>
    <!-- ここにv-forでroome情報を持ってくる様にする -->
    <div v-for="item in items" :key="item.id">
      <h1 @click='hoge' class="roomsText">{{item.name}}</h1>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
const db = firebase.firestore();

export default {
  methods: {
    hoge(test) {
      console.log(test.target.innerText)
      this.$nuxt.$emit('hoge', test.target.innerText)
    }
  },
  data() {
    return {
      items: []
    };
  },
  async mounted() {
    const res = await db.collection("rooms").get();
    res.forEach(doc => {
      this.items.push({ name: doc.id });
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
  }
  &Title{
    color:#fff;
    margin: 1rem 0 0 0;
    
  }
}
</style>