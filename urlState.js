/**
 * A Vue mixin to map local component state to URL query.
 *
 * Uses vue-router's $route.query to get/set the query params.
 *
 * Useful e.g. to store and restore filters to/from the URL.
 *
 */
var urlState = {
  data() {
    return {
      paramToUnwatcher: [],
    };
  },
  watch: {
    // Is extended/managed dynamically.
  },
  methods: {
    syncToUrl(param,
              urlParam=null,
              transformCallback=null) {
      if (urlParam === null) {
        urlParam = param
      }
      const unwatch = this.$watch(param, value => {
        if (transformCallback !== null) {
          value = transformCallback(value)
        }
        let query = Object.assign({}, this.$route.query)
        if (value) {
          query[urlParam] = value
        }
        else {
          delete query[urlParam]
        }
        this.$router.push({'query': query})
      })
      this.paramToUnwatcher[param] = unwatch
    },
    removeSyncToUrl(param) {
      let unwatch = this.paramToUnwatcher[param]
      if (unwatch) {
        unwatch()
      }
    },
  },
}

export default urlState
