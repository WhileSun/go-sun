import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { WsTable,WsButton } from '@/components/WsTools';
import { useState ,useRef, useEffect} from 'react';
import { getUserList,userLogin } from '@/services/api/user';
import { Space,Button,Table,Form } from 'antd';


var store = {};
const HomePage: React.FC = () => {
  const tableRef = WsTable.useTable();
  const ref = useRef();
  const [formData,setFormData] = useState({});
  const [formShow,setFormShow] = useState(false);
  const {stores,setStores} = useModel('storeModel');
  
  const formFunc = (row:any)=>{
    setFormData(row)
    setFormShow(true);
  }

  useEffect(()=>{
    console.log(tableRef);
  },[tableRef])

  return (
    <>
      <WsTable
        store={store}
        ref = {ref}
        table = {tableRef}
        // display={"fixed"}
        checkbox={true}
        rowKey="book_name"
        storeModel={ {params:stores,setParams:setStores,name:"table_home"}}
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
            {name:'添加',onClick:()=>{}},
            {name:'删除',onClick:()=>{ console.log(tableRef.getCheckedIds())}}
          ]
        }
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
          {title:'操作',name:'id',width:80,align:'center',render:function(v,row){
            return (<Space>
              <WsButton name="编辑" onClick={()=>{}}/>
              <WsButton name="删除" />
              <WsButton name="添加" />
            </Space>);
          }},
        ]}
        api={getUserList}
      />
    </>
  );
};

export default HomePage;
