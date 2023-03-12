import { ProLayout, PageContainer, ProCard, ProBreadcrumb } from '@ant-design/pro-components';
import { GithubFilled } from '@ant-design/icons';
import { useOutlet, useLocation } from "@umijs/max";
import { useState } from 'react';
import { history } from '@umijs/max';
import routes from '../../config/routes';
import layout from '../../config/layout';
import AvatarDropdown from '@/components/AvatarDropdown';
import { LOGIN_PATH } from '@/constants';

const LayoutPage = () => {
  const location = useLocation();
  const outlet = useOutlet()
  const [pathname, setPathname] = useState<string>('');

  if (location.pathname === LOGIN_PATH) {
    return (<>{outlet}</>)
  }
  return (<>
    <ProLayout
      bgLayoutImgList={[
        {
          src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100wh',
          height: '100vh',
        },
      ]}
      token={
        {
          pageContainer: {
            paddingInlinePageContainerContent: 20
          },
          header: {
            colorBgHeader: '#292f33',
            colorHeaderTitle: '#fff',
            colorTextMenu: '#dfdfdf',
            colorTextMenuSecondary: '#dfdfdf',
            colorTextMenuSelected: '#fff',
            colorBgMenuItemSelected: '#22272b',
            colorTextMenuActive: 'rgba(255,255,255,0.85)',
            colorTextRightActionsItem: '#dfdfdf',
            heightLayoutHeader: 48,
          },
          colorTextAppListIconHover: '#fff',
          colorTextAppListIcon: '#dfdfdf',
          sider: {
            colorMenuBackground: '#fff',
            colorMenuItemDivider: '#dfdfdf',
            colorBgMenuItemHover: '#f6f6f6',
            colorTextMenu: '#595959',
            colorTextMenuSelected: '#242424',
            colorTextMenuActive: '#242424',
            colorBgMenuItemCollapsedHover: '#242424',
          },
        }
      }
      {...layout}
      layout={"mix"}
      route={routes}
      location={{
        pathname,
      }}
      onPageChange={(location) => { //切换页面
        history.push(location?.pathname!);
      }}
      // avatarProps={}
      actionsRender={(props) => {
        return [
          <GithubFilled key="GithubFilled" />,
          <AvatarDropdown />,
        ];
      }}
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined;
        return (
          <div
            style={{
              textAlign: 'center',
              paddingBlockStart: 12,
            }}
          >
            <div>© 2021 Made with love</div>
            <div>by Ant Design</div>
          </div>
        );
      }}
      // headerRender={(props) => {

      //   // console.log('headerContentRender');
      // }}
      // headerContentRender={() => {
      //   return <ProBreadcrumb />;
      // }}
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            if (!item.isUrl) {
              setPathname(item.path || '/');
            } else {
              window.open(item.path);
            }
          }}
        >
          {dom}
        </a>
      )}
    >
      <PageContainer
        header={{ title: '', breadcrumb: {} }}
      >
        <ProCard
          style={{
            minHeight: 600,
          }}
        >
          {outlet}
        </ProCard>
      </PageContainer>
    </ProLayout>
  </ >)
};

export default LayoutPage;