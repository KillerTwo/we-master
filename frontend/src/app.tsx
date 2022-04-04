import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';

import { history, Link} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
// import { fetchMenuData } from './services/system/routes';
import type { RequestConfig } from "@@/plugin-request/request";
import type { RequestOptionsInit } from 'umi-request'
import errorHandler from "@/utils/errorHandler";
import {fetchMenuData} from "@/services/system/routes";
// import LoadingComponent from "@ant-design/pro-layout/es/PageLoading";
import {getUserInfo} from "@/services/system/login";
// import {fetchMenuData} from "@/services/system/routes";

import {SYSTEM} from "@/services/system/typings";
// import iconMapping from "@/utils/iconMap";
// import React from "react";
import {handleIconAndComponent} from "@/utils/routes";
// import LoadingComponent from "@ant-design/pro-layout/es/PageLoading";
import { getToken } from "@/utils/auth";


const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  if(url.indexOf('/login/') !== -1) {
    return {
      url: `${url}`,
      options: { ...options, interceptors: true },
    };
  } else {
    const token = getToken();
    const authHeader = { Authorization: `Bearer ${token}` };
    return {
      url: `${url}`,
      options: { ...options, interceptors: true, headers: authHeader },
    };
  }
};

export const request: RequestConfig = {
  errorHandler,
  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [authHeaderInterceptor],
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: any;
  loading?: boolean;
  fetchUserInfo?: () => Promise<any | undefined>;
  fetchMenuInfo?: () => Promise<SYSTEM.Router[] | undefined>;
  customMenuData?: SYSTEM.Router[];
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await getUserInfo();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const fetchMenuInfo = async () => {
    const menuData = await fetchMenuData();
    console.log("fetchMenuDatas.menuData: ", menuData);
    return menuData.data;
  }

  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    const customMenuData = await fetchMenuInfo();
    return {
      fetchUserInfo,
      fetchMenuInfo,
      currentUser,
      customMenuData,
      settings: defaultSettings,
    };
  }

  // const customMenuData = await fetchMenuInfo();
  return {
    fetchUserInfo,
    fetchMenuInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    /*menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        username: initialState?.currentUser?.user.userName,
      },
      request: async (params, defaultMenuData) => {
        // console.log(params, defaultMenuData)
        console.log('customMenuData: ', initialState?.customMenuData)
        const menuData = initialState?.customMenuData;
        const menuDataIcon = menuData?.map(ele => {
          if (ele.iconName) {
            const iconNode: React.ReactNode = iconMapping[ele.iconName];
            if (iconNode) {
              ele.icon = iconNode;
            }
          }
          if (ele.name === '系统管理') {
            console.log('ele?.routes?[0]: ', ele?.routes||[][0]);
            const component = (ele?.routes||[])[0].component;
            // console.log('component:', component)
            (ele?.routes||[])[0].component = dynamic({ loader: () => import(component||''), loading: LoadingComponent})
          }

          // ele?.routes||[][0].component = dynamic({ loader: () => import(ele?.routes||[][0].component||''), loading: LoadingComponent})
          // ele.icon = <BorderLeftOutlined />
          return ele;
        })
        // initialState.currentUser 中包含了所有用户信息
        // const menuData = await fetchMenuData();
        const data = [...defaultMenuData, ...menuDataIcon||[]]
        console.log('menu data: ', data)
        console.log('iconMap: ', iconMap)
        console.log('iconMap: ', iconMap['BorderLeftOutlined'])
        return data;
      },
    },*/
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuDataRender: (menuItems) => {
      console.log("menuItems", menuItems);
      const resMenuData = initialState?.customMenuData||[];

      const menuDataIcon = handleIconAndComponent(resMenuData);

      /*const menuDataIcon = resMenuData?.map(ele => {
        if (ele.iconName) {
          const iconNode: React.ReactNode = iconMapping[ele.iconName];
          if (iconNode) {
            ele.icon = iconNode;
          }
        }
        if (ele.name === '系统管理') {
          console.log('ele?.routes?[0]: ', ele?.routes||[][0]);
          const component = (ele?.routes||[])[0].component;
          // console.log('component:', component)
          // (ele?.routes||[])[0].component = dynamic({ loader: () => import(component||''), loading: LoadingComponent})
          (ele?.routes||[])[0].component = dynamic({
            loader: async function() {
              const { default: HugeA } = await import(component||'');
              return HugeA;
            },
          });
        }

        // ele?.routes||[][0].component = dynamic({ loader: () => import(ele?.routes||[][0].component||''), loading: LoadingComponent})
        // ele.icon = <BorderLeftOutlined />
        return ele;
      })*/

      // const data = [...menuItems, ...menuDataIcon||[]]
      const data = [...menuDataIcon||[]]
      // const menuData = await fetchMenuData();
      // return [menuItems, initialState?.customMenuData];
      return data;
    },
    menuHeaderRender: undefined,
    menuItemRender: (menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl || !menuItemProps.path) {
        return defaultDom;
      }
      // 支持二级菜单显示icon
      return (
        <Link to={menuItemProps.path}>
          {menuItemProps.pro_layout_parentKeys
            && menuItemProps.pro_layout_parentKeys.length > 0 &&
            menuItemProps.icon}{defaultDom}
        </Link>
      );
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
