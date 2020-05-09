<template>
   <span>Alexa-Server <Toggle class="toggle" :checked="isRunning" @change="toggleState" /></span>
</template>

<script>
import axios from 'axios';
import Toggle from '@/components/Toggle';

export default {
   name: 'AlexaStateToggle',

   components: {
      Toggle,
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
span {
   padding: 0.5em 1em;
   background-color: $color-bg-light;
   border-radius: $main-border-radius;

   .toggle {
      margin-left: 1em;
      padding-left: 1em;
   }
}
</style>
