import * as React from 'react'
import './index.less'
import { Button } from '../index'
const Window: any = window
class Modal extends React.Component {
  state: any
  props: {
    title?: any,
    closable?: boolean,
    visible: boolean,
    style?: any,
    onClose?: any,
    onOk?: any,
    dark?: boolean,
    content?: any,
    footer?: any,
    mask?: boolean
  }
  modalNode: HTMLDivElement
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
    const { footer, mask, closable } = this.props
    const { visible } = this.state
    const theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    let style = this.props.style || {}
    let width = style.width || 600
    style.left = `calc(50vw - ${width / 2}px)`
    return visible === true && <div className={'yui-modal' + theme} style={style} ref={(node) => { this.modalNode = node }}>
      <div className='yui-modal-header'>
        <div>
          {this.props.title}
        </div>
        {closable && <i className='iconfont icon-guanbi' onClick={this.close}></i>}
      </div>
      {mask !== false && <div className='yui-modal-mask' onClick={this.close} />}
      <div className='yui-modal-body' style={{
        height: footer === false ? 'calc(100% - 50px)' : 'calc(100% - 100px)'
      }}>
        {this.props.content}
      </div>
      {
        footer !== false && <div className='yui-modal-footer'>
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
  Modal
}