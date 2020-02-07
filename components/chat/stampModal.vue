<template>
  <transition name="stampModal" appear>
    <div class="stampModal stampModal-overlay" @click.self="$emit('close')">
      <div class="stampModal-window">
        <div class="stampModal-content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.stampModal {
  &.stampModal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  &-content {
    padding: 10px 20px;
  }

  &-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
  }
}

// オーバーレイのトランジション
.stampModal-enter-active,
.stampModal-leave-active {
  transition: opacity 0.4s;

  // オーバーレイに包含されているモーダルウィンドウのトランジション
  .stampModal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える
.stampModal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.stampModal-enter,
.stampModal-leave-to {
  opacity: 0;

  .stampModal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>