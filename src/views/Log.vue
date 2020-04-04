<template>
   <div class="wrapper">
      <div class="console" @scroll="onScroll">
         <div v-html="log" class="lines" />
         <div v-if="canFetchMore" ref="load" class="loading">Loading more...</div>
      </div>
   </div>
</template>

<script>
import axios from 'axios';

export default {
   data: function () {
      return {
         logLines: [],
         canFetchMore: true,
         searchTerm: '',
      };
   },

   computed: {
      log() {
         return this.logLines
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
   },

   created() {
      this.fetchLog();
   },

   methods: {
      onScroll(event) {
         if (!this.canFetchMore) {
            return;
         }

         let lb = this.$refs['load'].getBoundingClientRect();
         let cb = event.target.getBoundingClientRect();

         if (lb.top < cb.bottom) {
            this.fetchLog();
         }
      },

      onSearchTermInput() {
         this.v;
      },

      fetchLog() {
         let offset = this.logLines.length || 0;

         this.canFetchMore = false;
         axios
            .get(`/api/log?limit=50&offset=${offset}`)
            .then((response) => {
               this.logLines = [...this.logLines, ...response.data.lines.reverse()];

               if (response.data.lines.length > 0) {
                  this.canFetchMore = true;
               }
            })
            .catch((err) => {
               this.logLines = [err.String()];
            });
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
