import * as React from "react"
import './index.less'
const Window: any = window
class Carousel extends React.Component {
  state: any
  timer: any
  props: {
    dark?: boolean,
    style?: any,
    pages: any,
    currentPage?: any,
    onChange?: any,
    autoplay?: boolean,
    effect?: string
  }
  constructor(props) {
    super(props)
    this.state = {
      currentPage: props.currentPage || 1
    }
  }
  componentWillReceiveProps(props) {
    this.state.currentPage = props.currentPage || 1
  }
  setCurrentPage = (page: number) => {
    clearTimeout(this.timer) // clear
    let currentPage = 1
    if (page < 1) {
      currentPage = this.props.pages.length
    } else if (page > this.props.pages.length) {
      currentPage = 1
    } else {
      currentPage = page
    }
    this.setState({
      currentPage
    }, () => {
      this.props.onChange && this.props.onChange(currentPage)
    })
    
  }
  autoPlay = () => {
    this.timer = setTimeout(() => {
      this.setState({
        currentPage: this.state.currentPage + 1 > this.props.pages.length ? 1 : this.state.currentPage + 1
      }, () => {
        this.props.onChange && this.props.onChange(this.state.currentPage)
      })
    }, 3000)
  }
  componentDidUpdate() {
    this.props.autoplay && this.autoPlay()
  }
  componentDidMount() {
    this.props.autoplay && this.autoPlay()
  }
  render() {
    const { style, pages, effect } = this.props
    const dark = this.props.dark || Window.yuiIsDark
    const { currentPage } = this.state
    let theme = dark ? '-dark' : ''
    return <div className={`yui-carousel${theme}`} style={style}>
      <div className='yui-carousel-before' onClick={
        () => {
          this.setCurrentPage(this.state.currentPage - 1)
        }
      }>
        <i className='iconfont icon-icon-jiantouzuo'></i>
      </div>
      <div className='yui-carousel-next' onClick={
        () => {
          this.setCurrentPage(this.state.currentPage + 1)
        }
      }>
        <i className='iconfont icon-jiantou2'></i>
      </div>
      {
        pages && pages.map((page, index) => {
          return <div className='yui-carousel-page' style={{
            left: effect === 'fade' ? 0 : (index + 1) === currentPage ? 0 : 100 * ((index + 1) - currentPage) + '%',
            opacity: effect === 'fade' ? ((index + 1) === currentPage ? 1 : 0) : 1,
            transition: effect === 'fade' ? '.8s' : '.5s'
          }}>
            {
              page
            }
          </div>
        })
      }
      <div className='yui-carousel-legend'>
        <div className='yui-carousel-legend-box'>
          {
            pages && pages.map((page, index) => {
              return <div
                className={(index + 1) === currentPage ? 'yui-carousel-legend-box-item-active' : 'yui-carousel-legend-box-item'}
                onClick={
                  () => {
                    this.setCurrentPage(index + 1)
                  }
                }
              />
            })
          }
        </div>
      </div>
    </div>
  }
}
export {
  Carousel
}
