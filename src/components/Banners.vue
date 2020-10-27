<template>
  <div>
    <!-- Controls -->
    <div class="controls">
      <div class="field">
        <select v-model="controls.theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="transparent">Transparent</option>
          <option value="below">Below</option>
        </select>
        <div>
          <label for="field_show_links">Show Links</label>
          <input id="field_show_links" type="checkbox" v-model="controls.showKeyLinks">
        </div>
        <div>
          <label for="field_show_breadcrumbs">Show Breadcrumbs</label>
          <input id="field_show_breadcrumbs" type="checkbox" v-model="controls.showCrumbs">
        </div>
      </div>
      <div class="field">
        <div>
          <label class="full-label" for="field_title">Title</label>
          <input id="field_title" type="text" v-model="controls.title">
        </div>
        <div>
          <label class="full-label" for="field_intro_text">Intro Text</label>
          <input id="field_intro_text" type="text" v-model="controls.introText">
        </div>
      </div>
      <div class="field">
        <div>
          <label class="full-label" for="field_desktop_image">Desktop</label>
          <input id="field_desktop_image" type="file" ref="fileDesktop" @change="updateBanner" />
        </div>
        <div>
          <label class="full-label" for="field_mobile_image">Mobile</label>
          <input id="field_mobile_image" type="file" ref="fileMobile" @change="updateBanner" />
        </div>
      </div>
    </div>
    <!-- Ripple Base Layout -->
    <rpl-base-layout>
      <template slot="header">
        <rpl-site-header v-bind="header" />
      </template>
      <rpl-page-layout
        :backgroundGraphic="topGraphic"
        :heroBackgroundImage="{ srcBp: layoutImageSrcBp, themeBp: heroBannerData.themeBp }"
      >
        <template slot="breadcrumbs">
          <rpl-breadcrumbs v-if="controls.showCrumbs" :crumbs="breadcrumbs" />
        </template>
        <template slot="aboveContent">
          <rpl-hero-banner v-bind="heroBannerData" class="rpl-site-constrain--on-all" />
        </template>
        <template slot="aboveContentTwo">
          <intro-banner-no-title
            class="rpl-site-constrain--on-all"
            text="Proident elit aliqua eu anim fugiat ullamco ad laborum enim ullamco cillum aute proident ut."
            :themeBp="heroBannerData.themeBp"
            :isCollapsibleOnThemeBelow="heroBannerData.isCollapsibleOnThemeBelow"
          />
        </template>
      </rpl-page-layout>
    </rpl-base-layout>
  </div>
</template>

<script>
import { RplPageLayout, RplBaseLayout } from '@dpc-sdp/ripple-layout'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'
import RplBreadcrumbs from '@dpc-sdp/ripple-breadcrumbs'
import { RplHeroBanner } from '@dpc-sdp/ripple-hero-banner'
import IntroBannerNoTitle from './IntroBannerNoTitle'
import topGraphicSrc from '../assets/img/header-pattern-shape.png'
import bottomGraphicSrc from '../assets/img/header-pattern-bottom.png'

