import * as React from "react"
import { Input, Button, Select } from '../index'
import { DateUtil } from './util'
import './index.less'
const Window: any = window
class DatePicker extends React.Component {
  yearList = []
  monthList = []
  dateUtil: DateUtil;
  state: any;
  props: {
    dark?: boolean,
    style?: any,
    value: any,
    onChange: any,
    placeholder?: string,
    addonBefore?: any,
    addonAfter?: any
  }
  constructor(props) {
    super(props)
    let date = props.value || new Date().getTime()
    let format = props.format || 'YYYY-MM-DD'
    this.dateUtil = new DateUtil(new Date(date), format)
    this.state = {
      isOpen: false,
      value: props.value,
      calendar: this.dateUtil.getCalendar() // 当前日历
    }
    this.yearList = this.dateUtil.getYearList()
    this.monthList = this.dateUtil.getMonthList()
  }
  componentWillReceiveProps(props) {
    let date = props.value || new Date().getTime()
    let format = props.format || 'YYYY-MM-DD'
    this.dateUtil = new DateUtil(new Date(date), format)
    this.state.value = props.value,
    this.state.calendar = this.dateUtil.getCalendar() // 当前日历
  }
  renderHeader = () => {
    return ['日', '一', '二', '三', '四', '五', '六'].map(item => {
      return <div className='yui-picker-header-item'>
        {item}
      </div>
    })
  }
  renderContent = () => {
    return this.state.calendar.map((row: any) => {
      return <div className='yui-picker-calendar-row'>
        {
          row.map(col => {
            return <div
              className={
                col.dateString === this.state.value ? 'yui-picker-calendar-row-col-active' :
                  col.current ? 'yui-picker-calendar-row-col-current' :
                    col.currentMonth ? 'yui-picker-calendar-row-col-current-month' : 'yui-picker-calendar-row-col'
              }
              onClick={
                () => {
                  this.setState({
                    value: col.dateString,
                    isOpen: false
                  }, () => {
                    this.props.onChange && this.props.onChange(col.dateString)
                  })
                }
              }
            >
              {col.date}
            </div>
          })
        }
      </div>
    })
  }
  setCalendar = (time) => {
    this.dateUtil.setDate(
      new Date(time)
    )
    this.setState({
      calendar: this.dateUtil.getCalendar()
    })
  }
  render() {
    const { style, placeholder } = this.props
    const dark = this.props.dark || Window.yuiIsDark
    let theme = dark ? '-dark' : ''
    return <div className={`yui-date-picker${theme}`} style={style}>
      <div className='yui-date-picker-input'>
        <Input
          dark={dark}
          placeholder={placeholder}
          value={this.state.value}
          addonBefore={this.props.addonBefore}
          addonAfter={this.props.addonAfter}
          onFocus={
            () => {
              this.state.value ? this.dateUtil.setDate(
                new Date(this.state.value)
              ) : this.dateUtil.setDate(new Date())
              this.setState({
                isOpen: true,
                calendar: this.dateUtil.getCalendar()
              })
            }
          } />
      </div>
      {
        this.state.isOpen && <div className='yui-date-picker-layer' onClick={
          () => {
            this.setState({
              isOpen: false
            })
          }
        } />
      }
      {
        this.state.isOpen && <div className='yui-date-picker-body'>
          <div className='yui-date-picker-body-tools'>
            <div className='picker-tools-before' onClick={
              () => {
                this.setCalendar(this.dateUtil.date.getTime() - (this.dateUtil.isLeapYear() ? 366 : 355) * 24 * 60 * 60 * 1000)
              }
            }>
              <i className='iconfont icon-next'></i>
            </div>
            <div className='picker-tools-before picker-tools-before-month' onClick={
              () => {
                this.setCalendar(this.dateUtil.date.getTime() - this.dateUtil.getDateNumberByMonth(this.dateUtil.date.getMonth() + 1) * 24 * 60 * 60 * 1000)
              }
            }>
              <i className='iconfont icon-icon-jiantouzuo'></i>
            </div>
            <div className='picker-tools-date'>
              <Select
                dark={dark}
                style={{ border: 0 }}
                value={this.dateUtil.date.getFullYear()}
                dataList={this.yearList}
                onChange={
                  (e) => {
                    this.dateUtil.setDate(
                      new Date(`${e}-${this.dateUtil.date.getMonth() + 1}-${this.dateUtil.date.getDate()}`)
                    )
                    this.setState({
                      calendar: this.dateUtil.getCalendar()
                    })
                  }
                }
              />
              年
              <Select
                dark={dark}
                style={{ border: 0 }}
                value={this.dateUtil.date.getMonth() + 1}
                dataList={this.monthList}
                onChange={
                  (e) => {
                    this.dateUtil.setDate(
                      new Date(`${this.dateUtil.date.getFullYear()}-${e}-${this.dateUtil.date.getDate()}`)
                    )
                    this.setState({
                      calendar: this.dateUtil.getCalendar()
                    })
                  }
                }
              />
              月
            </div>
            <div className='picker-tools-next picker-tools-next-month' onClick={
              () => {
                this.setCalendar(this.dateUtil.date.getTime() + this.dateUtil.getDateNumberByMonth(this.dateUtil.date.getMonth() + 1) * 24 * 60 * 60 * 1000)
              }
            }>
              <i className='iconfont icon-jiantou2'></i>
            </div>
            <div className='picker-tools-next' onClick={
              () => {
                this.setCalendar(this.dateUtil.date.getTime() + (this.dateUtil.isLeapYear() ? 366 : 355) * 24 * 60 * 60 * 1000)
              }
            }>
              <i className='iconfont icon-next'></i>
            </div>
          </div>
          <div className='yui-date-picker-body-header'>
            {this.renderHeader()}
          </div>
          <div className='yui-date-picker-body-calendar'>
            {this.renderContent()}
          </div>
          <div className='yui-date-picker-body-footer'>
            <Button
              type='primary'
              label='今天'
              style={{ height: 30, width: 60 }}
              onClick={
                () => {
                  this.dateUtil.setDate(
                    new Date()
                  )
                  this.setState({
                    value: this.dateUtil.getDateString(new Date()),
                    isOpen: false
                  })
                }
              }
            />
          </div>
        </div>
      }
    </div>
  }
}
export {
  DatePicker
}
