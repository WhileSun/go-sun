package handler

import (
	"github.com/gin-gonic/gin"
	"go-sun/go-server/internal/svc"
	"go-sun/go-server/internal/types"
	"go-sun/go-server/pkg/utils/e"
)

type SysGlobalHandler struct {
}

// GetCaptcha 登录验证码
//
//	@tags			sys
//	@id				getCaptcha
//	@description	登录验证码
//	@Produce		json
//	@Success		200	{object}	types.JsonResp{data=types.GetCaptchaResp}	"成功"
//	@Router			/v1/captcha/get [get]
func (c *SysGlobalHandler) GetCaptcha(req *gin.Context) {
	id, b64s, err := svc.Ctx.Captcha.Generate()
	if err != nil {
		svc.Ctx.Logger.Error("验证码生成失败 ->", err.Error())
		e.New(req).Msg(e.ERROR_CAPTCHA_GENERATE)
		return
	}
	e.New(req).Data(e.SUCCESS, &types.GetCaptchaResp{Id: id, Src: b64s})
}
