import * as React from 'react'
import './index.less'
import { Button } from '../index'
const Window: any = window
class Drawer extends React.Component {
  state: any
  props: {
    title?: any,
    closable?: boolean,
    placement?: string,
    visible: boolean,
    style?: any,
    onClose?: any,
    onOk?: any,
    dark?: boolean,
    content?: any,
    footer?: any,
    mask?: boolean
  }
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible
    }
  }
  componentWillReceiveProps(props) {
    this.state.visible = props.visible
  }
  close = () => {
    this.setState({
      visible: false
    }, () => {
      this.props.onClose && this.props.onClose()
    })
  }
  ok = () => {
    this.setState({
      visible: false
    }, () => {
      this.props.onOk && this.props.onOk()
    })
  }
  render() {
    const { placement, footer, mask, closable } = this.props
    const { visible } = this.state
    const theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    let style = this.props.style || {}
    if (placement === 'left') {
      style.left = 0
      style.right = 'auto'
    } else {
      style.right = 0
      style.left = 'auto'
    }
    return visible === true && <div className={'yui-drawer' + theme} style={style}>
      <div className='yui-drawer-header'>
        <div>
          {this.props.title}
        </div>
        {closable && <i className='iconfont icon-guanbi' onClick={this.close}></i>}
      </div>
      {mask !== false && <div className='yui-drawer-mask' onClick={this.close} />}
      <div className='yui-drawer-body' style={{
        height: footer === false ? 'calc(100% - 50px)' : 'calc(100% - 100px)'
      }}>
        {this.props.content}
      </div>
      {
        footer !== false && <div className='yui-drawer-footer'>
          {
            footer === null ? [
              <Button type='primary' label='确定' style={{ width: 60 }} onClick={this.ok} />,
              <Button label='取消' style={{ width: 60 }} onClick={this.close} />
            ] : footer
          }
        </div>
      }
    </div>
  }
}
export {
  Drawer
}