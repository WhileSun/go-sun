package svc

import (
	"github.com/sirupsen/logrus"
	"go-sun/go-server/internal/config"
	"go-sun/go-server/pkg/core/gdb"
	"go-sun/go-server/pkg/core/glog"
	"go-sun/go-server/pkg/helper/gcaptcha"
	"go-sun/go-server/pkg/helper/gjwt"
	"gorm.io/gorm"
)

var Ctx *ServiceContext

type ServiceContext struct {
	Config  config.Config
	Captcha *gcaptcha.CaptchaConf
	Jwt     *gjwt.JwtConf
	Logger  *logrus.Logger
	Db      *gorm.DB
}

func NewServiceContext(c config.Config) *ServiceContext {
	Ctx = &ServiceContext{
		Config:  c,
		Captcha: gcaptcha.New(c.Captcha),
		Jwt:     gjwt.New(c.Jwt),
		Logger:  glog.New(c.Log),
		Db:      gdb.New(c.Db),
	}
	return Ctx
}
