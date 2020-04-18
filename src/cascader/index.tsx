import * as React from "react"
import './index.less'
const Window: any = window
class Cascader extends React.Component {
  props: {
    value?: any,
    onChange?: Function,
    style?: any,
    dark?: boolean,
    placeholder?: string,
    trigger?: string
  }
  state: any;
  cascaderNode: any;
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      cols: [JSON.parse(JSON.stringify(props.dataList))],
      label: ''
    }
  }
  componentDidMount() {
    const { value } = this.props
    if (Array.isArray(value)) {
      value.map((v, index) => { // 依次选中并展开
        this.setColsByValue(this.state.cols[index], v)
      })
      this.setState({
        label: this.getLabel(value),
        cols: this.state.cols
      })
    }
  }
  componentWillReceiveProps(props) {
    if (props.value) {
      this.setState({
        label: this.getLabel(props.value)
      })
    }
  }
  setColsByValue = (col, value) => {// 选中并展开
    col.map(_col => {
      if (_col.value === value) {
        _col.selected = true
        _col.children && this.state.cols.push(_col.children)
      }
    })
  }
  getLabel = (value) => {
    if (!value) { return '' }
    const labels = this.state.cols.map((col, index) => {
      const selected = col.find(_col => {
        if (_col.value === value[index]) {
          _col.selected = true
          return true
        }
      }) || {}
      return selected.label
    })
    return labels.join('/')
  }
  complete = () => {
    // 找出所有选中的value返回
    const value = this.state.cols.map(col => {
      return col.find(_col => _col.selected).value
    })
    const label = this.getLabel(value)
    this.setState({
      isOpen: false,
      label
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(value)
      }
    })
  }
  labelClick = (cols, col, item, index) => {
    col.map(_col => { _col.selected = _col.value === item.value }) // 这个选中
    if (item.children) {
      // 后面全部清空, 重制不选中
      cols.splice(index + 1, cols.length).forEach(col => col.map(_col => _col.selected = false))
      cols.push(JSON.parse(JSON.stringify(item.children))) // 添加新的
      this.setState({ // render
        cols: this.state.cols
      })
    } else { // 结束选择
      this.setState({
        cols: this.state.cols
      }, () => {
        this.complete()
      })
    }
  }
  componentDidUpdate() {
    const { isOpen } = this.state
    this.cascaderNode.style.borderColor = isOpen ? 'var(--theme-color)' : (this.props.dark || Window.yuiIsDark ? '#262626' : '#ccc')
  }
  render() {
    const { style, dark, placeholder, trigger } = this.props
    let theme = dark || Window.yuiIsDark ? '-dark' : ''
    const { isOpen, cols, label } = this.state
    let cascader = <div
      ref={(node) => { this.cascaderNode = node }}
      style={style}
      className={'yui-cascader' + theme}
      onClick={
        () => {
          this.setState({
            isOpen: !isOpen
          })
        }
      }
    >
      <div className='yui-cascader-allow'>
        <i className={isOpen ? 'iconfont icon-xiala1' : 'iconfont icon-xialadown'}></i>
      </div>
      {
        label ? <div className='yui-cascader-label'>{label}</div> : <div className='yui-cascader-placeholder'>{placeholder || '请选择'}</div>
      }
      {
        this.state.isOpen && [
          <div className='yui-cascader-body-spin' />,
          <div className='yui-cascader-body' onClick={
            (e) => {
              e.stopPropagation()
            }
          }>
            {
              cols.map((col, index) => {
                return <div className='yui-cascader-body-col'>
                  {
                    col.map(item => {
                      return <div
                        className={item.selected ? 'yui-cascader-body-col-item-active' : 'yui-cascader-body-col-item'}
                        onMouseOver={
                          () => {
                            if (trigger === 'hover' && item.children) {
                              this.labelClick(cols, col, item, index)
                            }
                          }
                        }
                        onClick={
                          () => {
                            this.labelClick(cols, col, item, index)
                          }
                        }
                      >
                        <span>{item.label}</span>
                        {item.children && <i className='iconfont icon-jiantou1'></i>}
                      </div>
                    })
                  }
                </div>
              })
            }
          </div>
        ]
      }
    </div>
    return cascader
  }
}
export {
  Cascader
}