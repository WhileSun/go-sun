# 简介
go-sun准备开发成一个golang+react+antd的后端管理框架

# 开发流程

## 基础技术版本
- golang 1.19
- react
- umi4.x
- antd

## swagger+openapi
golang中引入swagger,swag init生成文件
umi中引入openapi,pnpm openapi生成文件

## 功能点(一期)
- [x] 用户登录
- [ ] 权限管理
  - [ ] 用户管理
  - [ ] 角色管理
  - [ ] 菜单管理
  - [ ] 接口管理
  
### 用户登录
采用jwt token登录  
每次登录检验token是否过期，如果过期且在设置最长过期时间内进行续期。通过header传输一个newtoken给前端，前端进行替换


  

    


    