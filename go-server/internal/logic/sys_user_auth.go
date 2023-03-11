package logic

import (
	"github.com/dgrijalva/jwt-go"
	"go-sun/go-server/internal/svc"
	"strings"
	"time"
)

type SysUserAuthLogic struct {
}

func NewSysUserAuthLogic() *SysUserAuthLogic {
	return &SysUserAuthLogic{}
}

func (s *SysUserAuthLogic) CreateJwtToken(userId int) (token string, err error) {
	token, err = svc.Ctx.Jwt.CreateToken(jwt.MapClaims{"userId": userId})
	return
}

func (s *SysUserAuthLogic) ParseJwtToken(token string) (jwt.MapClaims, string, bool) {
	var newToken string
	userInfo, err := svc.Ctx.Jwt.ParseToken(token)
	//解析失败查找是否过期
	if err != nil {
		if strings.Contains(err.Error(), "expired") {
			nowTime := time.Now().Unix()
			if int64(userInfo["lastexp"].(float64)) >= nowTime {
				newToken, err = svc.Ctx.Jwt.CreateToken(userInfo)
			}
		}
	}
	if err != nil {
		return userInfo, newToken, false
	} else {
		return userInfo, newToken, true
	}
}
