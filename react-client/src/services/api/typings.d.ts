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

  type getUserListParams = {
    /** 验证码 */
    captcha_code: string;
    /** 验证码ID */
    captcha_id: string;
    /** 用户名称 */
    password: string;
    /** 用户名称 */
    username: string;
  };

  type GetUserListResp = {
    /** 用户状态 */
    book_ident: string;
    /** 用户名称 */
    book_name: string;
    /** 用户头像 */
    created_at: string;
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
