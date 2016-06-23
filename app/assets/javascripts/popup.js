function Popup(html, options) {
  return new PopupClass(html, options)
}

function PopupClass(html, options) {
  contents = $(html)
  this.popupWindow = $('<div class="popup"></div>')

  options = $.extend({}, {width: 70, fromTop: 20}, options || {})
  this.popupWindow.css({
    'width': options.width.toString() + '%', 
    'margin-left': (options.width/2 * -1).toString() + '%'
  })
  this.popupWindow.append(contents)

  this.distanceFromTop = options.fromTop.toString() + '%'
}
  
PopupClass.prototype.move = function (from, to, callback) {
  this.popupWindow.css('top', from)
  this.popupWindow.animate({top: to}, callback)
}

PopupClass.prototype.show = function (direction, callback) {
  $('body').append(this.popupWindow)
  startFrom = (direction == 'up') ? '180%' : '-80%'
  this.move(startFrom, this.distanceFromTop, callback)
  return this;
}
PopupClass.prototype.hide = function (direction) {
  moveTo = (direction == 'down') ? '180%' : '-80%'
  this.move(this.distanceFromTop, moveTo, function () {
    this.remove() // this == $('.popup') here
  })
}