import store from '@/store'

export const appCodeMixin = {
  methods: {
    getCodes: function(itemCd) {
      const result = []
      const appCfg = store.getters && store.getters.appCfg
      if (appCfg) {
        const itemCfg = appCfg[itemCd]
        if (itemCfg) {
          itemCfg.Items.forEach(temp => {
            result.push({value: temp.valueCd, label: temp.valueName})
          })
        }
      } else {
        store.dispatch('loadAppCfg').then(() => {
          this.result = this.getCodes(itemCd)
        })
      }
      return result
    }
  },
  getCharSize: function(text, style = {}) {
    const useStyle = {
      fontSize: '12px',
      fontFamily: 'SimSun',
      ...style
    }

    const span = document.createElement('span')
    span.style.font = `${useStyle.fontSize} ${useStyle.fontFamily}`
    span.innerHTML = text
    document.body.appendChild(span)
    const rect = span.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    document.body.removeChild(span)
    return {
      width,
      height
    }
  }
}
export const appMixin = {
  methods: {
    getMainHeight: function() {
      return this.$store.getters.height
    },
    getCharSize: function(text, style = {}) {
      const useStyle = {
        fontSize: '12px',
        fontFamily: 'SimSun',
        ...style
      }

      const span = document.createElement('span')
      span.style.font = `${useStyle.fontSize} ${useStyle.fontFamily}`
      span.innerHTML = text
      document.body.appendChild(span)
      const rect = span.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      document.body.removeChild(span)
      return {
        width,
        height
      }
    }
  }
}
