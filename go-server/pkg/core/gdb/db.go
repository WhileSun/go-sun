package gdb

import (
	"github.com/sirupsen/logrus"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"strings"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

// DatabaseConf 数据库连接设置
type DatabaseConf struct {
	Type        string         `default:"postgres"`
	Host        string         `default:"127.0.0.1"`
	Port        string         `default:"5432"`
	User        string         `default:"postgres"`
	Password    string         `default:"123456"`
	Name        string         `default:"test"`
	TablePrefix string         `default:""`
	Charset     string         `default:"utf8"`
	MaxIdleConn int            `default:"20"`
	MaxOpenConn int            `default:"200"`
	Log         bool           `default:"false"`
	LogWriter   *logrus.Logger //日志插件
}

var (
	dbURI     string
	dialector gorm.Dialector
)

type Database struct {
}

// New 初始化数据库连接
func New(databaseConf DatabaseConf) *gorm.DB {
	return databaseConf.run()
}

// run 初始化运行
func (databaseConf *DatabaseConf) run() *gorm.DB {
	dbType := strings.ToLower(databaseConf.Type)
	if dbType == "mysql" {
		databaseConf.mySqlInit()
	} else if dbType == "postgres" {
		databaseConf.postGreSqlInit()
	} else {
		log.Fatalf("config database type [%s] is not setting", dbType)
	}
	var newLogger logger.Interface
	if databaseConf.Log {
		var writer logger.Writer
		if databaseConf.LogWriter != nil {
			writer = &Writer{log: databaseConf.LogWriter}
		} else {
			writer = log.New(os.Stdout, "\r\n", log.LstdFlags) // gorm io writer（日志输出的目标，前缀和日志包含的内容——译者注）
		}
		newLogger = logger.New(
			writer,
			logger.Config{
				SlowThreshold:             time.Second, // 慢 SQL 阈值
				LogLevel:                  logger.Info, // 日志级别
				IgnoreRecordNotFoundError: true,        // 忽略ErrRecordNotFound（记录未找到）错误
				Colorful:                  false,       // 禁用彩色打印
			},
		)
	}
	conn, err := gorm.Open(dialector, &gorm.Config{
		NamingStrategy: schema.NamingStrategy{TablePrefix: databaseConf.TablePrefix, SingularTable: true},
		Logger:         newLogger,
	})
	if err != nil {
		log.Fatalf("database gorm conn failed,Error: %s", err.Error())
	}
	sqlDB, err := conn.DB()
	if err != nil {
		log.Fatalf("database connect server failed,Error: %s", err.Error())
	}
	sqlDB.SetMaxIdleConns(databaseConf.MaxIdleConn) // 空闲进程数
	sqlDB.SetMaxOpenConns(databaseConf.MaxOpenConn) // 最大进程数
	sqlDB.SetConnMaxLifetime(time.Second * 600)     // 设置了连接可复用的最大时间
	if err := sqlDB.Ping(); err != nil {
		log.Fatalf("database ping is failed,Error:%s", err.Error())
	}
	return conn
}
