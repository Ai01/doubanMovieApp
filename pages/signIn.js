import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button } from 'antd';
import styles from 'antd/dist/antd.css';
import axios from 'axios';
import Router from 'next/router';

const FormItem = Form.Item;

class SignInPage extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        axios
          .post(
            'http://localhost:8040/user',
            {
              userInfo: {
                ...values,
              }
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
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号码!' }],
            })(<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入邮箱!' }],
            })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              注册
            </Button>
          </FormItem>
        </Form>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </div>
    );
  }
}

SignInPage.propTypes = {
  form: PropTypes.object,
};

export default Form.create()(SignInPage);
