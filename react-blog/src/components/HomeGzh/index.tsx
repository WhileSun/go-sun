import React from "react";
import HomeCard from "../HomeCard";
import { WechatOutlined } from "@ant-design/icons";
import styles from './index.less';
import gzh from '../../assets/img/gzh.jpg';
import { Image } from 'antd';

interface HomeGzhProps {
  title?: string;
}

const HomeGzh: React.FC<HomeGzhProps> = (props) => {
  const {
    title = '公众号'
  } = props;

  return (
    <HomeCard
      title={
        <div className={styles.title}>
          <div><WechatOutlined /></div>
          <div>{title}</div>
        </div>
      }
      bordered={false}
    >
      <div className={styles.gzh}>
      <Image
        width='100%'
        src={gzh}
        preview={false}
      />
      </div>
    </HomeCard>
  )
}

export default HomeGzh;