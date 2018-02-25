import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from 'antd/dist/antd.css';
import { Form, Input, Checkbox, Button, Icon } from 'antd';
import axios from 'axios';
import Router from 'next/router';

const FormItem = Form.Item;

class LoginPage extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        axios
          .post(
            'http://localhost:8040/token',
            {
              ...values,
            },
            {
              withCredentials: true,
            },
          )
          .then(response => {
            console.log(response);
            Router.push('/');
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} style={{ maxWidth: 300, margin: 'auto', marginTop: 100 }}>
          <FormItem>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号码!' }],
            })(<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住我</Checkbox>)}
            <a className="myLogin-form-forgot" href="" style={{ float: 'right' }}>
              忘记密码
            </a>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              登录
            </Button>
            <a href="">现在注册</a>
          </FormItem>
        </Form>
        <style jsx>{``}</style>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  form: PropTypes.object,
};

export default Form.create()(LoginPage);
