package types

type GetCaptchaResp struct {
	Id  string `json:"id" validate:"required"`  // 验证码ID
	Src string `json:"src" validate:"required"` // 验证码base64
}
