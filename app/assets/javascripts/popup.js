function Popup(html) {
  contents = $(html)
  popupWindow = $('<div class="popup"></div>')
  popupWindow.append(contents)
  
  function move(from, to, callback) {
    $(popupWindow).css('top', from)
    $(popupWindow).animate({top: to}, callback)
  }

  this.show = function (direction) {
    $('body').append(popupWindow)
    startFrom = (direction == 'up') ? '150%' : '-50%'
    move(startFrom, '30%')
    return this;
  }
  this.hide = function (direction) {
    moveTo = (direction == 'down') ? '150%' : '-50%'
    move('30%', moveTo, function () {
      popupWindow.remove()
    })
  }
  return this;
}