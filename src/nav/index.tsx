import * as React from 'react'
import './index.less'
const Window: any = window
class Nav extends React.Component {
  props: {
    navList: any,
    openKey?: any[],
    selectKey?: any[],
    menuClick?: Function,
    type?: string,
    logo?: any,
    model?: string,
    collapsed?: boolean,
    style?: any,
    collapsedWidth?: number,
    dark?:boolean
  }
  state = {
    navList: [],
    openKey: [],  // 展开的父节点
    selectKey: [] //选中的叶子节点
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      navList: nextProps.navList,
      openKey: nextProps.openKey,
      selectKey: nextProps.selectKey
    })
  }
  componentWillMount() {
    this.setState({
      navList: this.props.navList,
      openKey: this.props.openKey,
      selectKey: this.props.selectKey
    })
  }
  navClick = (nav) => {
    if (nav.disabled) return
    let navList = this.state.navList.map(m => {
      m.active = m.key == nav.key
      return m
    });
    this.setState({
      navList
    }, () => {
      this.props.menuClick && this.props.menuClick(nav)
    })
  }
  menuClick = (nav) => {
    if (nav.disabled) return
    this.state.navList.map(m => {
      if (m.key == nav.key) {
        if (m.subMenu) {
          if (m.isOpen) {
            this.state.openKey.splice(this.state.openKey.indexOf(m.key), 1) // 收起
          } else {
            this.state.openKey.push(m.key) // 展开
          }
        } else {
          this.setState({
            selectKey: [m.key]
          })
        }
      }
      if (m.subMenu) {
        m.subMenu.map(mm => {
          if (mm.key == nav.key) {
            this.setState({
              selectKey: [mm.key]
            })
          }
        })
      }
    });
    this.setState({
      openKey: this.state.openKey
    }, () => {
      if (this.props.menuClick) {
        this.props.menuClick(this.state.openKey, this.state.selectKey)
      }
    })
  }
  render() {
    let { navList, openKey, selectKey } = this.state
    navList = navList || []
    openKey = openKey || []
    selectKey = selectKey || []
    let nav = <div className="yui-nav-compont" style={{ justifyContent: this.props.type == 'right' ? 'flex-end' : 'flex-start' }}>
      {
        navList.map(item => {
          return (
            <div
              key={item.key}
              style={{
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.5 : 1
              }}
              className={item.active ? "yui-nav-compont-item-active" : "yui-nav-compont-item"}
              onClick={
                () => {
                  this.navClick(item)
                }
              }
            >
              <span>{item.label}</span>
            </div>
          )
        })
      }
      {
        this.props.logo
          ?
          <div className="yui-nav-logo" style={
            this.props.type == 'right' ? {
              left: 10
            } : {
                right: 10
              }
          }>
            {this.props.logo}
          </div>
          :
          null
      }
    </div>

    if (this.props.model == 'menu') {
      nav = <div className="yui-nav-compont-menu">
        {
          navList.map(item => {
            let nav = [] // 一级
            let subMenu = [] // 二级
            if (item.subMenu) {
              let select = false; // 标志是否有子节点选中
              item.isOpen = openKey.indexOf(item.key) > -1
              item.subMenu.map(sub => {
                sub.active = selectKey.indexOf(sub.key) > -1
                if (sub.active) {
                  select = true;
                }
                subMenu.push(
                  <div
                    key={sub.key}
                    style={{
                      cursor: sub.disabled ? 'not-allowed' : 'pointer',
                      opacity: sub.disabled ? 0.5 : 1
                    }}
                    className={sub.active ? "yui-nav-compont-menu-item-subMeun-active" : "yui-nav-compont-menu-item-subMeun"}
                    onClick={
                      () => {
                        this.menuClick(sub)
                      }
                    }
                  >
                    <span><i className={"iconfont " + sub.icon}></i>{sub.label}</span>
                  </div>
                )
              })
              nav.push(
                <div
                  key={item.key}
                  style={{
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    opacity: item.disabled ? 0.5 : 1
                  }}
                  className={select ? "yui-nav-compont-menu-item-active" : "yui-nav-compont-menu-item"}
                  onClick={
                    () => {
                      this.menuClick(item)
                    }
                  }
                >
                  <span><i className={"iconfont " + item.icon}></i>{item.label}</span>
                  {
                    item.subMenu
                      ?
                      <i className={item.isOpen ? 'iconfont icon-jiantou32' : 'iconfont icon-jiantou'} style={{ paddingLeft: 20, fontSize: 16 }} />
                      :
                      null
                  }
                </div>
              )

              if (subMenu.length != 0 && item.isOpen) {
                nav.push(subMenu)
              }
            } else { // 没有二级的一级菜单
              item.active = selectKey.indexOf(item.key) > -1
              nav.push(
                <div
                  key={item.key}
                  style={{
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    opacity: item.disabled ? 0.5 : 1
                  }}
                  className={item.active ? "yui-nav-compont-menu-item2-active" : "yui-nav-compont-menu-item2"}
                  onClick={
                    () => {
                      this.menuClick(item)
                    }
                  }
                >
                  <span><i className={"iconfont " + item.icon}></i>{item.label}</span>
                </div>
              )
            }
            return nav
          })
        }
      </div>
      if (this.props.collapsed) {
        nav = <div className="yui-nav-compont-menu">
          {
            navList.map(item => {
              let nav = [] // 一级
              if (item.subMenu) {
                item.isOpen = openKey.indexOf(item.key) > -1
                nav.push(
                  <div
                    key={item.key}
                    style={{
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      opacity: item.disabled ? 0.5 : 1
                    }}
                    className="yui-nav-compont-menu-item"
                    onClick={
                      () => {
                        this.menuClick(item)
                      }
                    }
                  >
                    <span><i className={"iconfont " + item.icon}></i></span>
                  </div>
                )
              } else { // 没有二级的一级菜单
                item.active = selectKey.indexOf(item.key) > -1
                nav.push(
                  <div
                    key={item.key}
                    style={{
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      opacity: item.disabled ? 0.5 : 1
                    }}
                    className={item.active ? "yui-nav-compont-menu-item2-active" : "yui-nav-compont-menu-item2"}
                    onClick={
                      () => {
                        this.menuClick(item)
                      }
                    }
                  >
                    <span><i className={"iconfont " + item.icon}></i></span>
                  </div>
                )
              }
              return nav
            })
          }
        </div>
      }
    }
    let style = {}
    if (this.props.style) {
      let width = this.props.collapsed ? (this.props.collapsedWidth || 40) : (this.props.style.width || '100%')
      style = Object.assign(this.props.style, {
        width
      })
    }
    const theme = this.props.dark || Window.yuiIsDark ? '-dark' : ''
    return <div className={"yui-nav" + theme} style={style}>
      {nav}
    </div>
  }
}
export {
  Nav
}
