import React, { useEffect, useState } from "react";
import HomeCard from "../HomeCard";
import { TagsFilled } from "@ant-design/icons";
import styles from './index.less';
import { Space, Tag } from 'antd';
import { getTagList } from "@/services/api/article";

interface HomeTagProps {
  title?: string;
}

const HomeTag: React.FC<HomeTagProps> = (props) => {
  const [tagList,setTagList] = useState<Array<{[key:string]:any}>>([])
  const {
    title = '热门标签'
  } = props;

  useEffect(()=>{
    getTagList().then((resp)=>{
      setTagList(resp.data)
    })
  },[])

  const colors = ['#F8B26A', '#67CC86', '#E15B64', '#F8B26A', '#f50', '#2db7f5', '#87d068', '#108ee9'];
  const len = colors.length;

  const colorFunc = () => {
    let index = Math.floor(Math.random() * len);
    return colors[index]
  }

  const items = tagList.map((item, index) => {
    let color = colorFunc();
    return (<Tag color={color} className={styles.tag} key={index}>{item.name}</Tag>)
  })

  return (
    <HomeCard
      title={
        <div className={styles.title}>
          <div><TagsFilled /></div>
          <div>{title}</div>
        </div>
      }
      bordered={false}
    >
      <div>
        <Space size={[0, 8]} wrap className={styles.tags}>
          {items}
        </Space>
      </div>
    </HomeCard>
  )
}

export default HomeTag;