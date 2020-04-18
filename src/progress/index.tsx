import * as React from 'react'
import './index.less'
const Window: any = window
class Progress extends React.Component {
  props: {
    value?: number,
    background?: string,
    type?: string,
    dark?: boolean,
    style?: any
  }
  rightNode: HTMLDivElement
  leftNode: HTMLDivElement
  setProgress = () => {
    let { value } = this.props
    value = value || 0
    value = value * 3.6
    if (value <= 180) {
      this.rightNode && (this.rightNode.style.transform = `rotate(${value - 180}deg)`)
      this.leftNode && (this.leftNode.style.transform = ` rotate(-180deg)`)
    } else {
      this.rightNode && (this.rightNode.style.transform = `rotate(0deg)`)
      this.leftNode && (this.leftNode.style.transform = `rotate(${value - 360}deg)`)
    }
  }
  componentDidMount() {
    this.setProgress()
  }
  componentDidUpdate() {
    this.setProgress()
  }
  render() {
    let { background, value, type } = this.props
    value = value || 0
    background = background || 'var(--theme-color)'
    const theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    return type === 'circle' ? <div className={"yui-progress-circle" + theme} style={this.props.style}>
      <div className="pie_left" style={{
        clip: `rect(auto, ${this.props.style.width / 2}px , auto, auto)`
      }}>
        <div ref={(node) => { this.leftNode = node }} className="left" style={{
          clip: `rect(auto, ${this.props.style.width / 2}px , auto, auto)`,
          background
        }}></div>
      </div>
      <div className="pie_right" style={{
        clip: `rect(0, auto, auto, ${this.props.style.width / 2}px)`
      }}>
        <div ref={(node) => { this.rightNode = node }} className="right" style={{
          clip: `rect(0, auto, auto, ${this.props.style.width / 2}px)`,
          background
        }}></div>
      </div>
      <div className="mask">
        {value}%
      </div>
    </div> : <div className={"yui-progress" + theme} style={this.props.style}>
        <div className='yui-progress-track' style={{
          width: `${value}%`,
          background
        }}></div>
      </div>
  }
}
export {
  Progress
}