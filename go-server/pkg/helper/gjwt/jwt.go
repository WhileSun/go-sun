package gjwt

import (
	"github.com/dgrijalva/jwt-go"
	"time"
)

// JwtConf
// Version 版本号用于
type JwtConf struct {
	Secret  string  `default:"go_server"`
	Exp     int64   `default:"1800"`
	LastExp int64   `default:"0"`
	Version float64 `default:"1.0"`
}

func New(jwtConf JwtConf) *JwtConf {
	// 默认失效后半天内访问自动续期
	if jwtConf.LastExp == 0 {
		jwtConf.LastExp = jwtConf.Exp + 43200
	}
	return &jwtConf
}

func (jwtConf *JwtConf) CreateToken(values jwt.MapClaims) (string, error) {
	values["exp"] = time.Now().Unix() + jwtConf.Exp
	values["lastexp"] = time.Now().Unix() + jwtConf.LastExp
	values["iat"] = time.Now().Unix()
	values["version"] = jwtConf.Version
	at := jwt.NewWithClaims(jwt.SigningMethodHS256, values)
	token, err := at.SignedString([]byte(jwtConf.Secret))
	if err != nil {
		return "", err
	}
	return token, nil
}

func (jwtConf *JwtConf) ParseToken(tokenString string) (jwt.MapClaims, error) {
	//检测加密方式是否一致
	token, tokenErr := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		err, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return err, nil
		}
		return []byte(jwtConf.Secret), nil
	})
	if token == nil {
		return nil, tokenErr
	}
	if !token.Valid {
		if token.Claims == nil {
			return nil, tokenErr
		}
		claims := token.Claims.(jwt.MapClaims)
		return claims, tokenErr
	} else {
		claims := token.Claims.(jwt.MapClaims)
		return claims, nil
	}
}
