import React from 'react';
import {Form, Input, Button, Checkbox} from 'antd';
import {MailOutlined, LockOutlined, SafetyOutlined} from '@ant-design/icons';
import style from './Login.module.css';
import { Alert } from 'antd';

/*TODO

1. кнопка для обновления каптчи


*/


const Login = ({onFinish, errorMessage, captchaUrl}) => {

    return <Form name="login" initialValues={{remember: true,}} onFinish={onFinish}>

        <div className={style.formItemsWrapper}>
            <Form.Item name="email"
                       rules={[
                           {required: true, message: 'Please input your email!',},
                           /*{
                               pattern: '^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,})$',
                               message: "Please input a valid email"
                           }*/
                       ]}>
                <Input prefix={<MailOutlined className="site-form-item-icon"/>}
                       placeholder="Email"/>
            </Form.Item>

            <Form.Item name="password"
                       rules={[
                           {required: true, message: 'Please input your password!',},
                       ]}>
                <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                       type="password" placeholder="Password"/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {
                captchaUrl &&
                <div>
                    <img src={captchaUrl} alt="captcha"/>
                    <Form.Item name="captcha"
                               rules={[
                                   {required: true, message: 'Please input captcha symbols!',},
                               ]}>
                        <Input prefix={<SafetyOutlined className="site-form-item-icon"/>}
                               placeholder="Captcha symbols"/>
                    </Form.Item>
                </div>
            }
            <Form.Item>
                <Button className="login-form-button" type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </div>
        {
            errorMessage &&
            <div className={style.errorMessage}>
                <Alert
                    message={errorMessage}
                    type="error"
                />
            </div>
        }
    </Form>
}

export default Login;