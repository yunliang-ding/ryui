import * as React from 'react'
import './index.less'
import { Tooltip } from '../index'
const Window:any = window
class Slider extends React.Component {
  props: {
    dark?:boolean,
    siderHeight?:number,
    siderWidth?:number,
    onChange?:Function,
    showTip?:boolean,
    progress:number
  }
  state: any
  radiusNode: HTMLDivElement
  trackNode: HTMLDivElement
  canMove: boolean
  startX: number
  layerNode: HTMLDivElement
  constructor(props) {
    super(props)
    this.state = {
      progress: props.progress
    }
  }
  offset = (curEle) => {
    var totalLeft = null, totalTop = null, par = curEle.offsetParent;
    //首先加自己本身的左偏移和上偏移
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop
    //只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
    while (par) {
      if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
        //累加父级参照物的边框
        totalLeft += par.clientLeft;
        totalTop += par.clientTop
      }
      //累加父级参照物本身的偏移
      totalLeft += par.offsetLeft;
      totalTop += par.offsetTop
      par = par.offsetParent;
    }
    return {
      left: totalLeft,
      top: totalTop
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      progress: props.progress
    })
  }
  openLayer = () => { // 打开layer
    this.layerNode.style.width = '100vw'
    this.layerNode.style.height = '100vh'
  }
  closeLayer = () => { // 关闭layer
    this.layerNode.style.width = '0'
    this.layerNode.style.height = '0'
  }
  renderProgrss = (progress) => {
    progress = Math.floor(progress)
    this.radiusNode.style.left = `${progress}%`
    this.trackNode.style.width = `${progress}%`
  }
  componentDidUpdate() {
    let { progress } = this.state
    if (progress && Number(progress) >= 0) {
      this.renderProgrss(progress)
    }
  }
  componentDidMount() {
    let { progress } = this.state
    if (progress && Number(progress) >= 0) {
      this.renderProgrss(progress)
    }
  }
  render() {
    let theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    let height = this.props.siderHeight || 6
    let width = this.props.siderWidth || 300
    return <div className={'yui-sider' + theme} style={{
      width,
      height
    }} onClick={ // 直接定位到该位置
      (e) => {
        let { left } = this.offset(this.trackNode)
        let progress = Math.floor((e.pageX - left) / width * 100)
        this.setState({
          progress
        }, () => {
          if (this.props.onChange) {
            this.props.onChange(progress)
          }
        })
      }
    }>
      <div className='yui-sider-layer'
        ref={(node) => { this.layerNode = node }}
        onMouseMove={
          (e) => {
            if (this.canMove) {
              let pro = this.state.progress + (e.pageX - this.startX) / width
              this.setState({
                progress: pro > 100 ? 100 : pro < 0 ? 0 : pro
              }, () => {
                if (this.props.onChange) {
                  this.props.onChange(Math.floor(pro))
                }
              })
            }
          }
        } onMouseUp={
          () => {
            this.closeLayer()
            this.canMove = false
          }
        }
      />
      <div className='yui-sider-track' ref={(node) => { this.trackNode = node }} />
      {
        <div className='yui-sider-radius' ref={(node) => { this.radiusNode = node }} style={{
          height: height + 4,
          width: height + 4
        }} onMouseDown={
          (e) => {
            this.canMove = true
            this.openLayer()
            this.startX = e.pageX
          }
        }>
          {
            this.props.showTip && <Tooltip
              dark={this.props.dark}
              title={
                parseInt(this.state.progress)
              }
              placement='top'
            >
              &nbsp;&nbsp;
            </Tooltip>
          }
        </div>
      }
    </div>
  }
}
export {
  Slider
}
