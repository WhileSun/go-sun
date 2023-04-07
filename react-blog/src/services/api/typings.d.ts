declare namespace API {

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
}