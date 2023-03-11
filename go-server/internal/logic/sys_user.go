package logic

import (
	"go-sun/go-server/internal/models"
	"go-sun/go-server/internal/svc"
	"go-sun/go-server/internal/types"
	"go-sun/go-server/pkg/utils/e"
	"go-sun/go-server/pkg/utils/gcrypto"
)

type SysUserLogic struct {
}

func NewSysUserLogic() *SysUserLogic {
	return &SysUserLogic{}
}

// CheckLogin 检测用户登录
func (s *SysUserLogic) CheckLogin(params types.UserLoginReq) (string, uint) {
	if svc.Ctx.Captcha.Verify(params.CaptchaId, params.CaptchaCode) == false {
		return "", e.ERROR_CAPTCHA_VERIFY
	}
	pwd := gcrypto.PwdEncode(params.Password, svc.Ctx.Config.App.SaltPwd)
	userModel := models.NewSysUser().GetLoginInfo(params.Username, pwd)
	if userModel.Id == 0 {
		svc.Ctx.Logger.Errorf("用户[%s]登录失败 -> 账号密码错误", params.Username)
		return "", e.ERROR_ACCOUNT_LOGIN
	}
	//用户禁止登录
	if userModel.Status == false {
		return "", e.ERROR_ACCOUNT_CLOSE
	}
	token, err := NewSysUserAuthLogic().CreateJwtToken(userModel.Id)
	if err != nil {
		return "", e.FAILED
	}
	return token, e.SUCCESS
}
