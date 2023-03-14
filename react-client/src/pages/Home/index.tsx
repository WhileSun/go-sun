import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { WsTable } from '@/components/WsTools';
import { useState } from 'react';
import { getUserList,userLogin } from '@/services/api/user';


var store = {};
const HomePage: React.FC = () => {
  
  const [formData,setFormData] = useState({});
  const [formShow,setFormShow] = useState(false);
  const {stores,setStores} = useModel('storeModel');


  const formFunc = (row:any)=>{
    setFormData(row)
    setFormShow(true);
  }
  
  return (
    <>
      <WsTable
        store={store}
        // display={"fixed"}
        rowKey="book_name"
        storeModel={ {params:stores,setParams:setStores,name:"table_home"}}
        // table = {tableRef}
        searchs={
          [
            {type:'selectInput',listData:{'book_name':'书籍名称'}},
            {label:'名字',name:'username',type:'input',placeholder:'名字'},
            {label:'人数213133',name:'number1',type:'input',placeholder:'人数'},
            {label:'运营人员',type:'select',name:'people',oneShowMode:true,listData:{1:'male1_1',2:'male2_2'}},
            {label:'运营人员1',type:'selectInput',listData:{'id':'产品名称','name':'产品编码'}},
            {label:'日期',name:'date',type:'dateRange'},
          ]
        }
        btns = {
          [
            {title:'添加',onClick:()=>{formFunc({});}}
          ]
        }
        // toolbars = {
        //   [
        //     {align:"left",render:()=>{return (<><b>1233</b></>)}},
        //     {align:"right",render:()=>{return (<><b>1</b></>)}},
        //     {align:"right",render:()=>{return (<><b>2</b></>)}},
        //   ]
        // }
        th={[
          {name:"book_name",title:'书籍名称',width:'40%',render:v=>{return v||'-'}},
          {name:"book_ident",title:'书籍标识',width:'30%',align:'left',render:v=>{return v||'-'}},
          {name:"created_at",title:'创建时间',width:'30%',align:'center',render:v=>{return v||'-'}},
          // {name:"id",title:'文档内容',width:80,align:'center',render:(v,row)=>{
          //   return ( 
          //       <Link target = "_blank" to={{pathname:'/daily/md/document',search:qs.stringify({book_id:v})}}>
          //         <WsButton title="前往" onClick={()=>{
          //            }}/>
          //       </Link>
          //     )
          // }},
          // {title:'操作',name:'id',width:80,align:'center',render:function(v,row){
          //   return (<Space>
          //     <WsButton title="编辑" onClick={()=>{
          //       formFunc(row);
          //     }}/>
          //     {/* <WsButton title="删除" pop={true} onClick={()=>{
          //       loadApi(deletePerms,{id:row.id},()=>{
          //         tableRef.reload();
          //       },true);
          //     }}/> */}
          //   </Space>);
          // }},
        ]}
        api={getUserList}
      />
    </>
  );
};

export default HomePage;
