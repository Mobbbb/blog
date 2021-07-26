export const sortDataByDate = (data) => {
    let keysArr = []
    let mapData = {}
    let newData = []
    data.forEach(item => {
        if (typeof mapData[item.years] === 'undefined') {
            mapData[item.years] = [item]
            keysArr.push(item.years)
        } else {
            mapData[item.years].push(item)
        }
    })
    // 年份排序
    keysArr.sort((a, b) => b - a)
    keysArr.forEach(key => {
        // 月份排序
        mapData[key].sort((a, b) => b.month - a.month)
        newData = newData.concat(mapData[key])
    })
    return newData
}