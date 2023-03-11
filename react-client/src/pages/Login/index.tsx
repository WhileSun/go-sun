import { Col, Row, Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { useState,useEffect  } from 'react';
import { userLogin } from '@/services/api/user';
import { getCaptcha } from '@/services/api/sys';
import { setToken, getToken} from '@/utils/token';
import styles from './index.less';

const LoginPage: React.FC<unknown> = () => {

  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState<API.GetCaptchaResp>({});
  const [form] = Form.useForm();

  //获取验证码
  const getCaptchaFunc = async () => {
    const resp = await getCaptcha();
    if (resp.code == 0) {
      setCaptcha(resp.data);
      form.resetFields(['captcha']);
    }
  };

    //初始化获取验证码
    useEffect(() => {
      // if(getToken() != ""){
      //   history.push('/');
      // }
      getCaptchaFunc();
    }, []);

  const handleSubmit = async (values: any) => {
    try {
      setLoadingState(true);
      // 登录
      const resp = await userLogin({ ...values, captcha_id: captcha.id });
      setLoadingState(false);
      if (resp.code === 0) {
        message.success('登录成功！');
        setToken(resp.data.token);
        // await fetchLoginApis();
        // /** 此方法会跳转到 redirect 参数所在的位置 */
        // if (!history) return;
        // const { query } = history.location;
        // const { redirect } = query;
        // history.push(redirect || '/');
        return;
      }
      message.error(resp.msg);
      getCaptchaFunc();
    } catch (error) {
      setLoadingState(false);
      message.error('登录失败,Error:' + error);
    }
  }

  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.container}>
          <Row className={styles.row}>
            <Col xs={24} lg={12}>
              <div className={styles.left}>
                <div className={styles.content}>
                  <p>欢迎登录</p>
                  <p>GO-SUN管理系统</p>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className={styles.right}>
                <p className={styles.loginTitle}>
                  <span>登 录</span>
                </p>
                <Divider />
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={handleSubmit}
                  autoComplete="off"
                  form={form}
                  size="large"
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名！' }]}
                  >
                    <Input
                      prefix={<UserOutlined className={styles.prefixIcon} />}
                      placeholder="用户名"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码！' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className={styles.prefixIcon} />}
                      type="password"
                      placeholder="密码"
                    />
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Form.Item
                      name="captcha_code"
                      className={styles.captchaItemLeft}
                      rules={[
                        {
                          required: true,
                          message: '请输入验证码！',
                        },
                      ]}
                    >
                      <Input
                        prefix={<SafetyOutlined className={styles.prefixIcon} />}
                        type="captcha"
                        placeholder="验证码"
                      />
                    </Form.Item>
                    <Form.Item
                      className={styles.captchaItemRight}
                    >
                      <img
                        alt="验证码"
                        src={captcha.src}
                        className={styles.captchaRight}
                        onClick={getCaptchaFunc}
                      />
                    </Form.Item>
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>记住密码</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={styles.loginButton}
                      loading={loadingState}
                    >
                      登录
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
};

export default LoginPage;