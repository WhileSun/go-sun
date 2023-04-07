import { Link, Outlet } from 'umi';
import { AppstoreOutlined, MailOutlined, SettingOutlined, GithubFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from './index.less';
import { useState } from 'react';
import logo from '../assets/img/logo.png';
import bg from '../assets/img/bg.png';
import { LOGO_NAME } from '@/constants';


const items: MenuProps['items'] = [
  {
    label: '首页',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: '指南',
    key: 'app',
    icon: <AppstoreOutlined />,
  },
  {
    label: '配置',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        ant design
      </a>
    ),
    key: 'alipay',
  },
];

export default function Layout() {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <div>
        <div  className={styles.headerFixed}>
          <div className={styles.header}>
            <div className={styles.logo}>
              <img src={logo} alt={LOGO_NAME} />
              {LOGO_NAME} Blog
            </div>
            <div className={styles.right}>
              <div className={styles.menu}>
                <Menu style={{ borderBottom: 'none' }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
              </div>
              <div className={styles.github}>
                <GithubFilled key="GithubFilled" onClick={() => { }} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.body}>
          <Outlet />
        </div>
      </div>
      <div className={styles.bgimg} style={{ background: `url(${bg}) center center / cover no-repeat` }}></div>
    </>
  );
}
