import * as React from 'react'
import './index.less'
const Window:any = window
class Switch extends React.Component {
  props: {
    disabled?:boolean,
    checkedNode?:any,
    loading?:boolean,
    unCheckedNode?:any,
    checked?:boolean,
    dark?:boolean,
    style?:any,
    onChange?:Function
  }
  state: any
  constructor(props){
    super(props)
    this.state = {
      checked: props.checked
    }
  }
  componentWillReceiveProps (props) {
    this.setState({
      checked: props.checked
    })
  }
  render() {
    const {
      disabled,
      checkedNode,
      loading,
      unCheckedNode
    } = this.props
    const {
      checked
    } = this.state
    let theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    let style = this.props.style || {}
    if(disabled || loading){
      style.opacity = 0.5
      style.cursor = 'not-allowed'
    }
    return <div
      className={checked ? "yui-switch-checked"+theme : "yui-switch"+theme}
      style={style}
      onClick={
        () => {
          if(!disabled && !loading){
            this.setState({
              checked: !checked
            }, () => {
              if(this.props.onChange){
                this.props.onChange(!checked)
              }
            })
          }
        }
      }
    >
      <div className={checked ? 'yui-switch-addon-checked' : 'yui-switch-addon'}>
        {
          loading && <i className='iconfont icon-loading' style={{
            fontSize: 10,
            color: checked ? 'var(--theme-color)' : 'none',
            animation: 'spin 1.2s linear infinite'
          }}/>
        }
      </div>
      <div className={checked ? 'yui-switch-addon-checked-text' : 'yui-switch-addon-text'}>
        {
          checked ? checkedNode : unCheckedNode
        }
      </div>
    </div>
  }
}
export {
  Switch
}
