// Now officially integrated into Vuetify:
//
//   https://github.com/vuetifyjs/vuetify/blob/master/src/components/VApp/mixins/app-breakpoint.js
//   https://github.com/vuetifyjs/vuetify/blob/master/src/components/VApp/mixins/app-breakpoint.spec.js

/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 * Useful to e.g. adapt the user interface from inside a Vue component
 * as opposed to using CSS classes. The breakpoint pixel values and
 * range names are taken from Vuetify (https://github.com/vuetifyjs).
 *
 * Use within a component:
 *
 *   import breakpoint from './breakpoint.js';
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [breakpoint],
 *     ...
 *
 * Then inside a template:
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 */
var breakpoint = {
  data() {
    return {
      clientWidth: 0,
      clientHeight: 0,
    }
  },
  computed: {
    $breakpoint() {
      let xs = this.clientWidth < 600
      let sm = this.clientWidth < 1024 && !xs
      let md = this.clientWidth < (1440 - 16) && !(sm || xs)
      let lg = this.clientWidth < (1920 - 16) && !(md || sm || xs)
      let xl = this.clientWidth >= (1920 - 16) && !(lg || md || sm || xs)

      let xsOnly = xs
      let smOnly = sm
      let smAndDown = (xs || sm) && !(md || lg || xl)
      let smAndUp = !xs && (sm || md || lg || xl)
      let mdOnly = md
      let mdAndDown = (xs || sm || md) && !(lg || xl)
      let mdAndUp = !(xs || sm) && (md || lg || xl)
      let lgOnly = lg
      let lgAndDown = (xs || sm || md || lg) && !xl
      let lgAndUp = !(xs || sm || md) && (lg || xl)
      let xlOnly = xl

      let name
      switch(true) {
        case (xs):
          name = 'xs'
          break
        case (sm):
          name = 'sm'
          break
        case (md):
          name = 'md'
          break
        case (lg):
          name = 'lg'
          break
        default:
          name = 'xl'
          break
      }

      let result = {
        // Definite breakpoint.
        'xs': xs,
        'sm': sm,
        'md': md,
        'lg': lg,
        'xl': xl,

        // Useful e.g. to construct CSS class names dynamically.
        'name': name,

        // Breakpoint ranges.
        'xsOnly': xsOnly,
        'smOnly': smOnly,
        'smAndDown': smAndDown,
        'smAndUp': smAndUp,
        'mdOnly': mdOnly,
        'mdAndDown': mdAndDown,
        'mdAndUp': mdAndUp,
        'lgOnly': lgOnly,
        'lgAndDown': lgAndDown,
        'lgAndUp': lgAndUp,
        'xlOnly': xlOnly,

        // For custom breakpoint logic.
        'width': this.clientWidth,
        'height': this.clientHeight
      }
      return result
    },
  },
  methods: {
    _updateDimensions() {
      // Cross-browser support as described in:
      // https://stackoverflow.com/questions/1248081
      this.clientWidth = Math.max(document.documentElement.clientWidth,
                                  window.innerWidth || 0)
      this.clientHeight = Math.max(document.documentElement.clientHeight,
                                   window.innerHeight || 0)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._updateDimensions()
      window.addEventListener('resize', this._updateDimensions,
                              {'passive': true})
    })
  },
  destroyed() {
    window.removeEventListener('resize', this._updateDimensions)
  },
}
export default breakpoint
