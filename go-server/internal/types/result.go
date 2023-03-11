package types

type JsonResp struct {
	Code uint   `json:"code" validate:"required"`
	Msg  string `json:"msg" validate:"required"`
	Data interface{}  `json:"data" validate:"required"`
	Time int64  `json:"time" validate:"required"`
}