import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
            }}>
                <Form onSubmit={this.props.onSubmit} style={{
                    maxWidth: '300px',
                    flexGrow: '1',
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        userSelect: 'none',
                    }}>CS Flash Cards</h1>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{
                            width: '100%',
                        }}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default withRouter(Form.create({})(Login))