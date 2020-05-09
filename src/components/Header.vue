<template>
   <div>
      <input class="menu__checkbox" type="checkbox" id="menu__checkbox" />
      <label class="menu__label" for="menu__checkbox">
         <span />
         <span />
         <span />
      </label>

      <nav>
         <router-link to="/">Configuration</router-link>
         <router-link to="/">Endpoints</router-link>
         <router-link to="/">Log</router-link>

         <AlexaStateToggle class="alexaStateToggle" />
      </nav>
   </div>
</template>

<script>
import AlexaStateToggle from '@/components/AlexaStateToggle';

export default {
   name: 'Header',

   components: {
      AlexaStateToggle,
   },
};
</script>

<style lang="scss" scoped>
div {
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: space-between;
   height: 100%;
   width: 100%;
   font-family: $font-headline;

   .menu {
      &__label {
         display: flex;
         flex-direction: column;
         justify-content: space-evenly;

         margin-top: 0.5em;
         width: 3em;
         height: 3em;

         @include breakpoint(min, tablet) {
            display: none;
         }

         span {
            margin: 0 10%;
            width: 80%;
            height: 15%;
            background-color: $color-bg-light;
            border-radius: $main-border-radius;

            transition: all 0.2s linear;
         }
      }

      &__checkbox {
         display: none;
      }

      &__checkbox:checked ~ nav {
         opacity: 1;
         visibility: visible;
      }

      &__checkbox:checked ~ label > span {
         &:nth-of-type(1) {
            transform: translateY(0.9em) rotate(45deg);
         }
         &:nth-of-type(2) {
            opacity: 0;
         }
         &:nth-of-type(3) {
            transform: translateY(-0.9em) rotate(-45deg);
         }
      }
   }

   nav {
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow: visible;
      z-index: 99;

      border-bottom: 1em solid $color-bg-dark;

      opacity: 0;
      visibility: hidden;
      transition: visibility 1s linear, opacity 0.2s linear;

      @include breakpoint(min, tablet) {
         flex-direction: row;
         border-bottom: none;
         transition: none;
         visibility: visible;
         opacity: 1;
      }

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

         @include breakpoint(min, tablet) {
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

      .alexaStateToggle {
         padding-top: 2em;

         @include breakpoint(min, tablet) {
            padding-top: 0.5em;
            margin-left: auto;
         }
      }
   }
}
</style>
