package handler

type GroupHandler struct {
	SysGlobalHandler SysGlobalHandler
	SysUserHandler   SysUserHandler
}

var GroupHandlerApp = new(GroupHandler)
