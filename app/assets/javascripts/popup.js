(function (global) {
  global['Popup'] = function (content, options) {
    return new PopupClass(content, options)
  }

  var nextPopupId = 0;


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

  function setElementPosition(element, position) {
    positionIsClass = isNaN(position)

    if (positionIsClass) {
      setStyle(element, {top: null}) // discard hard-coded `top` to make way
      element.classList.add(position) // for this CSS class' `top`
    }
    else {
      setStyle(element, {top: px(position)})
    }
  }

  function minus(number) { return number * -1 }
  function px(number) { return number.toString() + 'px' }

  function defaultsFor(options, defaultOptions) {
    return Object.assign(defaultOptions, options)
  }


  // Constructs a Popup object.
  // Options: width, padding
  function PopupClass(content, options) {
    this.options = defaultsFor(options, 
      {width: 600, backdrop: true, closeButton: true})

    popupWidth = Math.min(window.innerWidth, this.options.width)

    this.popupWindow = createElement(
      '<div class="popup">' + content + '</div>', 
      {
        'position': 'fixed',
        'left': '50%',
        'width': px(popupWidth), 
        'margin-left': px( minus(popupWidth/2) ),
        
        'padding': this.options.padding
      }
    )

    this.createBackdrop()
  }


  PopupClass.prototype.hideByClickOn = function (element) {
    var popupObject = this
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

    var popupWindow = this.popupWindow
    setTimeout( // wait for CSS to notice `start` class
      function () { // trigger the CSS animation
        setElementPosition(popupWindow, finish)

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
    setStyle(this.backdrop, {visibility: 'visible', opacity: 1})
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
  PopupClass.prototype.show = function (direction, callback) {
    if (callback != undefined)
      var callback = callback.bind(this, this.popupWindow)

    appendToBody(this.popupWindow)
    start = direction == 'up' ? 'below-screen' : 'above-screen'
    this.translate(start, this.distanceFromTop(), callback)

    if (this.options.backdrop)
      this.showBackdrop()
    if (this.options.closeButton)
      this.createCloseButton()
    return this
  }


  // Slides the popup out of the screen.
  // Accepts no options.
  PopupClass.prototype.hide = function (direction) {
    var popupWindow = this.popupWindow

    finish = direction == 'up' ? 'above-screen' : 'below-screen'
    this.translate(null, finish, function () {
      removeElement(popupWindow)
    })

    this.hideBackdrop()
  }


})(window)
