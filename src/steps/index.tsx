import * as React from 'react'
import './index.less'
const Window: any = window
class Steps extends React.Component {
  state: any
  props: {
    style?: any,
    stepList: any,
    current?: number,
    direction?: string,
    onChange?: Function,
    dark?: boolean
  }
  constructor(props) {
    super(props)
    this.state = {
      current: props.current
    }
  }
  componentWillReceiveProps(props) {
    this.state.current = props.current
  }
  render() {
    let { stepList, style, direction } = this.props
    const { current } = this.state
    direction = direction !== 'vertical' ? 'horizontal' : 'vertical'
    const theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    return <div className={`yui-steps${theme} yui-steps-${direction}`} style={style}>
      {
        stepList && stepList.map((step, index) => {
          let item = [<div
            className={`yui-steps-item${index <= current - 1 ? '-pass' : ''}`}
            onClick={
              () => {
                this.setState({
                  current: index + 1
                }, () => {
                  this.props.onChange && this.props.onChange(index)
                })
              }
            }
          >
            <div className='yui-steps-item-icon'>
              {step.icon}
            </div>
            <div className='yui-steps-item-info'>
              <div className='yui-steps-item-title'>
                {step.title}
              </div>
              <div className='yui-steps-item-sub-title'>
                {step.subTitle}
              </div>
              <div className='yui-steps-item-description'>
                {step.description}
              </div>
            </div>
          </div>]
          if (index !== stepList.length - 1) {
            item.push(<div className={`yui-steps-split${index < current - 1 ? '-pass' : ''}`} />)
          }
          return item
        })
      }
    </div>
  }
}
export {
  Steps
}