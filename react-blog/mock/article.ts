import { defineMock } from "@umijs/max";
import mockjs from 'mockjs';

export default defineMock({
  "/api/article/list/get": (req,res)=>{
    let data = mockjs.mock({
      'data|10': [{ title: '@ctitle(15, 30)', avatar:'@cname',date:'@date("yyyy-MM-dd")',content:'@cparagraph',"category|1": ['前端','技术文档','CSS','笔记']}],
    })
    res.status(200).json({code: 0, msg: "ok", ...data})
  },
  "/api/article/category/get": (req,res)=>{
    let data = mockjs.mock({
      'data|20': [{ name: '@ctitle(3, 10)', 'total|1-100':100}],
    })
    res.status(200).json({code: 0, msg: "ok", ...data})
  },
  "/api/article/tag/get": (req,res)=>{
    let data = mockjs.mock({
      'data|20': [{ name: '@ctitle(3, 5)'}],
    })
    res.status(200).json({code: 0, msg: "ok", ...data})
  },
});