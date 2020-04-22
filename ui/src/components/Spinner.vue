<template>
  <div id="spinner" class="overlay-content" v-if="spinnerShowing" @click="hideSpinner">
    <logo class="animated bounceInDown"></logo>
    <div class="sending animated bounceInUp">{{locales.sending}}<span class="bounce1"></span><span
      class="bounce2"></span><span class="bounce3"></span></div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {Action, Getter} from 'vuex-class'
  import Logo from '@/components/Logo.vue'
  import {Inject} from 'inversify-props'
  import {LocaleServiceImpl} from '@/services/locale.service.impl'

  const spinnerState: string = 'spinnerState'

  @Component({
    components: {
      Logo
    }
  })
  export default class Spinner extends Vue {
    @Getter('showing', {namespace: spinnerState}) private spinnerShowing!: boolean
    @Action('hide', {namespace: spinnerState}) private hideSpinner: any
    @Inject() private localeService!: LocaleServiceImpl

    private readonly locales = {
      sending: this.localeService.getLocale('common', 'sending')
    }

    get showing() {
      return this.spinnerShowing
    }
  }
</script>

<style lang="scss" scoped>
  #spinner {
    #logo {
      font-size: 2em;
    }

    .sending {
      font-size: 2em;
    }

    .sending > span {
      width: 0.25em;
      height: 0.25em;
      background-color: white;
      margin: 0 0.1em;
      border-radius: 100%;
      display: inline-block;
      -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .sending .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    .sending .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }

    @-webkit-keyframes sk-bouncedelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0)
      }
      40% {
        -webkit-transform: scale(1.0)
      }
    }

    @keyframes sk-bouncedelay {
      0%, 80%, 100% {
        -webkit-transform: scale(0);
        transform: scale(0);
      }
      40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
    }
  }
</style>
