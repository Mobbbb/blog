import { scoreMap } from '@/single-page/home/data.js'

export const homeTotalScore = 5
export const movieTotalScore = 10

export const initHomListData = (data) => {
    const allLabelArr = []
    data.forEach((item, index) => {
        let labelArr = [], hoverShowLabel = []

        item.label.forEach(name => {
            if (!allLabelArr.includes(name)) {
                allLabelArr.push(name)
            }
            labelArr.push({ name })
            hoverShowLabel.push(name)
        })

        item.showName = item.name
        if (item.season) {
            item.showName += ' ' + item.season
        }
        item.label = labelArr
        item.hoverShowLabel = hoverShowLabel

        item._index = index
        computedCurrentShowListScore(item, homeTotalScore)
    })
    allLabelArr.sort((a, b) => a.length - b.length)

    return {
        data,
        allLabelArr
    }
}

/**
 * @description 最终分数计算
 */
function computedCurrentShowListScore(item, totalScore) {
    // 待评分
    if (item.waitToScore) {
        item.score = 0
        return
    }

    // 根据label、scoreLabel计算分数
    if (typeof item.score === 'undefined') {
        let initScore = totalScore
        
        initScore = initScore.addScore(- computedScore(item.hoverShowLabel))
        initScore = initScore.addScore(- computedScore(item.scoreLabel))

        item.score = initScore
    }
}

/**
 * @description 分数累加
 */
function computedScore(labelArr) {
    let score = 0

    labelArr.forEach(cell => {
        let itemScore = scoreMap[cell] || 0
        score = (score).addScore(itemScore)
    })

    return score
}

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

export const sortFilterDataByScore = (data) => {
    data.sort((a, b) => b.score - a.score)
}

export const filterDataByText = (text, data) => {
    let regStr = ['', ...text.trim().toLowerCase(), ''].join('.*')
    let reg = new RegExp(regStr)
    let filterData = data.filter(item => {
        if (item.alias) {
            for (let i = 0; i < item.alias.length; i++) {
                if (reg.test(item.alias[i])) {
                    return reg.test(item.alias[i].toLowerCase())
                }
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

export const filterDataByRateScore = (score, data) => {
    let filterData = data.filter(item => {
        return item.score >= score[0] && item.score <= score[1] && !item.waitToScore
    })

    return filterData
}

export const homeRateScoreConfig = {
    max: 5,
    step: 0.1,
    formatTooltip: (value) => {
        if (value < 0) {
            return '未选择'
        } if (value < 1) {
            return `非常差: ${value}`
        } else if (value < 2.5) {
            return `差: ${value}`
        } else if (value < 3) {
            return `较差: ${value}`
        } else if (value < 3.5) {
            return `一般: ${value}`
        } else if (value < 4) {
            return `较好: ${value}`
        } else if (value < 4.5) {
            return `好: ${value}`
        } else {
            return `非常好: ${value}`
        }
    },
}

export const movieRateScoreConfig = {
    max: 10,
    step: 1,
    formatTooltip: (value) => {
        return value
    },
}
