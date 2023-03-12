package vo

import "go-sun/go-server/pkg/utils/gtime"

type BaseField struct {
	Id        int            `json:"id" gorm:"primary_key"`
	CreatedAt gtime.DateTime `json:"created_at" swaggertype:"string"`
	UpdatedAt gtime.DateTime `json:"updated_at" swaggertype:"string"`
}
