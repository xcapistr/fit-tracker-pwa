export const formatTableData = (data) => {
  const attributes = Object.keys(data.attributes)
  const rows = Object.keys(data.logs).map(date => ([
      date, ...attributes.map(attr => data.logs[date][attr] || null)
  ])) 
  return {columns: ['date', ...attributes], rows}
}

export const formatChartData = (data) => {
  let logsByAttribute = {}
  Object.keys(data.logs).forEach((date) => {
    Object.keys(data.logs[date]).forEach((attr) => {
      const val = [date, data.logs[date][attr]]
      if (logsByAttribute[attr]) {
        logsByAttribute[attr].push(val)
      } else {
        logsByAttribute[attr] = [val]
      }
    })
  })
  const res = Object.keys(data.attributes).map((attr) => ({
    name: attr,
    color: data.attributes[attr].color,
    data: logsByAttribute[attr],
  }))
  return res;
}
