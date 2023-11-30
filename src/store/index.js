import {createPinia, defineStore} from 'pinia'

export default createPinia()

const useStore = defineStore('store', {
    state: () => ({
        tableInfo: [],
        problemCategory: [],
        onRefreshDigitAnimation: true,
        index: 0,
        trigger: false,
        current: ''
    })
})
export {
    useStore
}

