'use strict'

class FormErrors {
  constructor(errors, form) {
    this.errors = errors
    this.form = form
  }

  display() {
    for (let i in this.errors) {
      var name = this.errors[i].code

      var field = this.form.querySelector('[name="' + name + '"]')
      
      field.style.borderColor = 'red'

      var small = document.createElement('small')
      small.classList.add('form-text')
      small.classList.add('error')

      const text = document.createTextNode(this.errors[i].message)
      small.appendChild(text)
      field.parentNode.appendChild(small)
    }
  }

  clearError(field) {
    field.style.borderColor = null
    
    if (field.parentNode.querySelector('small')) {
      field.parentNode.querySelector('small').remove()
    }
  }
}

export default FormErrors 