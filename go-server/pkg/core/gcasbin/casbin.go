package gcasbin

import (
	"github.com/casbin/casbin/v2"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"gorm.io/gorm"
	"log"
	"path/filepath"
	"runtime"
)

type CasbinConf struct {
	Prefix    string `default:"r"`
	TableName string `default:"role_policy"`
	AdminRole string `default:"super_admin"`
	ConfPath  string `default:"rbac_model.conf"`
	DbWriter  *gorm.DB
}

func New(casbinConf CasbinConf) *casbin.Enforcer {
	return casbinConf.run()
}

func (casbinConf *CasbinConf) run() *casbin.Enforcer {
	if casbinConf.DbWriter == nil {
		log.Fatalf("casbin need db")
	}
	adapter, err := gormadapter.NewAdapterByDBUseTableName(casbinConf.DbWriter, casbinConf.Prefix, casbinConf.TableName)
	if err != nil {
		log.Fatalf("casbin gormadapter error: %s", err.Error())
	}
	_, file, _, _ := runtime.Caller(1)
	enforcer, err := casbin.NewEnforcer(filepath.Dir(file)+"/"+casbinConf.ConfPath, adapter)
	if err != nil {
		log.Fatalf("casbin NewEnforcer error: %s", err.Error())
	}
	enforcer.LoadPolicy()
	enforcer.AddFunction("checkSuperUser", func(args ...interface{}) (interface{}, error) {
		// 获取用户名
		username := args[0].(string)
		// 检查用户名的角色是否为super_admin
		ok, _ := enforcer.HasRoleForUser(username, casbinConf.AdminRole)
		return ok, nil
	})
	return enforcer
}
