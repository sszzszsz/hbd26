// 状態管理したい要素に名前をつけて、stateとしてexportする
export const state = () => ({
  pageName: '',
  browser: '',
  scrollY: 0,
  loadingEnd: false,
  gNaviOpen: false,
  pageTransition: 1,
  scrollFlag: true,
  pageParam: 0,
  ticketsInfo: [],
  clickedTicket: 0,
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  setPageName(state, value) {
    state.pageName = value
  },
  setBrowser(state, value) {
    state.browser = value
  },
  setScrollY(state, value) {
    state.scrollY = value
  },
  setLodingEnd(state, value) {
    state.loadingEnd = value
  },
  setGNaviOpen(state, value) {
    state.gNaviOpen = value
  },
  setPageTransition(state, value) {
    state.pageTransition = value
  },
  setScrollFlag(state, value) {
    state.scrollFlag = value
  },
  setPageParam(state, value) {
    state.pageParam = value
  },
  updateTicketsInfo(state, param) {
    state.ticketsInfo.find((el) => {
      console.log(el)
      if (el.id === param.index) {
        el.date = param.date
        el.use = param.flag
      }
    })
    // localStorageの更新を行う
    localStorage.setItem('ticketsInfo', JSON.stringify(state.ticketsInfo))
  },
  setTicketsInfo(state, value) {
    localStorage.setItem('ticketsInfo', JSON.stringify(value))
    state.ticketsInfo = value
  },
  setClickTicket(state, value) {
    state.clickedTicket = value
  },
}

// 実際に各コンポーネントから呼び出す処理をactionとしてexportする
export const actions = {
  writePageName(context, value) {
    // コミットすることで状態変更が反映される
    context.commit('setPageName', value)
  },
  writeBrowser(context, value) {
    context.commit('setBrowser', value)
  },
  writeScrollY(context, value) {
    context.commit('setScrollY', value)
  },
  writeLodingEnd(context, value) {
    context.commit('setLodingEnd', value)
  },
  writeGNaviOpen(context, value) {
    context.commit('setGNaviOpen', value)
  },
  writePageTransition(context, value) {
    context.commit('setPageTransition', value)
  },
  writeScrollFlag(context, value) {
    context.commit('setScrollFlag', value)
  },
  writePageParam(context, value) {
    context.commit('setPageParam', value)
  },
}
