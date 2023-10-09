<template>
  <div class="card">
    <p><span>QQ:1390267243</span></p>
    <p><span>QQ:1390267243</span></p>
    <p><span>QQ:1390267243</span></p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  margin-top: 1rem;
  /* width: 210px; */
  height: 254px;
  border-radius: 4px;
  background: #fff;
  display: flex;
  gap: 5px;
  padding: 0.4em;
}

.card p {
  height: 100%;
  flex: 1;
  overflow: hidden;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.5s;
  border: 1px solid #01aaed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card p:hover {
  flex: 4;
}

.card p span {
  min-width: 14em;
  padding: 0.5em;
  text-align: center;
  transform: rotate(-90deg);
  transition: all 0.5s;
  text-transform: uppercase;
  color: #01aaed;
  letter-spacing: 0.1em;
}

.card p:hover span {
  transform: rotate(0);
}
</style>
