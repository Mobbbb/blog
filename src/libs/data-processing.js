import { scoreMap } from '@/single-page/home/data.js'
import { descendingOrder, ascendingOrder } from './util'

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
    allLabelArr.sort(ascendingOrder('length'))

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
        
        initScore = initScore.addScore(computedScore(item.hoverShowLabel))
        initScore = initScore.addScore(computedScore(item.scoreLabel))
        item.realScore = initScore // 保存真实分数

        // 展示格式化后的分数
        initScore = initScore < 0 ? 0 : initScore
        initScore = initScore > 5 ? 5 : initScore
        item.score = initScore < 0 ? 0 : initScore
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

export const sortDataByDateHandle = (data) => {
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
    keysArr.sort(descendingOrder())
    keysArr.forEach(key => {
        // 月份排序
        mapData[key].sort(descendingOrder('month'))
        newData = newData.concat(mapData[key])
    })
    return newData
}

export const sortDataByScoreHandle = (data) => {
    data.sort(descendingOrder('score'))
    return data
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
