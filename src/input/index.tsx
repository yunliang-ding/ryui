import * as React from 'react'
import './index.less'
const Window: any = window
class Input extends React.Component {
  props: {
    type?: string,
    addonBefore?: any,
    addonAfter?: any,
    dark?: boolean,
    readOnly?: boolean,
    value?: any,
    onChange?: any,
    style?: any,
    placeholder?: string,
    onBlur?: any,
    onFocus?:any,
    defaultValue?: any
  }
  constructor(props) {
    super(props)
  }
  render() {
    let addonBefore = null
    let addonAfter = null
    let type = this.props.type || 'text'
    let input = null;
    let theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    if (this.props.addonBefore) { // 前置按钮
      addonBefore = <span className={'yui-input-addonBefore' + theme}>
        {this.props.addonBefore}
      </span>
    }
    if (this.props.addonAfter) { // 后置按钮
      addonAfter = <span className={'yui-input-addonAfter' + theme}>
        {this.props.addonAfter}
      </span>
    }
    if (type === 'textArea') {
      input = <textarea
        readOnly={this.props.readOnly}
        className={'yui-input-textArea' + theme}
        value={this.props.value}
        onChange={
          (e) => {
            this.props.onChange(e)
          }
        }
        style={this.props.style}
      >
        {this.props.value}
      </textarea>
    } else {
      input = <input className={'input' + theme}
        type={this.props.type}
        style={this.props.style}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={
          (e) => {
            this.props.onChange && this.props.onChange(e)
          }
        }
        onBlur={
          (e) => {
            this.props.onBlur && this.props.onBlur(e)
          }
        }
        onFocus={
          (e) => {
            this.props.onFocus && this.props.onFocus(e)
          }
        }
      />
      if (this.props.readOnly == true) {
        input = <input className={'input-disabled' + theme} readOnly
          type='text'
          style={this.props.style}
          value={this.props.value}
          placeholder={this.props.placeholder}
        />
      }
    }
    return (
      <div className='yui-input'>
        {addonBefore}
        {input}
        {addonAfter}
      </div>
    )
  }
}
export {
  Input
}