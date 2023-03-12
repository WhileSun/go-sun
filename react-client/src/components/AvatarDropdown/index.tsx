import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Spin, Dropdown, message } from 'antd';
import type { MenuProps } from 'antd';
import { history, useModel } from '@umijs/max';
import { stringify } from 'querystring';
import styles from './index.less';
import { LOGIN_PATH } from '@/constants';
import { userOutLogin } from '@/services/api/user';
import { deleteToken } from '@/utils/token';
/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  let resp = await userOutLogin();
  if (resp.code == 0) {
    message.success('请您重新登录');
    deleteToken();
    const { pathname } = history.location;
    if (window.location.pathname !== LOGIN_PATH) {
      history.replace({
        pathname: LOGIN_PATH,
        search: stringify({
          redirect: pathname,
        }),
      });
    }
  }else{
    message.error(resp.msg);
  }
};


const AvatarDropdown = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick: MenuProps['onClick'] = useCallback(
    (event) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }

      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.real_name) {
    return loading;
  }

  const menulist: MenuProps['items'] = [
    {
      key: 'center',
      label: "个人中心",
      icon: <UserOutlined />
    },
    {
      key: 'settings',
      label: "个人设置",
      icon: <SettingOutlined />
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: (<><span>退出登录</span></>),
      icon: <LogoutOutlined />
    },
  ]
  return (
    <Dropdown menu={{ items: menulist, onClick: onMenuClick }} placement="bottomLeft">
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.real_name}</span>
      </span>
    </Dropdown>
  );
};

export default AvatarDropdown;