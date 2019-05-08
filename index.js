
import React, { PureComponent } from 'react'
import { Form, Input, Select, DatePicker, Radio, Checkbox, TimePicker } from 'antd'
import moment from 'moment'
import styles from './index.scss'

const { TextArea } = Input
const RangePicker = DatePicker.RangePicker
const Option = Select.Option
const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group

/**
 * @class filterForm
 * @extends {PureComponent}
 * type 表单类型 必填
 * name  控件key 必填
 * label  控件名称 必填
 * placeholder
 * value  初始化值
 * required 默认 false 是否必填
 * disabled 默认 false 是否禁用
 * format 默认 HHHH-MM-DD 日期转换格式
 * showTime 默认 false 是否开启选择时分秒
 * style Form.Item样式
 */

class filterForm extends PureComponent{

    initialForm = () => {
        const { formList, form } = this.props
        const { getFieldDecorator } = form
        const dateStyle = {
            width: '100%'
        }
        return formList.map(item => {
            const formItemProperty = {
                key: item.name,
                required: item.required,
                label: item.label,
                style: item.style,
                ...item.formItemLayout
            }
            const formInputProperty = {
                placeholder: item.placeholder,
                disabled: item.disabled
            }
            switch (item.type) {
                case 'INPUT':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value
                                })
                                (
                                    <Input {...formInputProperty} />
                                )
                            }
                        </Form.Item>
                    )
                case 'SELECT':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value
                                })
                                (
                                    <Select {...formInputProperty}>
                                        {
                                            item.options && item.options.map( option => {
                                                return <Option key={option.id} value={option.id}>{option.name}</Option>
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                    )
                case 'RADIO':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value
                                })
                                (
                                    <RadioGroup {...formInputProperty} >
                                        {
                                            item.options && item.options.map( option => {
                                                return <Radio key={option.id} value={option.id}>{option.name}</Radio>
                                            })
                                        }
                                    </RadioGroup>
                                )
                            }
                        </Form.Item>
                    )
                case 'CHECKBOX':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value
                                })
                                (
                                    <CheckboxGroup {...formInputProperty}>
                                        {
                                            item.options && item.options.map( option => {
                                                return <Checkbox key={option.id} value={option.id}>{option.name}</Checkbox>
                                            })
                                        }
                                    </CheckboxGroup>
                                )
                            }
                        </Form.Item>
                    )
                case 'TEXTAREA':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value
                                })
                                (
                                    <TextArea {...formInputProperty} autosize={item.autosize || { minRows: 1, maxRows: 6 }} />
                                )
                            }
                        </Form.Item>
                    )
                case 'DATEPICKER':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value && moment(item.value)
                                })
                                (
                                    <DatePicker
                                        style={dateStyle}
                                        {...formInputProperty}
                                        showTime={item.showTime}
                                        format={item.format ? item.format : 'YYYY-MM-DD'}
                                    />
                                )
                            }
                        </Form.Item>
                    )
                case 'TIMEPICKER':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value && moment(item.value)
                                })
                                (
                                    <TimePicker
                                        style={dateStyle}
                                        format={item.format ? item.format : 'HH:mm:ss'}
                                        placeholder={item.placeholder}
                                        disabled={item.disabled}
                                    />
                                )
                            }
                        </Form.Item>
                    )
                case 'RANGEPICKER':
                    return (
                        <Form.Item {...formItemProperty}>
                            {
                                getFieldDecorator(item.name, {
                                    initialValue: item.value && [moment(item.value[0]), moment(item.value[1])]
                                })
                                (
                                    <RangePicker
                                        style={dateStyle}
                                        showTime={item.showTime}
                                        format={item.format ? item.format : 'YYYY-MM-DD'}
                                        placeholder={item.placeholder}
                                        disabled={item.disabled}
                                    />
                                )
                            }
                        </Form.Item>
                    )
                default:
                    return null
            }
        })
    }
    
    
    render(){
        return (
            <div className={styles['filter-form']}>
                {this.initialForm()}
            </div>
        )
    }
}

export default filterForm
