// Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "contact": {
            "name": "whileSun"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/v1/captcha/get": {
            "get": {
                "description": "登录验证码",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "sys"
                ],
                "operationId": "getCaptcha",
                "responses": {
                    "200": {
                        "description": "成功",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/types.JsonResp"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/types.GetCaptchaResp"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        "/v1/user/login": {
            "post": {
                "description": "登录接口",
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "user"
                ],
                "operationId": "userLogin",
                "parameters": [
                    {
                        "description": "UserLoginReq",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/types.UserLoginReq"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "成功",
                        "schema": {
                            "allOf": [
                                {
                                    "$ref": "#/definitions/types.JsonResp"
                                },
                                {
                                    "type": "object",
                                    "properties": {
                                        "data": {
                                            "$ref": "#/definitions/types.UserLoginResp"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "types.GetCaptchaResp": {
            "type": "object",
            "properties": {
                "id": {
                    "description": "验证码ID",
                    "type": "string"
                },
                "src": {
                    "description": "验证码base64",
                    "type": "string"
                }
            }
        },
        "types.JsonResp": {
            "type": "object",
            "required": [
                "code",
                "data",
                "msg",
                "time"
            ],
            "properties": {
                "code": {
                    "type": "integer"
                },
                "data": {},
                "msg": {
                    "type": "string"
                },
                "time": {
                    "type": "integer"
                }
            }
        },
        "types.UserLoginReq": {
            "type": "object",
            "required": [
                "captcha_code",
                "captcha_id",
                "password",
                "username"
            ],
            "properties": {
                "captcha_code": {
                    "description": "验证码",
                    "type": "string"
                },
                "captcha_id": {
                    "description": "验证码ID",
                    "type": "string"
                },
                "password": {
                    "description": "用户名称",
                    "type": "string"
                },
                "username": {
                    "description": "用户名称",
                    "type": "string",
                    "maxLength": 1,
                    "minLength": 0
                }
            }
        },
        "types.UserLoginResp": {
            "type": "object",
            "required": [
                "token"
            ],
            "properties": {
                "token": {
                    "description": "jwt token",
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "127.0.0.1:3000",
	BasePath:         "/api",
	Schemes:          []string{},
	Title:            "接囗文档",
	Description:      "go-server服务接口文档",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
