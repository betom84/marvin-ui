<template>
   <div class="wrapper">
      <div></div>

      <div>
         <img src="@/assets/marvin-64px.png" alt="" />
      </div>
   </div>
</template>

<script>
export default {
   name: 'Footer',
};
</script>

<style lang="scss" scoped>
.wrapper {
   display: flex;
   flex-direction: column;
   height: 100%;

   div {
      height: 50%;

      &:first-of-type {
         border-bottom-left-radius: $main-border-radius;
         border-bottom-right-radius: $main-border-radius;
         background-color: $main-bg-color;
      }

      &:last-of-type {
         img {
            position: absolute;
            bottom: 0;
            right: 0;
            padding-right: 6vw;
         }
      }
   }
}
</style>
