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

  Number.prototype.butNoGreaterThan = function (otherNumber) {
    return Math.min(this, otherNumber)
  }

  function minus(number) { return number * -1 }
  function half(number) { return number/2 }
  function px(number) { return number.toString() + 'px' }

  function defaultsFor(options, defaultOptions) {
    return Object.assign(defaultOptions, options)
  }


  // Constructs a Popup object.
  // Options: width, padding, backdrop, closeButton
  function PopupClass(content, options) {
    this.options = defaultsFor(options, 
      {width: 600, backdrop: true, closeButton: true})

    this.createPopupWindow(content)
    this.createBackdrop()
  }
  
  // Slides the popup onto screen.
  PopupClass.prototype.show = function (direction, callback) {
    
    appendToBody(this.popupWindow)
    this.slideWindow('show', direction, this.bind(callback))

    if (this.options.backdrop)    this.showBackdrop()
    if (this.options.closeButton) this.createCloseButton()
      
    return this
  }

  // Slides the popup out of screen.
  PopupClass.prototype.hide = function (direction) {
    var callback = () => { removeElement(this.popupWindow) }

    this.slideWindow('hide', direction, this.bind(callback))

    this.hideBackdrop()
  }


  PopupClass.prototype.hideByClickOn = function (element) {
    element.onclick = () => {
      this.hide('down')
    }
  }

  PopupClass.prototype.bind = function (func) {
    if (func != undefined)
      return func.bind(this, this.popupWindow)
  }  
  
  PopupClass.prototype.currentPosition = () => null
  PopupClass.prototype.belowScreen = () => '180%'
  PopupClass.prototype.aboveScreen = () => '-80%'
  PopupClass.prototype.onScreen = function () {
    return px( half(window.innerHeight - this.popupWindow.offsetHeight) )
  }

  PopupClass.prototype.slideWindow = function (action, direction, callback) {
    [start, finish] = { 
      show: {
          up:   [this.belowScreen(), this.onScreen()],
          down: [this.aboveScreen(), this.onScreen()]},
      hide: {
          up:   [this.currentPosition(), this.aboveScreen()],
          down: [this.currentPosition(), this.belowScreen()]}
    }[action][direction]
    this.translate(start, finish, callback)
  }

  PopupClass.prototype.translate = function (start, finish, callback) {
    if (start)
      setStyle(this.popupWindow, {top: start})

    setTimeout( // wait for CSS to notice `start`
      () => {
        setStyle(this.popupWindow, {top: finish}) // trigger CSS animation

        setTimeout( // wait for animation to finish
          () => {
            if (callback)
              callback()
          }, 400)
      }, 1
    )
  }

  PopupClass.prototype.createPopupWindow = function (content) {
    popupWidth = this.options.width.butNoGreaterThan(window.innerWidth)

    this.popupWindow = createElement(
      '<div class="popup">' + content + '</div>', 
      {
        zIndex: 1050,
        position: 'fixed',
        left: '50%',

        width: px( popupWidth ),
        marginLeft: px( minus(half(popupWidth)) ),

        padding: this.options.padding
      })
  }

  PopupClass.prototype.createBackdrop = function () {
    this.backdrop = createElement(
      '<div id="popup-backdrop"></div>',
      { 
        zIndex: 1040,
        position: 'fixed', 
        top: 0, left: 0, right: 0, bottom: 0
      })

    this.hideByClickOn(this.backdrop)
    appendToBody(this.backdrop)
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

  PopupClass.prototype.showBackdrop = function () {
    setStyle(this.backdrop, {visibility: 'visible', opacity: 1})
  }
  PopupClass.prototype.hideBackdrop = function () {
    setStyle(this.backdrop, {opacity: 0})
    setTimeout(() => {
      setStyle(this.backdrop, {visibility: 'hidden'})
    }, 400)
  }

})(window)
