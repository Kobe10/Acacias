const steps = [
  {
    element: '.hamburger-container',
    popover: {
      title: '目录开关',
      description: '打开或折叠左侧导航目录',
      position: 'bottom'
    }
  },
  {
    element: '.tags-view-container',
    popover: {
      title: '浏览页面',
      description: '打开过的历史界面，右键可以批量关闭',
      position: 'bottom'
    },
    padding: 0
  },
  {
    element: '.screenfull',
    popover: {
      title: '全屏展示',
      description: '将当前视图全屏展示',
      position: 'left'
    }
  },
  {
    element: 'international',
    popover: {
      title: '字体调整',
      description: '调整系统的字体大小',
      position: 'left'
    }
  },
  {
    element: '.theme-switch',
    popover: {
      title: '系统换肤',
      description: '调整系统肤色',
      position: 'left',
      offset: 20
    }
  },

  {
    element: '.avatar-container',
    popover: {
      title: '用户信息',
      description: '点击可进行更多操作',
      position: 'left',
      offset: 20
    },
    padding: 0
  }
  // ,
  // {
  //   element: '.app-main',
  //   popover: {
  //     title: '操作区域',
  //     description: '点击可进行更多操作',
  //     position: 'top',
  //     offset: 100
  //   },
  //   padding: 0
  // },
]

export default steps
