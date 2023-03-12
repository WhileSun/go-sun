package models

import (
	"go-sun/go-server/internal/svc"
	"go-sun/go-server/internal/types/vo"
)

type SysUser struct {
	vo.SysUserModel
}

func NewSysUser() *SysUser {
	return &SysUser{}
}

func (m *SysUser) TableName() string {
	return "sys_user"
}

// GetLoginInfo 检测账号密码是否正确
func (m *SysUser) GetLoginInfo(username string, password string) *SysUser {
	svc.Ctx.Db.Select("id,status").Where("username=? and password=?", username, password).Find(m)
	return m
}

// GetInfo 获取用户信息
func (m *SysUser) GetInfo(id int) *SysUser {
	svc.Ctx.Db.Select("id,username,real_name,status").Where("id = ?", id).Find(m)
	return m
}
