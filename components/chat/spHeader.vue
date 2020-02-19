<template>
  <div class="spHeaderBox">
    <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu" />
    <label for="openSidebarMenu" class="sidebarIconToggle">
      <div class="spinner diagonal part-1"></div>
      <div class="spinner horizontal"></div>
      <div class="spinner diagonal part-2"></div>
    </label>
    <p class="spHeaderTitle">CTAS</p>
    <spChatLeft :items="items" />
  </div>
</template>

<script>
import spChatLeft from "~/components/chat/spchatLeft";
export default {
  props: ["items"],
  components: {
    spChatLeft
  }
};
</script>

<style lang="scss" scoped>
.sp {
  &Header {
    &Box {
      height: 6vh;
      background-color: #3676ca;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &Title{
      margin-right: 1rem;
      color:#fff;
      font-weight: bold;
    }
  }
}

input[type="checkbox"]:checked ~ #sidebarMenu {
  transform: translateX(0);
}

input[type="checkbox"] {
  transition: all 0.3s;
  box-sizing: border-box;
  display: none;
}
.sidebarIconToggle {
  transition: all 0.3s;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 99;
  height: 22px;
  width: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left:1rem;
}
.spinner {
  transition: all 0.3s;
  box-sizing: border-box;
  position: absolute;
  height: 3px;
  width: 100%;
  background-color: #fff;
}
.horizontal {
  transition: all 0.3s;
  box-sizing: border-box;
  position: relative;
  float: left;
  margin-top: 3px;
}
.diagonal.part-1 {
  position: relative;
  transition: all 0.3s;
  box-sizing: border-box;
  float: left;
}
.diagonal.part-2 {
  transition: all 0.3s;
  box-sizing: border-box;
  position: relative;
  float: left;
  margin-top: 3px;
}
input[type="checkbox"]:checked ~ .sidebarIconToggle > .horizontal {
  transition: all 0.3s;
  box-sizing: border-box;
  opacity: 0;
}
input[type="checkbox"]:checked ~ .sidebarIconToggle > .diagonal.part-1 {
  transition: all 0.3s;
  box-sizing: border-box;
  transform: rotate(135deg);
  margin-top: 8px;
}
input[type="checkbox"]:checked ~ .sidebarIconToggle > .diagonal.part-2 {
  transition: all 0.3s;
  box-sizing: border-box;
  transform: rotate(-135deg);
  margin-top: -9px;
}
</style>