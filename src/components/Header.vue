<template>
   <div>
      <nav>
         <router-link to="/">Configuration</router-link>
         <router-link to="/">Endpoints</router-link>
         <router-link to="/">Log</router-link>
      </nav>

      <span class="service">Alexa-Server <StateToggle class="state" :checked="isRunning" @change="toggleState" /></span>
   </div>
</template>

<script>
import axios from 'axios';
import StateToggle from '@/components/StateToggle';

export default {
   name: 'Header',

   components: {
      StateToggle,
   },

   data: function () {
      return {
         serverState: 'unknown',
      };
   },

   computed: {
      isRunning() {
         return this.serverState === 'running';
      },
   },

   created() {
      this.fetchState();
   },

   methods: {
      fetchState() {
         axios
            .get('/api/alexa/state')
            .then((response) => {
               this.serverState = response.data.state;
            })
            .catch((err) => {
               this.serverState = err;
            });
      },

      toggleState(state) {
         if (state === true) {
            this.serverState = 'running';
         } else {
            this.serverState = 'stopped';
         }

         axios.post(`/api/alexa/state?set=${this.serverState}`).catch((err) => {
            console.log(err.response.data.error || err);
            this.fetchState();
         });
      },
   },
};
</script>

<style lang="scss" scoped>
div {
   display: flex;
   align-items: center;
   justify-content: space-between;
   height: 100%;
   font-family: $font-headline;

   nav {
      display: flex;

      a {
         padding: 0.5em 1em;
         color: $color-fg-color;
         font-weight: bold;
         background-color: $color-bg-light;
         text-decoration: none;
         transition: all 0.3s ease 0s;

         &:hover {
            color: $color-fg-highlight;
         }

         &:first-of-type {
            border-top-left-radius: $main-border-radius;
            border-bottom-left-radius: $main-border-radius;
         }

         &:last-of-type {
            border-top-right-radius: $main-border-radius;
            border-bottom-right-radius: $main-border-radius;
         }
      }
   }

   .service {
      padding: 0.5em 1em;
      background-color: $color-bg-light;
      border-radius: $main-border-radius;

      .state {
         margin-left: 1em;
         padding-left: 1em;
      }
   }
}
</style>
