package vo

// SysUserModel s_user用户表
type SysUserModel struct {
	BaseField
	Username string `json:"username"`
	Password string `json:"password"`
	RealName string `json:"real_name"`
	Status   bool   `json:"status"`
	Avatar   string `json:"avatar"`
}
