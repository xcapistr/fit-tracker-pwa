import { writable } from 'svelte/store'
import { formatChartData, formatTableData } from './utils'

const createUserData = () => {
  const { subscribe, set, update } = writable(null)

  return {
    subscribe,
    reload: (data) => {
      const tableData = formatTableData(data)
      const chartsData = formatChartData(data)
      set({
        firebase: data,
        tableData,
        chartsData,
      })
    },
  }
}

export const userData = createUserData()

export const displayBackArrow = writable(false)

export const filter = writable({dateFrom: null, dateTo: null})
