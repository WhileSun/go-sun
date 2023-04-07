import { Col, Row, Space } from 'antd';
import styles from './index.less';
import HomeArticleList from '@/components/HomeArticleList';
import HomeCategory from '@/components/HomeCategory';
import HomeTag from '@/components/HomeTag';
import HomeGzh from '@/components/HomeGzh';

const HomePage = () => {

  return (
    <div className={styles.container}>
      <Row justify='center' gutter={16}>
        <Col className="gutter-row" xxl={10} xl={11} lg={12} xs={24}>
          <HomeArticleList/>
        </Col>
        <Col className="gutter-row" xxl={4} xl={5} lg={6} xs={0}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <HomeCategory />
            <HomeTag />
            <HomeGzh />
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;