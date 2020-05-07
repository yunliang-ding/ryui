import * as React from 'react'
import './index.less'
const Window:any = window
class Radio extends React.Component {
  props: {
    value?:any,
    dataList:any,
    dark?:boolean,
    addonBefore?:any,
    addonAfter?:any,
    onChange?:Function,
    readonly?:boolean,
    style?:any
  }
  render() {
    let { value, dataList } = this.props
    value = value || ''
    dataList = dataList || []
    let addonBefore = null
    let addonAfter = null
    let radio = null;
    const theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    if (this.props.addonBefore) { // 前置按钮
      addonBefore = <span className={"yui-radio-addonBefore"+theme}>
        {this.props.addonBefore}
      </span>
    }
    if (this.props.addonAfter) { // 后置按钮
      addonAfter = <span className={"yui-radio-addonAfter"+theme}>
        {this.props.addonAfter}
      </span>
    }
    radio = <div className={"yui-radio-compont"+theme}>
      {
        dataList.map(item => {
          return (
            item.disabled
              ?
              <span className={"yui-radio-compont-item-disabled"+theme} key={item.key}>
                <span className="value"></span>
                <span className="label">
                  {item.label}
                </span>
              </span>
              :
              (
                item.value == value
                  ?
                  <span className={"yui-radio-compont-item"+theme} key={item.key}>
                    <span className="value-active">
                      <span className="value-active-center"></span>
                    </span>
                     <span className="label">
                      {item.label}
                    </span>
                  </span>
                  :
                  <span className={"yui-radio-compont-item"+theme} key={item.key} onClick={
                    () => {
                      this.props.onChange(item.value)
                    }
                  }>
                    <span className="value" ></span>
                     <span className="label">
                      {item.label}
                    </span>
                  </span>
              )
          )
        })
      }
    </div>
    if (this.props.readonly) {
      radio = <div className={"yui-radio-compont-disabled"+theme} style={{ display: 'flex' }}>
        {
          dataList && dataList.map(item => {
            return (
              item.value == value
                ?
                <span className={"yui-radio-compont-item"+theme} key={item.key}>
                  <span className="value-active">
                    <span className="value-active-center"></span>
                  </span>
                  <span className="label">
                    {item.label}
                  </span>
                </span>
                :
                <span className={"yui-radio-compont-item"+theme} key={item.key}>
                  <span className="value"></span>
                  <span className="label">
                    {item.label}
                  </span>
                </span>
            )
          })
        }
      </div>
    }
    let style = this.props.style || {}
    Object.assign(style, {
      border: (this.props.addonBefore || this.props.addonAfter) ? (theme ? '1px solid #333' : '1px solid #f2f2f2') : 0 
    })
    return (
      <div className={"yui-radio"+theme} style={style}>
        {addonBefore}
        {radio}
        {addonAfter}
      </div>
    )
  }
}
export {
  Radio
}