export default {
  name: 'AppTestBanners',
  components: {
    RplBaseLayout,
    RplPageLayout,
    RplBreadcrumbs,
    RplHeroBanner,
    RplSiteHeader,
    IntroBannerNoTitle
  },
  data () {
    return {
      publicPath: process.env.BASE_URL,
      header: {
        links: [
          { text: 'Link A', url: '#' },
          { text: 'Link B', url: '#' },
          { text: 'Link C', url: '#' }
        ],
        breakpoint: 992,
        sticky: false,
        hideOnScroll: false,
        showSearch: false,
        showLogout: false
      },
      breadcrumbs: [
        { text: 'Home', url: '#' },
        { text: 'Page', url: '#' }
      ],
      controls: {
        theme: 'light',
        fileDesktop: '',
        fileMobile: '',
        showKeyLinks: false,
        showCrumbs: true,
        title: 'Test Theme',
        introText: 'Aliqua reprehenderit laborum ad consequat proident aliquip est consectetur aute ut dolor esse proident et enim ad.'
      }
    }
  },
  methods: {
    updateBanner () {
      if (this.$refs['fileDesktop'].files && this.$refs['fileDesktop'].files.length > 0) {
        var fileReaderDesktop = new FileReader()
        fileReaderDesktop.onload = () => {this.controls.fileDesktop = fileReaderDesktop.result }
        fileReaderDesktop.readAsDataURL(this.$refs['fileDesktop'].files[0])
      }

      if (this.$refs['fileMobile'].files && this.$refs['fileMobile'].files.length > 0) {
        var fileReaderMobile = new FileReader()
        fileReaderMobile.onload = () => { this.controls.fileMobile = fileReaderMobile.result }
        fileReaderMobile.readAsDataURL(this.$refs['fileMobile'].files[0])
      }
    }
  },
  computed: {
    heroBannerData () {
      let currentBp = null
      switch (this.controls.theme) {
        case 'light':
          currentBp = { xs: 'light', s: 'light', l: 'light' }
          break
        case 'dark':
          currentBp = { xs: 'dark', s: 'dark', l: 'dark' }
          break
        case 'transparent':
          currentBp = { xs: 'transparent', s: 'transparent', l: 'transparent' }
          break
        case 'below':
          currentBp = { xs: 'below', s: 'below', l: 'below' }
          break
      }
      return {
        title: this.controls.title,
        introText: this.controls.introText,
        linkHeading: 'Want to know more about...',
        links: [
          { text: 'First journey based link', url: '#' },
          { text: 'Secondary journey based link', url: '#' },
          { text: 'Third link goes here', url: '#' },
          { text: 'Fourth journey based link', url: '#' }
        ],
        moreLink: { text: 'See more', url: '#' },
        themeBp: currentBp,
        isCollapsibleOnThemeBelow: (this.controls.theme === 'below'),
        showLinks: this.controls.showKeyLinks,
        backgroundGraphic: this.bottomGraphic
      }
    },
    layoutImageSrcBp () {
      if (this.controls.fileDesktop && this.controls.fileMobile) {
        return {
          'xs': this.controls.fileMobile,
          'm': this.controls.fileDesktop
        }
      } else if (this.controls.fileDesktop) {
        return { 'xs': this.controls.fileDesktop }
      } else {
        return null
      }
    },
    topGraphic () {
      return (process.env.NODE_ENV === 'development') ? topGraphicSrc : `img/header-pattern-shape.png`
    },
    bottomGraphic () {
      return (this.layoutImageSrcBp == null) ? ((process.env.NODE_ENV === 'development') ? bottomGraphicSrc : `img/header-pattern-bottom.png`) : ''
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

.controls {
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: grey;
  padding: 10px;

  @include rpl-breakpoint('m') {
    display: flex;
  }

  .full-label {
    display: block;
  }

  .field {
    width: 100%;
    @include rpl-breakpoint('m') {
      width: 33.33%;
    }

    input {
      max-width: 200px;
    }
  }
}

// Site header
.rpl-site-header {
  &.rpl-site-header--open {
    &::before {
      display: none;
    }
  }

  &::before {
    content: '';
    display: block;
    background-image: url('../assets/img/logo-primary.png');
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    user-select: none;
    background-size: rem(102px);
    width: rem(102px);
    height: rem(68px);
    margin-left: $rpl-space * 14;
    top: 0;

    @include rpl-breakpoint('s') {
      top: rem(11px);
      margin-left: $rpl-space * 23;
    }

    @include rpl-breakpoint('m') {
      top: rem(7px);
      background-size: rem(160px);
      width: rem(160px);
      height: rem(88px);
    }

    @include rpl-breakpoint('l') {
      margin-left: $rpl-space * 5;
    }
  }

  &__title {
    .rpl-link {
      display: block;
      position: relative;
      z-index: 1;
      width: rem(111px);
      height: rem(24px);

      @include rpl-breakpoint('s') {
        height: rem(24px);
      }

      @include rpl-breakpoint('m') {
        width: rem(160px);
        height: rem(48px);
      }

      @include rpl-breakpoint('l') {
        width: rem(170px);
      }
    }

    img {
      opacity: 0;
      height: rem(24px);

      @include rpl-breakpoint('m') {
        height: rem(48px);
      }
    }
  }

  &__btn--menu {
    border-right: 0 !important;
  }
}

.rpl-menu--horizontal .rpl-menu__items--root > .rpl-menu__item > .rpl-menu__item-link--active::after {
  background-color: #9A9DA7 !important;
}

// Breadcrumbs
.rpl-breadcrumbs {
  margin-top: $rpl-space * 5;
}

// Icons
.rpl-icon--color_primary {
  fill: rpl-color('salsared') !important;
}

.rpl-site-header-search .rpl-search-form__field::after {
  background-color: rpl-color('salsared');
}

.rpl-above-content__back-image--wrap {
  @include rpl-breakpoint('xxl') {
    min-height: 50vh !important;
  }
}

.rpl-hero-banner {
  $root: &;

  .rpl-above-content-container--with-bg &:not(.rpl-hero-banner--collapsed) {
    @include rpl-breakpoint('xxl') {
      padding-top: 25vh !important;
    }
  }

  &__title {
    #{$root}--transparent & {
      span {
        background-color: rgba(61, 69, 77, 0.88) !important;
      }
    }
  }

  &__description {
    #{$root}--dark &,
    #{$root}--transparent & {
      span {
        padding: 0 rem(8px);
        box-decoration-break: clone;
        line-height: 1.23em;
      }
    }
    #{$root}--transparent & {
      span {
        background-color: rgba(61, 69, 77, 0.88) !important;
      }
    }
  }
}
</style>