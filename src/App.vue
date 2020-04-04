<template>
   <div id="app">
      <header>
         <Header />
      </header>
      <main>
         <router-view />
      </main>
      <footer>
         <Footer />
      </footer>
   </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
   components: {
      Header,
      Footer,
   },
};
</script>

<style lang="scss">
#app {
   height: 100vh;
   max-width: 100%;
   color: $color-fg;
   background-color: $color-bg-dark;
   font-family: $font-default;
   font-size: $font-size-default;
   display: grid;
   grid-template-columns: 1fr;
   grid-auto-rows: 4em 1fr 64px;
   grid-template-areas:
      'header'
      'main'
      'footer';

   header {
      grid-area: header;
      padding: 0 5vw;
   }

   main {
      grid-area: main;
      background-color: $main-bg-color;
      margin: 0 5vw;
      padding: 2em;
      padding-bottom: 0.1em;
      border-top-left-radius: $main-border-radius;
      border-top-right-radius: $main-border-radius;
      overflow: hidden;
   }

   footer {
      grid-area: footer;
      padding: 0 5vw;
   }
}
</style>
