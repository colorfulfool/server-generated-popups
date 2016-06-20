function Popup(html, options) {
  contents = $(html)
  popupWindow = $('<div class="popup"></div>')

  options = $.extend({}, {width: 70, fromTop: 20}, options || {})
  popupWindow.css({
    'width': options.width.toString() + '%', 
    'margin-left': (options.width/2 * -1).toString() + '%'
  })
  popupWindow.append(contents)

  distanceFromTop = options.fromTop.toString() + '%'
  
  function move(from, to, callback) {
    $(popupWindow).css('top', from)
    $(popupWindow).animate({top: to}, callback)
  }

  this.show = function (direction) {
    $('body').append(popupWindow)
    startFrom = (direction == 'up') ? '150%' : '-50%'
    move(startFrom, distanceFromTop)
    return this;
  }
  this.hide = function (direction) {
    moveTo = (direction == 'down') ? '150%' : '-50%'
    move(distanceFromTop, moveTo, function () {
      popupWindow.remove()
    })
  }
  return this;
}