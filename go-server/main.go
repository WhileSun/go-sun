package main

import (
	"flag"
	"fmt"
	"github.com/jinzhu/configor"
	"go-sun/go-server/internal/config"
	"go-sun/go-server/internal/svc"
	"go-sun/go-server/pkg/utils/gvalidator"
	"go-sun/go-server/routers"
	"net/http"
	"time"
)

var configFile = flag.String("f", "./etc/config.yaml", "the config file")

// @title			接囗文档
// @version		1.0
// @Swagger		2.0
// @description	go-server服务接口文档
// @contact.name	whileSun
// @host			127.0.0.1:3000
// @BasePath		/api
func main() {
	flag.Parse()
	var c config.Config
	configor.Load(&c, *configFile)
	gvalidator.InitGinValidate("zh")

	handler := routers.RegisterHandlers()
	s := &http.Server{
		Addr:         c.Host + ":" + c.Port,
		Handler:      handler,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
	}
	defer s.Close()
	svc.NewServiceContext(c)
	fmt.Println(fmt.Sprintf("[%s]Listening and serving %s:%s", c.Name, c.Host, c.Port))
	var err error
	if c.KeyFile != "" && c.CertFile != "" {
		err = s.ListenAndServeTLS(c.CertFile, c.KeyFile)
	} else {
		err = s.ListenAndServe()
	}
	if err != nil {
		fmt.Println(fmt.Sprintf("[%s]start server fail error %s \r\n", c.Name, err.Error()))
	}

}
