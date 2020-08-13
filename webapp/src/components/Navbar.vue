<template>
  <ul>
    <li><router-link class="active" to="/">Home</router-link></li>
    <li><router-link to="/about">About</router-link></li>
  </ul>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

a.router-link-exact-active {
  background-color: #4CAF50;
}
</style>
