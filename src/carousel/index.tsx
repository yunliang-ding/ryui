import * as React from "react"
import './index.less'
const Window: any = window
class Carousel extends React.Component {
  props: {
    dark?:boolean,
    style?:any
  }
  constructor(props) {
    super(props)
  }
  render() {
    const { style } = this.props
    const dark = this.props.dark || Window.yuiIsDark
    let theme = dark ? '-dark' : ''
    return <div className={`yui-carousel${theme}`} style={style}>
      yui-carousel
    </div>
  }
}
export {
  Carousel
}
