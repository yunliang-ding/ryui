import * as React from "react"
import './index.less'
const Window:any = window
class Button extends React.Component {
  props: {
    onClick?:Function,
    type?:any,
    label:any,
    style?:object,
    dark?:boolean,
    disabled?:boolean
  }
  click = (e) => {
    this.props.onClick && this.props.onClick(e)
  }
  render() {
    let { label, type, style, disabled } = this.props
    type = type || 'normal'
    let button = null
    let theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    let className = `yui-btn yui-btn${theme}-${type}`
    if(disabled){
      className += ` yui-btn-disabled`
    }
    button = <div className={className} style={style} onClick={
      (e) => {
        this.click(e)
      }
    }>
      {label}
    </div>
    return button
  }
}
export {
  Button
}