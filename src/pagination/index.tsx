import * as React from 'react'
import './index.less'
import { Input, Select } from '../index'
const Window: any = window
class Pagination extends React.Component {
  state: any
  props: {
    current: number,
    pageSize: number,
    total: number,
    onChange?: any,
    dark?: boolean,
    pageSizeOptions?: any,
    onPageSizeChange?:any,
    showJumper?: boolean
  }
  constructor(props) {
    super(props)
    this.state = {
      current: props.current,
      pageSize: props.pageSize,
      total: props.total
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      current: props.current,
      pageSize: props.pageSize,
      total: props.total,
      dark: props.dark
    })
  }
  itemClick = (current) => {
    this.setState({
      current
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(current)
      }
    })
  }
  render() {
    let current = this.state.current
    let pageSize = this.state.pageSize
    let totalPage = this.state.total / pageSize + (this.state.total % pageSize > 0 ? 1 : 0)
    let page = [];
    let theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    let arr = [1]
    if (totalPage > 8) { // 默认大于8 转为更多模式
      if (current > 5 && current + 5 < totalPage) {
        arr.push(-1, current - 2, current - 1, current, current + 1, current + 2, -2)
      } else if (current + 5 >= totalPage) {
        arr.push(-1, totalPage - 5, totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1)
      } else {
        arr.push(2, 3, 4, 5, 6, -2)
      }
      arr.push(totalPage)
      arr.forEach(item => {
        page.push(
          <div key={Math.random()} className={current == item ? "yui-pagination-item-active" : "yui-pagination-item"}
            onClick={
              () => {
                if (item === -1) {
                  this.itemClick(current - 5)
                } else if (item === -2) {
                  this.itemClick(current + 5)
                } else {
                  this.itemClick(item)
                }
              }
            }
          >
            {[-1, -2].indexOf(item) > -1 ? <i className='iconfont icon-moreread'></i> : item}
          </div>
        )
      })
    } else {
      for (let i = 1; i < totalPage + 1; i++) {
        page.push(
          <div key={Math.random()} className={current == i ? "yui-pagination-item-active" : "yui-pagination-item"}
            onClick={
              () => {
                this.itemClick(i)
              }
            }
          >
            {i}
          </div>
        )
      }
    }
    return (
      <div className={"yui-pagination" + theme}>
        <div className={this.state.current == 1 ? "yui-pagination-pre-disabled" : "yui-pagination-pre"}
          onClick={
            () => {
              if (this.state.current != 1) {
                this.itemClick(this.state.current - 1)
              }
            }
          }
        >
          <i className='iconfont icon-icon-jiantouzuo'></i>
        </div>
        {page}
        <div className={this.state.current == totalPage ? "yui-pagination-next-disabled" : "yui-pagination-next"}
          onClick={
            () => {
              if (this.state.current !== totalPage) {
                this.itemClick(this.state.current + 1)
              }
            }
          }
        >
          <i className='iconfont icon-jiantou2'></i>
        </div>
        {
          this.props.pageSizeOptions && <div className='yui-pagination-jump'>
            <Select
              style={{ width: 90, height: 32 }}
              value={pageSize}
              onChange={
                (pageSize) => {
                  this.setState({
                    pageSize
                  })
                  this.props.onPageSizeChange && this.props.onPageSizeChange(pageSize)
                }
              }
              dataList={
                this.props.pageSizeOptions.map(value=>{
                  return {
                    label: `每页${value}条`,
                    value
                  }
                })
              }
            />
          </div>
        }
        {
          this.props.showJumper && <div className='yui-pagination-jump'>
            <span className='yui-pagination-jump-label'>跳转至</span>
            <Input style={{ width: 50 }} onBlur={
              (e) => {
                let current = window.parseInt(e.target.value)
                if(!isNaN(current)){
                  this.setState({
                    current: current > totalPage ? totalPage : current
                  })
                }
              }
            } />
            <span>页</span>
          </div>
        }
      </div>
    )
  }
}
export {
  Pagination
}
