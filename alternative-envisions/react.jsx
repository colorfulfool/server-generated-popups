class Popup extends Component {
  state = { shown: false }

  show = () =>
    this.setState({windowPosition: belowScreen()})
      .then({shown: true})

  hide = () =>
    this.setState({shown: false})

  render = () => (
    <PopupWindow position={this.state.windowPosition}
      content={this.props.content}
      visible={this.props.shown}
      padding={this.props.padding}
      width={this.props.width} />
    <Backdrop visible={this.state.shown} hidePopup={this.hide} />
  )
}


const PopupWindowElement = VisibleElement.extend`
  position: fixed;
  width: { width }px;
  margin-left: { width/2 * -1 }px;

  padding: {padding};

  transition: top 0.4s linear;
`

const PopupWindow = (props) => (
  <PopupWindowElement {...props}>{props.content}</PopupWindowElement>
)


const visibilityStyle = (visible) =>
  if (visible)
    "opacity: 1; visibility: visible;"
  else
    "opacity: 0; visibility: hidden;"

const VisibleElement = styled.div`
  { props => visibilityStyle(props.visible) }
`

const BackdropElement = VisibleElement.extend`
  position: fixed; z-index: 1040;
  top: 0; left: 0; bottom: 0; right: 0;
  background-color: rgba(0,0,0,0.5);

  transition: opacity 0.3s linear;
`

class Backdrop extends Component {
  render = () => (
    <BackdropElement onClick={this.props.hidePopup} style={this.visibilityStyle} />
  )
}


const CloseButton = ({ hidePopup }) => (
  <div className="closeButton" onClick={hidePopup}></div>
)