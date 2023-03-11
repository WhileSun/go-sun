package handler

import (
	"github.com/gin-gonic/gin"
	"go-sun/go-server/internal/logic"
	"go-sun/go-server/internal/svc"
	"go-sun/go-server/internal/types"
	"go-sun/go-server/pkg/utils/e"
	"go-sun/go-server/pkg/utils/gvalidator"
)

type SysUserHandler struct {
}

// Login 用户登录接口
//
//	@tags			user
//	@id				userLogin
//	@description	登录接口
//	@Produce		json
//	@Param			request	body		types.UserLoginReq	true	"UserLoginReq"
//	@Success		200		{object}	types.JsonResp{data=types.UserLoginResp}	"成功"
//	@Router			/v1/user/login [post]
func (c *SysUserHandler) Login(req *gin.Context) {
	var params types.UserLoginReq
	if err := gvalidator.ReqValidate(req, &params); err != nil {
		svc.Ctx.Logger.Info("用户登录参数有误->", err.Error())
		e.New(req).MsgDetail(1, err.Error())
		return
	}
	token, code := logic.NewSysUserLogic().CheckLogin(params)
	if code != e.SUCCESS {
		e.New(req).Msg(code)
		return
	}
	e.New(req).Data(e.SUCCESS, &types.UserLoginResp{Token: token})
}
