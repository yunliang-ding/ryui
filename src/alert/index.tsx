import * as React from "react"
import './index.less'
const Window: any = window
const iconMapping = {
  success: 'icon-message_SendSuccessfully',
  info: 'icon-warning',
  warning: 'icon-info_warning',
  error: 'icon-cuo'
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
        <i className={`iconfont ${icon}`}></i>
        <span>{this.props.message}</span>
      </div>
      {
        closable && <i className={`iconfont icon-guanbi`} onClick={this.close}></i>
      }
    </div>
  }
}
export {
  Alert
}
