<script setup lang="ts">

const props = defineProps({
  class: String,
})

</script>

<template>
  <div class="notif" >
    <span :class="props.class"><slot></slot></span>
  </div>
</template>

<style scoped>
@keyframes notifyMove {
  0% {}
  20% {top: 3rem}
  50% {top: 3rem}
  70% {top: 3rem}
  100% {top: -3rem}
}

.notif {
  z-index: 3;
  position: absolute;
  top: -3rem;
  left: 50%;
  transform: translateX(-50%);

  inline-size: 15rem;

  border: solid 1px var(--color-border);
  border-radius: 6px;
  padding: .5rem;

  display: flex;
  flex-flow: column;
  align-items: center;
  gap: .5rem;

  background-color: var(--color-background);
  animation: notifyMove normal 5s ;
}

span {
  transition: all .2s;
}

button {
  align-self: flex-end;
}

.error {
  color: var(--color-error);
}
</style>
