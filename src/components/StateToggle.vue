<template>
   <label class="switch">
      <input v-bind="$attrs" type="checkbox" @change="$emit('change', $event.target.checked)" />
      <span class="slider" />
   </label>
</template>

<script>
export default {
   name: 'StateToggle',
   inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.switch {
   position: relative;
   display: inline-block;
   width: 2.4em;
   height: 1.4em;

   input {
      opacity: 0;
      height: 0;
      width: 0;

      &:checked + .slider {
         background-color: $color-fg-color;
      }

      &:focus + .slider {
         box-shadow: 0 0 1px $color-fg-color;
      }

      &:checked + .slider:before {
         transform: translateX(1em);
      }
   }

   .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $color-fg-highlight;
      transition: 0.4s;
      border-radius: $main-border-radius;

      &:before {
         position: absolute;
         content: '';
         height: 1em;
         width: 1em;
         left: 0.2em;
         bottom: 0.2em;
         background-color: $color-bg-light;
         transition: 0.4s;
         border-radius: $main-border-radius;
      }
   }
}
</style>
