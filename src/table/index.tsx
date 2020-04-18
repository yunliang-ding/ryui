import * as React from 'react'
import './index.less'
const Window: any = window
class Table extends React.Component {
  state = {
    colmun: [],
    data: []
  }
  props: {
    data: any,
    colmun: any,
    onSort?: Function,
    dark?: boolean,
    style?: any,
    styleHeader?: any,
    line?: boolean
  }
  componentWillReceiveProps(props) {
    this.state.data = props.data
    this.state.colmun = props.colmun
  }
  componentWillMount() {
    this.setState({
      data: this.props.data,
      colmun: this.props.colmun
    })
  }
  sort(sort: any, isReverse: boolean) {
    this.state.data.sort(sort)
    this.setState({
      data: isReverse ? this.state.data.reverse() : this.state.data
    }, () => {
      this.props.onSort && this.props.onSort()
    })
  }
  render() {
    let { colmun, data } = this.state;
    let theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    return (
      <div className={"yui-table" + theme} style={this.props.style}>
        <div className="yui-table-header" style={this.props.styleHeader}>
          {
            colmun.map(m => {
              let width = m.width || (100 / colmun.length + '%')
              return (
                <div key={m.no} className="yui-table-header-colmun" style={{ width }}>
                  <div>{m.label}</div>
                  {
                    m.sorter
                      ?
                      <div className="yui-table-header-sort">
                        <i
                          className="iconfont icon-jiantou"
                          style={{ height: 8 }}
                          onClick={
                            () => {
                              this.sort(m.sort, false)
                            }
                          }
                        />
                        <i
                          className="iconfont icon-jiantou32"
                          onClick={
                            () => {
                              this.sort(m.sort, true)
                            }
                          }
                        />
                      </div>
                      : null
                  }
                </div>
              )
            })
          }
        </div>
        <div className="yui-table-body">
          {
            data.map((m, index) => {
              return <div key={m.key} className={
                (index % 2 == 1 && this.props.line == true)
                  ?
                  "yui-table-body-tr-even"
                  :
                  "yui-table-body-tr"
              }>
                {
                  colmun.map((key) => {
                    let width = m.width || (100 / colmun.length + '%')
                    return (
                      <div key={"sub" + m.key} className="yui-table-body-td" style={{ width }}>
                        {
                          key.render ? key.render(m[key.dataIndex]) : <span>{m[key.dataIndex]}</span>
                        }
                      </div>
                    )
                  })
                }
              </div>
            })
          }
        </div>
      </div>
    )
  }
}
export {
  Table
}
