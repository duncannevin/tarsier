<template>
  <md-app id="app">
    <md-app-content style="padding: 0;">
      <top-bar/>
      <spinner/>
      <status-modal/>
      <router-view/>
    </md-app-content>
  </md-app>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  import TopBar from '@/components/TopBar.vue'
  import Spinner from '@/components/Spinner.vue'
  import {inject} from 'inversify-props'
  import {InterceptorServiceImpl} from '@/services/interceptor.service.impl'
  import {Action} from 'vuex-class'
  import StatusModal from '@/components/StatusModal.vue'

  const spinnerState: string = 'spinnerState'

  @Component({
    components: {
      Spinner,
      TopBar,
      StatusModal
    }
  })
  export default class App extends Vue {
    @inject() private interceptorService!: InterceptorServiceImpl
    @Action('show', {namespace: spinnerState}) private showSpinner: any
    @Action('hide', {namespace: spinnerState}) private hideSpinner: any

    private beforeMount() {
      this.interceptorService.initializeInterceptors()
      this.interceptorService.pushRequestMethod(this.showSpinner)
      this.interceptorService.pushResponseMethod(this.hideSpinner)
      this.interceptorService.pushErrorMethod(this.hideSpinner)
    }
  }
</script>

<style lang="scss">
  @import "styles/colors";

  html,
  body,
  #app {
    height: 100%;
    font-family: "Manrope", serif;
    font-weight: 300;
    background-color: black;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;

    .md-scrollbar {
    }
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
