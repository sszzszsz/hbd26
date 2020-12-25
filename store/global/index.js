// 状態管理したい要素に名前をつけて、stateとしてexportする
export const state = () => ({
  pageName: '',
  prevPageName: '',
  browser: '',
  scrollY: 0,
  loadingEnd: false,
  pageTransition: 1,
  prevPageParam: 0,
  ticketsInfo: [],
  clickedTicket: 0,
})

// 状態を変更する処理は mutationとしてexportする
export const mutations = {
  setPageName(state, value) {
    state.pageName = value
  },
  setPrevPageName(state, value) {
    state.prevPageName = value
  },
  setBrowser(state, value) {
    state.browser = value
  },
  setScrollY(state, value) {
    state.scrollY = value
  },
  setLodingEnd(state, value) {
    const event = new CustomEvent('loaded')
    document.body.dispatchEvent(event)
    state.loadingEnd = value
  },
  setPageTransition(state, value) {
    state.pageTransition = value
  },
  setPrevPageParam(state, value) {
    state.prevPageParam = value
  },
  updateTicketsInfo(state, param) {
    state.ticketsInfo.find((el) => {
      if (el.id === param.index) {
        el.month = param.month
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
  writePrevPageName(context, value) {
    context.commit('setPrevPageName', value)
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
  writePageTransition(context, value) {
    context.commit('setPageTransition', value)
  },
  writePrevPageParam(context, value) {
    context.commit('setPrevPageParam', value)
  },
}

export const getters = {
  loaded: (state) => {
    return state.loadingEnd
  },
}
