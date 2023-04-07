import React, { useEffect, useState } from "react";
import HomeCard from "../HomeCard";
import { FolderOpenFilled } from "@ant-design/icons";
import styles from './index.less';
import { getCategoryList } from "@/services/api/article";

interface HomeCategoryProps {
  title?: string;
}

const HomeCategory: React.FC<HomeCategoryProps> = (props) => {
  const [categoryList,setCategoryList] = useState<Array<{[key:string]:any}>>([])
  useEffect(()=>{
    getCategoryList().then((resp)=>{
      console.log(resp);
      setCategoryList(resp.data)
    })
  },[])
  const {
    title = '文章分类'
  } = props;

  const items = categoryList.map((item,index)=>{
    if(index>=10){
      return
    }
    return (<div key={index} className={styles.cateitem}>
      <div>{item.name}</div>
      <div>{item.total}</div>
    </div>)
  })

  return (
    <HomeCard 
    title={
      <div className={styles.title}>
        <div><FolderOpenFilled /></div>
        <div>{title}</div>
      </div>
    }
    bodyStyle={{padding:'0px'}}
    bordered={false}
    >
      <div>
        {items}
        {categoryList.length>10? <div className={styles.cateitem}>更多...</div>:''}
      </div>
    </HomeCard>
  )
}

export default HomeCategory;