<template>
   <div class="wrapper">
      <div class="console" @scroll="onScroll">
         <div v-html="log" class="lines" />
         <div v-if="canFetchMore" ref="load" class="loading">Loading more...</div>
      </div>
   </div>
</template>

<script>
export default {
   data: function () {
      return {};
   },

   computed: {
      log() {
         return this.$store.state.log.lines
            .map((line) => {
               let decoratedLine = line;

               if (line.toLowerCase().includes('error')) {
                  decoratedLine = `<span class='console-line--error'>${line}</span>`;
               }

               if (line.toLowerCase().includes('warn')) {
                  decoratedLine = `<span class='console-line--warn'>${line}</span>`;
               }

               return decoratedLine;
            })
            .join('<br/>');
      },

      canFetchMore() {
         return this.$store.state.log.canFetchMore;
      },
   },

   created() {
      this.$store.dispatch('log/fetch');
      this.$store.dispatch('log/listen');
   },

   beforeDestroy() {
      this.$store.dispatch('log/stopListen');
   },

   methods: {
      onScroll(event) {
         if (!this.canFetchMore) {
            return;
         }

         let lb = this.$refs['load'].getBoundingClientRect();
         let cb = event.target.getBoundingClientRect();

         if (lb.top < cb.bottom) {
            this.$store.dispatch('log/fetch');
         }
      },
   },
};
</script>

<style lang="scss" scoped>
.wrapper {
   height: 100%;

   .console {
      overflow: scroll;
      background-color: $color-fg;
      color: $color-fg-color;
      padding: 0.5em;

      height: 100%;

      .lines {
         font-family: $font-console;
         white-space: nowrap;
      }

      .loading {
         padding: 1em 0;
      }

      &::-webkit-scrollbar {
         -webkit-appearance: none;
      }

      &::-webkit-scrollbar:vertical {
         width: 11px;
         border-left: 5px solid $color-bg-light;
         border-right: 5px solid $color-bg-light;
      }

      &::-webkit-scrollbar:horizontal {
         height: 11px;
         border-top: 5px solid $color-bg-light;
         border-bottom: 5px solid $color-bg-light;
      }

      &::-webkit-scrollbar-thumb {
         box-shadow: inset 0 0 10px 10px $color-fg-color;
         border: 2px solid $color-bg-light;
         background-color: $color-bg-dark;
         border-radius: 5px;
      }

      &::-webkit-scrollbar-corner {
         background-color: $color-bg-light;
      }
   }
}
</style>
