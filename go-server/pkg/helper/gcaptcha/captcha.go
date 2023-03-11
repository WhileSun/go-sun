package gcaptcha

import (
	"github.com/mojocn/base64Captcha"
	"image/color"
)

type configJsonBody struct {
	DriverAudio   *base64Captcha.DriverAudio
	DriverString  *base64Captcha.DriverString
	DriverChinese *base64Captcha.DriverChinese
	DriverMath    *base64Captcha.DriverMath
	DriverDigit   *base64Captcha.DriverDigit
}

type CaptchaConf struct {
	Type   string `default:"digit"`
	Height int    `default:"80"`
	Width  int    `default:"240"`
	Length int    `default:"6"`
	Store  base64Captcha.Store
}

func New(captchaConf CaptchaConf) *CaptchaConf {
	store := base64Captcha.DefaultMemStore
	captchaConf.Store = store
	return &captchaConf
}

func (captchaConf *CaptchaConf) Generate() (id string, b64s string, err error) {
	param := configJsonBody{
		DriverString: &base64Captcha.DriverString{
			Height:          captchaConf.Height,
			Width:           captchaConf.Width,
			Length:          captchaConf.Length,
			NoiseCount:      0,
			Source:          "123456789qwertyuipkjhgfdsazxcvbnm",
			ShowLineOptions: base64Captcha.OptionShowHollowLine | base64Captcha.OptionShowSlimeLine,
			Fonts:           []string{"wqy-microhei.ttc"},
			BgColor:         &color.RGBA{254, 254, 254, 254},
		},
		DriverDigit: &base64Captcha.DriverDigit{
			Height:   captchaConf.Height,
			Width:    captchaConf.Width,
			Length:   captchaConf.Length,
			MaxSkew:  0.7,
			DotCount: 80,
		},
	}
	var driver base64Captcha.Driver

	//create base64 encoding captcha
	switch captchaConf.Type {
	case "audio":
		driver = param.DriverAudio
	case "string":
		driver = param.DriverString.ConvertFonts()
	case "math":
		driver = param.DriverMath.ConvertFonts()
	case "chinese":
		driver = param.DriverChinese.ConvertFonts()
	case "digit":
		driver = param.DriverDigit
	default:
		driver = param.DriverDigit
	}
	c := base64Captcha.NewCaptcha(driver, captchaConf.Store)
	id, b64s, err = c.Generate()
	return id, b64s, err
}

func (captchaConf *CaptchaConf) Verify(Id string, VerifyValue string) (res bool) {
	if captchaConf.Store.Verify(Id, VerifyValue, true) {
		return true
	} else {
		return false
	}
}
