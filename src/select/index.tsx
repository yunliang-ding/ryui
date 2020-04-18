import * as React from 'react'
import './index.less'
const Window:any = window
class Select extends React.Component {
  props: {
    onChange?:Function,
    style?:any,
    dark?:boolean,
    value?:any,
    dataList:any,
    addonBefore?:any,
    addonAfter?:any,
    mode?:string,
    clear?:boolean,
    placeholder?:string,
    readonly?:boolean
  }
  state = {
    isOpen: false,
    isActive: false,
    isLeave: false,
    search: null
  }
  toggleSelect = () => { //下拉展开和收起
    this.setState({
      isOpen: !this.state.isOpen,
      isActive: !this.state.isActive,
      isLeave: !this.state.isLeave
    })
  }
  itemSelect = (e) => {
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }
  selectNode: any;
  selectBodyNode: any;
  componentDidUpdate() {
    if (this.props.style.border !== 0) {
      if (this.state.isOpen) {
        this.selectNode.style.border = '1px solid var(--theme-color)'
      } else {
        this.selectNode.style.border = this.props.dark || Window.yuiIsDark ? '1px solid #333' : '1px solid #f2f2f2'
      }
    }
    if (this.selectBodyNode) {
      this.selectBodyNode.style.top = parseInt(window.getComputedStyle(this.selectNode).height) + 4
    }
  }
  render() {
    let { value, dataList } = this.props
    value = value !== '' ? value : []
    dataList = dataList || []
    let label = null;
    dataList.map(item => {
      if (item.value === value) {
        label = item.label
      }
    })
    let addonBefore = null
    let addonAfter = null
    let select = null;
    let theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    let style = this.props.style || {}
    if (this.props.addonBefore) { // 前置按钮
      addonBefore = <span className={"yui-select-addonBefore" + theme}>
        {this.props.addonBefore}
      </span>
    }
    if (this.props.addonAfter) { // 后置按钮
      addonAfter = <span className={"yui-select-addonAfter" + theme}>
        {this.props.addonAfter}
      </span>
    }
    if (!this.props.mode) {
      select = <div className={"yui-select-compont" + theme} onClick={this.toggleSelect}>
        <div style={{ width: '90%', position: 'relative' }}>
          <div className='yui-select-compont-value' title={label}>
            {label || <span className='yui-select-placeholder'>{this.props.placeholder || '请选择'}</span>}
          </div>
          {
            this.props.clear && label && <div className='yui-select-clear' onClick={
              (e) => {
                e.stopPropagation()
                this.props.onChange('')
              }
            }>
              <i className='iconfont icon-cuo'></i>
            </div>
          }
        </div>
        <div className='yui-select-allow' style={{ right: this.props.clear ? 0 : 4 }}>
          {
            this.state.isOpen
              ?
              <i className={"iconfont icon-xiala1"} />
              :
              <i className={"iconfont icon-xialadown"} />
          }
        </div>
        {
          this.state.isOpen && <div className='yui-select-spin' />
        }
        {
          this.state.isOpen && <div className={"yui-select-body" + theme} ref={(node) => { this.selectBodyNode = node }}>
            {
              dataList.map(item => {
                return (
                  item.disabled
                    ?
                    <span title={item.label} className={"yui-select-body-item-disabled" + theme} key={item.key} >{item.label}</span>
                    :
                    <span
                      title={item.label}
                      className={(item.value === value) ? "yui-select-body-item-active" + theme : "yui-select-body-item" + theme}
                      key={item.key}
                      onClick={
                        () => {
                          this.itemSelect(item.value)
                        }
                      }
                    >
                      {item.label}
                    </span>
                )
              })
            }
          </div>
        }
      </div>
    }
    if (this.props.mode === 'multiple') {
      let labelList: any = []
      label = null
      dataList.map(item => {
        value && value.map(m => {
          if (item.value === m) {
            labelList.push({
              label: item.label,
              key: Math.random()
            })
          }
        })
      });
      if (labelList != 0) {
        label = labelList.map((m, index) => {
          return (
            <span className={"yui-select-compont-multiple-label" + theme} key={m.key} onClick={
              (e) => {
                e.stopPropagation()
              }
            }>
              {m.label}
              <i className={"iconfont icon-guanbi"} style={{ paddingLeft: 4, fontSize: 12, cursor: 'pointer' }} onClick={
                () => {
                  value.splice(index, 1)
                  this.props.onChange(value)
                }
              } />
            </span>
          )
        })
      }
      select = <div style={{ minHeight: 32 }} className={"yui-select-compont" + theme} onClick={this.toggleSelect}>
        <div style={{ width: '90%', position: 'relative' }}>
          {label || <span className='yui-select-placeholder'>{this.props.placeholder || '请选择'}</span>}
          {
            this.props.clear && label && <div className='yui-select-clear' onClick={
              (e) => {
                e.stopPropagation()
                this.props.onChange([])
              }
            }>
              <i className='iconfont icon-cuo'></i>
            </div>
          }
        </div>
        <div style={{ width: '10%', minWidth: 20 }}>
          {
            this.state.isOpen
              ?
              <i className={"iconfont icon-xiala1"} />
              :
              <i className={"iconfont icon-xialadown"} />
          }
        </div>
        {
          this.state.isOpen && <div className='yui-select-spin' />
        }
        {
          this.state.isOpen ?
            <div className={"yui-select-body" + theme} ref={(node) => { this.selectBodyNode = node }}>
              {
                dataList && dataList.map(item => {
                  return (
                    item.disabled
                      ?
                      <span className={"yui-select-body-item-disabled" + theme} key={item.key} onClick={
                        (e) => {
                          e.stopPropagation()
                        }
                      }>{item.label}</span>
                      :
                      <span className={value.includes(item.value) ? "yui-select-body-item-active" + theme : "yui-select-body-item" + theme} key={item.key} onClick={
                        (e) => {
                          e.stopPropagation()
                          if (value.includes(item.value)) {
                            value.splice(value.indexOf(item.value), 1)
                          } else {
                            value.push(item.value)
                          }
                          this.itemSelect(value)
                        }
                      }>{item.label}</span>
                  )
                })
              }
            </div>
            : null
        }
      </div>
    }
    if (this.props.readonly) {
      select = <div className={"yui-select-compont-disabled" + theme}>
        <div style={{ width: '90%' }}>
          {label || this.props.placeholder || '请选择'}
        </div>
        <div style={{ width: '10%' }}>
          <i className={"iconfont icon-xialadown"} />
        </div>
      </div>
    }
    return <div className={"yui-select" + theme} style={style} ref={(node) => { this.selectNode = node }}>
      {addonBefore}
      {select}
      {addonAfter}
    </div>
  }
}
export {
  Select
}