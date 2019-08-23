const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  height: state => state.app.height,
  device: state => state.app.device,
  appCfg: state => state.app.appCfg,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  code: state => state.user.code,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  rhtCds: state => state.user.rhtCds,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs
}
export default getters
