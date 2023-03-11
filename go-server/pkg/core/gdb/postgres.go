package gdb

import (
	"fmt"

	"gorm.io/driver/postgres"
)

func (databaseConf *DatabaseConf) postGreSqlInit() {
	dbURI = fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s",
		databaseConf.Host,
		databaseConf.Port,
		databaseConf.User,
		databaseConf.Name,
		databaseConf.Password)
	dialector = postgres.New(postgres.Config{
		DSN:                  dbURI,
		PreferSimpleProtocol: true, // disables implicit prepared statement usage
	})
}
