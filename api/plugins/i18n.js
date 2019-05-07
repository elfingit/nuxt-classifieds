class i18n {
  constructor(lang) {
    this.lang = lang
    this.load()
  }
  load() {
    const messages = require('../../locales/' + this.lang + '.js')
    console.dir(messages)
  }
  __(key) {

  }
}

module.exports = i18n