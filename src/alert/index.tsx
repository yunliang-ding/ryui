import * as React from "react"
const Window: any = window
const iconMapping = {
  success: 'yuicon-message_SendSuccessfully',
  info: 'yuicon-warning',
  warning: 'yuicon-info_warning',
  error: 'yuicon-cuo'
}
class Alert extends React.Component {
  props: {
    onClose?: Function,
    message: any,
    closable?: boolean,
    type?: string,
    dark?: boolean,
    style?: any
  }
  state = {
    show: true
  }
  constructor(props) {
    super(props)
  }
  close = () => {
    this.setState({
      show: false
    }, () => {
      this.props.onClose && this.props.onClose()
    })
  }
  render() {
    const { type, style, closable } = this.props
    const dark = this.props.dark || Window.yuiIsDark
    let show = this.state.show;
    let theme = dark ? '-dark' : ''
    let icon = iconMapping[type]
    return show && <div className={`yui-alert${theme} yui-alert${theme}-${type}`} style={style}>
      <div className='yui-alert-message'>
        <i className={`yuicon ${icon}`}></i>
        <span>{this.props.message}</span>
      </div>
      {
        closable && <i className={`yuicon yuicon-guanbi`} onClick={this.close}></i>
      }
    </div>
  }
}
export {
  Alert
}
