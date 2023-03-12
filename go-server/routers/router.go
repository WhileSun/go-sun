package routers

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	_ "go-sun/go-server/docs"
	"go-sun/go-server/internal/handler"
	"go-sun/go-server/middleware"
)

func RegisterHandlers() *gin.Engine {
	r := gin.New()

	r.Use(middleware.Cors())
	//访问日志
	r.Use(middleware.Logger())
	// 使用 Recovery 中间件
	r.Use(gin.Recovery())
	//handler new
	apis := handler.GroupHandlerApp

	g := r.Group("/api")
	{
		v1 := g.Group("/v1")
		{
			v1.GET("/captcha/get", apis.SysGlobalHandler.GetCaptcha)
			v1.POST("/user/login", apis.SysUserHandler.Login)

		}
		v1.Use(middleware.LoginAuth())
		userRouter := v1.Group("/user")
		{
			userRouter.GET("/out.login", apis.SysUserHandler.OutLogin)
			userRouter.GET("/info/get", apis.SysUserHandler.GetInfo)
		}
	}

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	return r
}
