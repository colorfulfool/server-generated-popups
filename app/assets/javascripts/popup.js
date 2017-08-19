(function (global) {
  global['Popup'] = function (content, options) {
    return new PopupClass(content, options)
  }


  function createElement(html, style) {
    div = document.createElement('div')
    div.innerHTML = html
    generated = div.firstChild
    if (style)
      setStyle(generated, style)
    return generated
  }
  function removeElement(element) {
    element.outerHTML = ''
  }
  function appendToBody(element) {
    document.body.appendChild(element)
  }
  function setStyle(element, properties) {
    Object.assign(element.style, properties)
  }

  function defaultsFor(options, defaultOptions) {
    return Object.assign(defaultOptions, options)
  }


  // Constructs a Popup object.
  // Options: width, padding
  function PopupClass(content, options) {
    this.options = defaultsFor(options, {width: 600})

    popupWidth = Math.min(window.innerWidth, this.options.width)

    this.popupWindow = createElement(
      '<div class="popup">' + content + '</div>', 
      {
        'width': popupWidth.toString() + 'px', 
        'margin-left': (popupWidth/2 * -1).toString() + 'px',
        'padding': this.options.padding
      }
    )

    this.createBackdrop()
  }


  PopupClass.prototype.hideByClickOn = function (element) {
    popupObject = this
    element.onclick = function () {
      popupObject.hide('down')
    }
  }
  
  PopupClass.prototype.distanceFromTop = function () {
    return (window.innerHeight - this.popupWindow.offsetHeight)/2
  }
  PopupClass.prototype.translate = function (start, finish, callback) {
    if (start)
      this.popupWindow.classList.add(start)

    popupWindow = this.popupWindow
    setTimeout( // wait for CSS to notice `start` class
      function () { // trigger the CSS animation
        if (isNaN(finish)) {
          setStyle(popupWindow, {top: null}) // discard hard-coded `top` to make way
          popupWindow.classList.add(finish) // for this CSS class' `top`
        }
        else {
          setStyle(popupWindow, {top: finish + 'px'})
        }
        setTimeout( // wait for it to finish
          function () {
            popupWindow.classList.remove(start)
            if (callback)
              callback()
          }, 400)
      }, 1
    )
  }


  PopupClass.prototype.createBackdrop = function () {
    this.backdrop = createElement('<div id="popup-backdrop"></div>')
    this.hideByClickOn(this.backdrop)
    appendToBody(this.backdrop)
  }
  PopupClass.prototype.showBackdrop = function () {
    setStyle(this.backdrop, {visibility: 'visible', opacity: 0.5})
  }
  PopupClass.prototype.hideBackdrop = function () {
    backdrop = this.backdrop
    setStyle(backdrop, {opacity: 0})
    setTimeout(function () {
      setStyle(backdrop, {visibility: 'hidden'})
    }, 400)
  }

  PopupClass.prototype.createCloseButton = function () {
    buttonPadding = this.options.closeButtonPadding || this.options.padding || '16px'
    
    closeButton = createElement(
      '<div class="closeButton"></div>', 
      {top: buttonPadding, right: buttonPadding}
    )

    this.hideByClickOn(closeButton)
    this.popupWindow.appendChild(closeButton)
  }


  // Slides the popup onto the screen.
  // Options: backdrop, closeButton, callback
  PopupClass.prototype.show = function (direction, options) {
    options = defaultsFor(options, {backdrop: true, closeButton: true})

    appendToBody(this.popupWindow)
    start = direction == 'up' ? 'below-screen' : 'above-screen'
    this.translate(start, this.distanceFromTop(), options.callback)

    if (options.backdrop)
      this.showBackdrop()
    if (options.closeButton)
      this.createCloseButton()
    return this
  }


  // Slides the popup out of the screen.
  // Accepts no options.
  PopupClass.prototype.hide = function (direction) {
    popupWindow = this.popupWindow

    finish = direction == 'up' ? 'above-screen' : 'below-screen'
    this.translate(null, finish, function () {
      removeElement(popupWindow)
    })

    this.hideBackdrop()
  }


})(window)
