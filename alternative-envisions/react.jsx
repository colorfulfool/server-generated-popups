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
      shown={this.props.visible}
      padding={this.props.padding}
      width={this.props.width} />
    <Backdrop visible={this.state.shown} hidePopup={this.hide} />
  )
}


const PopupWindow = ({ content, position, padding, width }) => (
  <div className="popup" style={{top: position}}>{content}</div>
)


const visible = (visible) =>
  props.visible ? "opacity: 1; visibility: visible;"
    : "opacity: 0; visibility: hidden;"

const BackdropElement = styled.div`
  position: fixed; z-index: 1040;
  top: 0; left: 0; bottom: 0; right: 0;
  background-color: black;

  { props => visible(props.visible) }
  transition: opacity 0.3s linear;
`

const Backdrop = ({ hidePopup }) => (
  <BackdropElement onClick={hidePopup}></BackdropElement>
)


const CloseButton = ({ hidePopup }) => (
  <div className="closeButton" onClick={hidePopup}></div>
)