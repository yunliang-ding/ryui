import * as React from 'react'
const Window: any = window
class Loading extends React.Component {
  props: {
    loading: boolean,
    icon?: string,
    iconStyle?: any,
    style?: any,
    dark?: boolean,
    children?: any
  };
  render() {
    const theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    let { iconStyle, icon, loading } = this.props
    icon = icon || 'yuicon yuicon-loading'
    return (
      <div className={"yui-loading" + theme} style={this.props.style}>
        <div className="yui-loading-body" style={{
          filter: loading ? 'blur(1px)' : 'none'
        }}>
          {this.props.children}
        </div>
        <div className="yui-loading-opacity" style={{ display: loading ? "block" : "none" }}>
          <div className="message">
            <i style={iconStyle} className={icon}></i>
          </div>
        </div>
      </div>
    )
  }
}
export {
  Loading
}