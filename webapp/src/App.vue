<template>
  <div id="app" class="wrapper">
    <header class="main-head"></header>
    <div class="main-nav">
      <Navbar />
    </div>
    <article class="content">
      <router-view />
    </article>
    <aside class="side"></aside>
    <div class="ad"></div>
    <footer class="main-footer">© Techwares.eu</footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Layout definition */
/* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Realizing_common_layouts_using_CSS_Grid_Layout */

.main-head {
  grid-area: header;
}
.content {
  grid-area: content;
}
.main-nav {
  grid-area: nav;
}
.side {
  grid-area: sidebar;
}
.ad {
  grid-area: ad;
}
.main-footer {
  grid-area: footer;
}

.wrapper {
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    'header'
    'nav'
    'content'
    'sidebar'
    'ad'
    'footer';
}

@media (min-width: 500px) {
  .wrapper {
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      'header  header'
      'nav     nav'
      'sidebar content'
      'ad      footer';
  }
  nav ul {
    display: flex;
    justify-content: space-between;
  }
}

@media (min-width: 700px) {
  .wrapper {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-areas:
      'header header  header'
      'nav    content sidebar'
      'nav    content ad'
      'footer footer  footer';
  }
  nav ul {
    flex-direction: column;
  }
}

/* Style inputs, select elements and textareas */
input[type='text'],
select,
textarea {
  width: 50%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

button {
  display: inline-block;
  padding: 0.7em 1.7em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 0.2em;
  box-sizing: border-box;
  text-decoration: none;
  color: #ffffff;
  background-color: #4caf50;
  box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
    inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
    inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
  text-align: center;
  border: 0;
  margin: 8px 4px;
}

button:active {
  box-shadow: inset 0 0.6em 2em -0.3em rgba(0, 0, 0, 0.15),
    inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
}

button:disabled {
  background-color: lightgray;
}

@media all and (max-width: 30em) {
  button {
    display: block;
    margin: 0.4em auto;
  }
}

.lds-hourglass {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-hourglass:after {
  content: ' ';
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 8px;
  box-sizing: border-box;
  border: 32px solid #42b983;
  border-color: #42b983 transparent #42b983 transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
