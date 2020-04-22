<template>
  <md-app-toolbar id="top-bar">
    <div class="md-toolbar-section-start">
      <div class="md-title"><h1>{{locales.title}}</h1></div>
      <img class="md-icon" alt="A Tarsier" src="../assets/tarsier-dilated.jpg"/>
    </div>
    <div class="md-toolbar-section-end">
    </div>
  </md-app-toolbar>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {Inject} from 'inversify-props'
  import {LocaleServiceImpl} from '@/services/locale.service.impl'
  import Logo from '@/components/Logo.vue'

  @Component({
    components: {
      Logo
    }
  })
  export default class TopBar extends Vue {
    @Inject() private localeService!: LocaleServiceImpl

    private readonly locales = {
      title: this.localeService.getLocale('common', 'title')
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/colors";

  #top-bar {
    z-index: 1000;
    position: fixed;
    text-align: left;
    padding: 8px 20px 0 20px;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;

    .md-toolbar-section-start {
      margin: 0;

      .md-title {
        font-size: 1em;
      }

      .md-icon {
        margin: 0 0.2em;
        height: 2em;
        width: auto;

        @media (max-width: 350px) {
          display: none;
        }
      }
    }

    .md-toolbar-section-end {
    }
  }
</style>
