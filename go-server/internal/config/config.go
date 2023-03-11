package config

import (
	"go-sun/go-server/pkg/core/gdb"
	"go-sun/go-server/pkg/core/glog"
	"go-sun/go-server/pkg/helper/gcaptcha"
	"go-sun/go-server/pkg/helper/gjwt"
)

type ServerConf struct {
	Name string `default:"go-server"`
	Host string `default:"0.0.0.0"`
	Port string `default:"3000"`
}

type AppConf struct {
	SaltPwd string `default:""`
}

type Config struct {
	ServerConf
	Captcha gcaptcha.CaptchaConf
	Jwt     gjwt.JwtConf
	Log     glog.LogConf
	Db      gdb.DatabaseConf
	App     AppConf
}
