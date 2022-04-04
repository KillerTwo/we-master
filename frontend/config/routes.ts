﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎页面',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/system',
    name: '系统管理',
    routes: [
      {
        name: '用户管理',
        path: '/system/user',
        component: './system/UserList',
      },
      {
        name: '角色管理',
        path: '/system/role',
        component: './system/RoleList',
      },
      {
        name: '菜单管理',
        path: '/system/menu',
        component: './system/MenuList',
      },
      {
        name: '部门管理',
        path: '/system/dept',
        component: './system/DeptList',
      },
      {
        name: '岗位管理',
        path: '/system/post',
        component: './system/PostList',
      },
      {
        name: '字典管理',
        path: '/system/dict',
        component: './system/DictList',
      },
      {
        name: '字典数据管理',
        path: '/system/dictData',
        component: './system/DictDataList',
      },
      {
        name: '参数设置',
        path: '/system/config',
        component: './system/ConfigList',
      },
      {
        name: '通知公告',
        path: '/system/notice',
        component: './system/NoticeList',
      },
      {
        name: '日志管理',
        path: '/system/log',
        routes: [
          {
            name: '操作日志',
            path: '/system/log/operlog',
            component: './system/LoggingList/OperateLogList',
          },
          {
            name: '登录日志',
            path: '/system/log/logininfor',
            component: './system/LoggingList/LoginLogList',
          },
        ]
      },
      {
        name: '任务调度',
        path: '/system/sysJob',
        component: './system/Jobs',
      },
      {
        name: '调度任务日志',
        path: '/system/sysJobLog',
        component: './system/JobLogs',
      },
    ]
  },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
  /*{
    path: '/system',
    name: '系统管理',
    routes: [
      {
        path: '/system/user',
        name: '用户管理',
        component: './TableList',
      }
    ],
  },*/
];