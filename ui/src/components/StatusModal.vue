<template>
  <div id="success-modal" class="overlay-content" v-if="statusShowing" @click="hideStatus">
    <h1 class="animated bounceInDown">{{statusHeader}}</h1>
    <p class="animated bounceInUp">{{statusBody}}</p>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import Logo from './Logo.vue'
  import {Action, Getter} from 'vuex-class'

  const statusModalState: string = 'statusModalState'

  @Component({
    components: {
      Logo
    }
  })
  export default class StatusModal extends Vue {
    @Getter('showing', {namespace: statusModalState}) private statusShowing!: boolean
    @Getter('header', {namespace: statusModalState}) private statusHeader!: boolean
    @Getter('body', {namespace: statusModalState}) private statusBody!: boolean
    @Action('hide', {namespace: statusModalState}) private hideStatus: any
  }
</script>

<style scoped lang="scss">
  #success-modal {
    h1 {
      font-size: 3em;
    }

    p {
      font-size: 1em;
    }
  }
</style>
