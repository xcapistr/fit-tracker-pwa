import { writable } from 'svelte/store'
import { formatChartData, formatTableData } from './utils'

export const user = writable(null)

const createUserData = () => {
  const { subscribe, set, update } = writable(null)

  return {
    subscribe,
    reload: (data) => {
      console.log('reload')
      const tableData = formatTableData(data)
      const chartsData = formatChartData(data)
      console.log('formatted data:', tableData, chartsData)
      set({
        firebase: data,
        tableData,
        chartsData,
      })
    },
  }
}

export const userData = createUserData()
