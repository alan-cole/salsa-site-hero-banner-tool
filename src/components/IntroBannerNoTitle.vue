<template>
  <div
    class="intro-banner-no-title"
    :class="{
      'intro-banner-no-title--no-links': !hasLinks,
      'intro-banner-no-title--collapsed': isCollapsed
    }"
  >
    <rpl-row>
      <div class="intro-banner-no-title__left">
        <p v-if="text" class="intro-banner-no-title__title">{{ text }}</p>
      </div>
      <div class="intro-banner-no-title__right" v-if="hasLinks">
        <ul class="intro-banner-no-title__link-list">
          <li
            v-for="(item, index) of links"
            :key="index"
            class="intro-banner-no-title__link-list-item"
          >
            <rpl-text-link
              class="intro-banner-no-title__link"
              :text="item.text"
              :url="item.url"
              iconSymbol="arrow_right_primary"
              iconColor="primary"
              :underline="true"
              :size="textLinkSize"
            />
          </li>
        </ul>
      </div>
    </rpl-row>
  </div>
</template>

<script>
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import { RplTextLink } from '@dpc-sdp/ripple-link'
import { RplRow } from '@dpc-sdp/ripple-grid'

export default {
  name: 'RplIntroBannerNoTitle',
  mixins: [breakpoint],
  props: {
    text: String,
    links: Array,
    themeBp: { type: Object },
    isCollapsibleOnThemeBelow: { type: Boolean, default: false }
  },
  components: {
    RplTextLink,
    RplRow
  },
  computed: {
    textLinkSize () {
      return this.$breakpoint.m ? 'large' : 'small'
    },
    hasLinks () {
      return (this.links && this.links.length > 0)
    },
    isCollapsed () {
      return (this.isCollapsibleOnThemeBelow && this.currentTheme === 'below')
    },
    currentTheme () {
      let theme = 'light'
      // Set theme based on breakpoint (small to large). Empty values are passed-through.
      if (this.themeBp && process.client) {
        theme = this.breakpointsSmallToLarge.reduce((prev, { label }) => {
          return (this.$breakpoint[label] && this.themeBp[label]) ? this.themeBp[label] : prev
        }, 'light')
      }
      return theme
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $intro-banner-no-title-title-typography-ruleset: (
    'xs': ('l', 1.2em, 'regular'),
    'm': ('mega', 1.2em, 'regular')
  );
  $intro-banner-no-title-title-color: rpl_color('primary');
  $intro-banner-no-title-link-margin: auto auto $rpl-space-2;
  $intro-banner-no-title-vertical-spacing: (
    'xs': ('top': ($rpl-space * 10), 'bottom': ($rpl-space * 10)),
    's': ('top': ($rpl-space * 13), 'bottom': ($rpl-space * 13)),
  );

  .intro-banner-no-title {
    $root: &;
    @include rpl_mobile_padding;
    position: relative;
    border-bottom: 1px solid rpl-color('mid_neutral_1');

    @each $bp, $spacing in $intro-banner-no-title-vertical-spacing {
      @include rpl_breakpoint($bp) {
        padding-top: map-get($spacing, top);
        padding-bottom: map-get($spacing, bottom);
      }
    }

    &--collapsed {
      @each $bp, $spacing in $intro-banner-no-title-vertical-spacing {
        @include rpl_breakpoint($bp) {
          padding-top: $rpl-space * 6;
        }
      }
    }

    @include rpl_print_margin('l');

    &__left {
      @include rpl_grid_full;

      @include rpl_breakpoint('xl') {
        @include rpl_grid_column(8);
      }

      #{$root}--no-links & {
        @include rpl_breakpoint('xl') {
          @include rpl_grid_column(10);
        }
      }
    }

    &__right {
      @include rpl_grid_full;
      z-index: $rpl-zindex-content-top;
      margin-top: $rpl-space-4;

      @include rpl_breakpoint('xl') {
        margin-top: 0;
        @include rpl_grid_column(4);
      }

      @include rpl_print_hidden;
    }

    &__title {
      @include rpl_typography_ruleset($intro-banner-no-title-title-typography-ruleset);
      @include rpl_text_color($intro-banner-no-title-title-color);
      margin: 0;
    }

    &__link-list {
      margin: 0;
      padding: 0;

      @include rpl_breakpoint('s') {
        column-count: 2;
        column-gap: rem(50px);
      }

      @include rpl_breakpoint('m') {
        column-count: auto;
      }
    }

    &__link-list-item {
      list-style: none;
      margin: $intro-banner-no-title-link-margin;
    }
  }
</style>
