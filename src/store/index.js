import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'aaa',
    nextId: 5,
    viewVal: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem(state, id) {
      const i = state.list.findIndex((x) => x.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeStatus(state, param) {
      const i = state.list.findIndex((x) => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    cleanDone(state) {
      state.list = state.list.filter((x) => x.done === false)
    },
    changeViewVal(state, val) {
      state.viewVal = val
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter((x) => x.done === false).length
    },
    infoList(state) {
      if (state.viewVal === 'all') {
        return state.list
      }
      if (state.viewVal === 'undone') {
        return state.list.filter((x) => !x.done)
      }
      if (state.viewVal === 'done') {
        return state.list.filter((x) => x.done)
      }
      // return state.list
    }
  }
})
