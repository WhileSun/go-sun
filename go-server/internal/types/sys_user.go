package types

// UserLoginReq 用户登录
// example 和//在swagger使用
// form在参数绑定中使用
type UserLoginReq struct {
	Username    string `form:"username" json:"username" validate:"required" label:"用户名称"`              //用户名称
	Password    string `form:"password"  json:"password" validate:"required"  label:"用户密码"`            //用户名称
	CaptchaId   string `form:"captcha_id" json:"captcha_id" validate:"required" label:"验证码ID"`         // 验证码ID
	CaptchaCode string `form:"captcha_code" json:"captcha_code" validate:"required,len=6" label:"验证码"` // 验证码
}

type UserLoginResp struct {
	Token string `validate:"required" json:"token"` // jwt token
}

type GetUserInfoResp struct {
	RealName string `json:"real_name" validate:"required"` //用户名称
	Status   bool   `json:"status" validate:"required"`    //用户状态
	Avatar   string `json:"avatar" validate:"required"`    //用户头像
}
