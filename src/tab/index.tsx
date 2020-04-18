import * as React from 'react'
import './index.less'
const Window: any = window
class Tabs extends React.Component<any, any> {
  props: {
    style?: any,
    close?: boolean,
    dataList: any,
    activeKey?: any,
    onClick?: any,
    onRemove?: any,
    dark?: boolean
  }
  constructor(props) {
    super(props)
    this.state = {
      activeKey: props.activeKey,
      dataList: props.dataList
    }
  }
  componentWillReceiveProps(props) {
    this.setState({
      activeKey: props.activeKey,
      dataList: props.dataList
    })
  }
  render() {
    let tabs = null;
    let { close, onClick, onRemove } = this.props
    let { activeKey, dataList } = this.state
    tabs = <div className="yui-tabs-compont">
      {
        dataList && dataList.map(tab => {
          return <div title={tab.tip} key={tab.key} className={activeKey === tab.key ? "yui-tabs-item-active" : "yui-tabs-item"} onClick={
            () => {
              this.setState({
                activeKey: tab.key
              }, () => {
                onClick && onClick(tab)
              })
            }
          }>
            <div className='yui-tabs-item-header'>
              <div className='yui-tabs-item-label'>
                {tab.label}
              </div>
              {
                close ? <i
                  className="iconfont icon-guanbi"
                  style={{
                    visibility: activeKey === tab.key ? 'visible' : 'hidden'
                  }}
                  onClick={
                    (e) => {
                      e.stopPropagation(); //阻止往上冒泡
                      let data = dataList.filter(m => {
                        return m.key != tab.key
                      })
                      this.setState({
                        dataList: data,
                        activeKey: data[0] && data[0].key
                      }, () => {
                        onRemove && onRemove(tab)
                      })

                    }
                  }
                /> : <i className="iconfont" style={{
                  visibility: 'hidden'
                }} />
              }
            </div>
            {
              (tab.content && tab.key === activeKey) && <div className='yui-tabs-item-content' style={{
                width: this.props.style.width,
                height: this.props.style.height - 36
              }}>
                {tab.content}
              </div>
            }
          </div>
        })
      }
    </div>
    let theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    return <div className={"yui-tabs" + theme} style={this.props.style}>
      {tabs}
    </div>
  }
}
export {
  Tabs
}
