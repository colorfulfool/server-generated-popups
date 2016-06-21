function Popup(html, options) {
  contents = $(html)
  this.popupWindow = $('<div class="popup"></div>')

  options = $.extend({}, {width: 70, fromTop: 20}, options || {})
  this.popupWindow.css({
    'width': options.width.toString() + '%', 
    'margin-left': (options.width/2 * -1).toString() + '%'
  })
  this.popupWindow.append(contents)

  distanceFromTop = options.fromTop.toString() + '%'
  
  function move(from, to, callback) {
    this.popupWindow.css('top', from)
    this.popupWindow.animate({top: to}, callback)
  }

  this.show = function (direction) {
    $('body').append(this.popupWindow)
    startFrom = (direction == 'up') ? '150%' : '-50%'
    move(startFrom, distanceFromTop)
    return this;
  }
  this.hide = function (direction) {
    moveTo = (direction == 'down') ? '150%' : '-50%'
    move(distanceFromTop, moveTo, function () {
      this.popupWindow.remove()
    })
  }
  return this;
}