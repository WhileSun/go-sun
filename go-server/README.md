## 使用
需把etc的config.bak.yaml文件修改为config.yaml(配置根据实际情况修改)

### 采用swagger
- swag安装(swagger使用文档)  
go get -u github.com/swaggo/swag/cmd/swag  
go install github.com/swaggo/swag/cmd/swag  
  
- gin-swagger插件引入
go get -u -v github.com/swaggo/gin-swagger  
go get -u -v github.com/swaggo/files  
  
- swagger2.0转换为openapi  
swagger flatten -o openapi.yaml swagger.json
  
### air
https://github.com/cosmtrek/air  
go install github.com/cosmtrek/air@lates 


### swag一些小问题
struct注释只能通过//,其他方式不识别