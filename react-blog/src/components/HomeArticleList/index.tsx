import React, { useEffect, useState } from 'react';
import {Card, Space,Pagination  } from 'antd';
import type { PaginationProps } from 'antd';
import { UserOutlined, CalendarOutlined, FolderOpenOutlined ,LeftOutlined, RightOutlined} from '@ant-design/icons';
import styles from './index.less';
import HomeCard from '../HomeCard';
import { getArticleList } from '@/services/api/article';

interface HomeArticleListProps{
  data ?: Array<{[key:string]:any}>
}

const HomeArticleList:React.FC<HomeArticleListProps> = () => {
  const [articleList,setArticleList] = useState<Array<{[key:string]:any}>>([]);
  const [page,setPage] = useState<Number>(1);
  useEffect(()=>{
    getArticleList().then((resp)=>{
      setArticleList(resp.data);
    })
  },[page])

  const items = articleList.map((item, index) => {
    return (
      <HomeCard
        key={index}
        title={<>
          <div className={styles.header}>
            <div className={styles.title}>
              <h2>{item.title}</h2>
            </div>
            <div className={styles.info}>
              <div><UserOutlined />{item.avatar}</div>
              <div><CalendarOutlined />{item.date}</div>
              <div><FolderOpenOutlined />{item.category}</div>
            </div>
          </div>
        </>}
        className={styles.card}
        borderBottom
        // hoverable
        bordered = {false}
        >
        {item.content}
      </HomeCard>
    )
  })

  const paginationRender: PaginationProps['itemRender'] = (page, type, originalElement) => {
    if (type === 'prev') {
      return <a><LeftOutlined style={{marginRight:'3px'}}/>上一页</a>;
    }
    if (type === 'next') {
      return <a>下一页<RightOutlined style={{marginLeft:'3px'}}/></a>;
    }
    return originalElement;
  };

  return (<>
    <Space direction="vertical" style={{ width: '100%' }}>
      {items}
    </Space>
    <Pagination total={500} showSizeChanger={false} itemRender={paginationRender} className={styles.pageContainer} onChange={(page)=>{
      setPage(page)
    }}/>
  </>)
}

export default HomeArticleList