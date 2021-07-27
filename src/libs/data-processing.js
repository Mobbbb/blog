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

export const filterDataByText = (text, data) => {
    let regStr = ['', ...text.trim().toLowerCase(), ''].join('.*')
    let reg = new RegExp(regStr)
    let filterData = data.filter(item => {
        for (let i = 0; i < item.alias.length; i++) {
            if (reg.test(item.alias[i])) {
                return reg.test(item.alias[i].toLowerCase())
            }
        }
        return reg.test(item.name.toLowerCase())
    })

    return filterData
}

export const filterDataByLabel = (labelArr, data) => {
    let filterData = data.filter(item => {
        for (let i = 0; i < labelArr.length; i++) {
            if (!item.hoverShowLabel.includes(labelArr[i])) {
                return false
            } 
        }
        return true
    })

    return filterData
}
