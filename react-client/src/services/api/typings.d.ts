declare namespace API {
  type GetCaptchaResp = {
    /** 验证码ID */
    id: string;
    /** 验证码base64 */
    src: string;
  };

  type GetUserInfoResp = {
    /** 用户头像 */
    avatar: string;
    /** 用户名称 */
    real_name: string;
    /** 用户状态 */
    status: boolean;
  };

  type JsonResp = {
    code: number;
    data: any;
    msg: string;
    time: number;
  };

  type UserLoginReq = {
    /** 验证码 */
    captcha_code: string;
    /** 验证码ID */
    captcha_id: string;
    /** 用户名称 */
    password: string;
    /** 用户名称 */
    username: string;
  };

  type UserLoginResp = {
    /** jwt token */
    token: string;
  };
}
