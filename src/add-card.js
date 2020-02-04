import React from 'react';
import { Form, Radio, Input, Button } from 'antd';

class CustomizeForm extends React.Component {
    submit = (e) => {
        // todo 记得删除 alert(111)
    }

    render() {
        const { TextArea } = Input;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout='horizontal' onSubmit={this.submit} style={{
                margin: '20px 0',
            }}>
                <h2 style={{
                    textAlign: 'center',
                }}>Add a Card</h2>
                <Form.Item label='Card Type' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} onSubmit={this.submit}>
                    {
                        getFieldDecorator('cardType', {
                            rules: [{required: true, message: 'Please choose your card type!'}]
                        })(
                            <Radio.Group>
                                <Radio value={0}>General</Radio>
                                <Radio value={1}>Code</Radio>
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                <Form.Item label='Front of Card' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                    {
                        getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please input your card title!' }]
                        })(
                            <Input />
                        )
                    }
                </Form.Item>
                <Form.Item label='Back of Card' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                    {
                        getFieldDecorator('text')(
                            <TextArea style={{
                                minHeight: '170px',
                            }} />
                        )
                    }
                </Form.Item>
                <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                    <Button type='primary' htmlType='submit' style={{
                        marginRight: '20px',
                    }}>Save</Button>
                    <Button type='default' htmlType='reset'>Reset</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create({})(CustomizeForm);