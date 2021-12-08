import { descendingOrder, ascendingOrder } from './util'
import { burstScore, minusScore, terminationConfig, tvPlayConfig, unratedConfig, textTypeMap, summaryTypeMap } from '@/config/constant'

export const homeTotalScore = 5
export const movieTotalScore = 10

export const initHomeListData = (scoreMap, data) => {
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
        computedCurrentShowListScore(item, homeTotalScore, scoreMap)
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
function computedCurrentShowListScore(item, totalScore, scoreMap) {
    // 待评分
    if (item.waitToScore) {
        item.score = 0
        return
    }

    // 根据label、scoreLabel计算分数
    if (typeof item.score === 'undefined') {
        let initScore = totalScore
        
        initScore = initScore.addScore(computedScore(item.hoverShowLabel, scoreMap))
        initScore = initScore.addScore(computedScore(item.scoreLabel, scoreMap))
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
function computedScore(labelArr, scoreMap) {
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
        let nameTestStatus = reg.test(item.name.toLowerCase()) // 输入abc，匹配abc、abcdefg...
        || text.trim().toLowerCase().indexOf(item.name.toLowerCase()) > -1 // 输入框abc，匹配abc、ab、bc、a、b、c
        
        if (item.alias) {
            for (let i = 0; i < item.alias.length; i++) {
                return reg.test(item.alias[i].toLowerCase())
                || text.trim().toLowerCase().indexOf(item.alias[i].toLowerCase()) > -1
                || nameTestStatus
            }
        }
        
        return nameTestStatus
    })

    return filterData
}

export const filterDataByLabel = (labelArr, data) => {
    // 取子集
    let filterData = data.filter(item => {
        for (let i = 0; i < labelArr.length; i++) {
            if (!item.hoverShowLabel.includes(labelArr[i])) {
                return false
            } 
        }
        return true
    })

    /* 取交集不为空
    const filterMap = {}, filterData = []
    for (let i = 0; i < labelArr.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[j].hoverShowLabel.includes(labelArr[i])) {
                filterMap[data[j]._index] = data[j]
            }
        }
    }
    Object.keys(filterMap).forEach(key => {
        filterData.push(filterMap[key])
    })
    */

    return filterData
}

export const filterDataByRateScore = (score, data) => {
    let filterData = data.filter(item => {
        return item.score >= score[0] && item.score <= score[1] && !item.waitToScore
    })

    return filterData
}

export const filterDataByHideScore = (scoreArr, data) => {
    if (!scoreArr.length) return data
    
    let burstScoreData = [], minusScoreData = []
    // 筛选破满分
    if (scoreArr.includes(burstScore.value)) {
        burstScoreData = data.filter(item => {
            return item.realScore > homeTotalScore
        })
    }
    // 筛选破负分
    if (scoreArr.includes(minusScore.value)) {
        minusScoreData = data.filter(item => {
            return item.realScore < 0
        })
    }

    return [...burstScoreData, ...minusScoreData]
}

export const filterDataByOthersCheck = (checkArr, data) => {
    let filterData = data
    // 过滤观看终止项
    if (checkArr.includes(terminationConfig.value)) {
        filterData = excludeTerminationItem(data)
    }
    // 过滤未评分数据
    if (checkArr.includes(unratedConfig.value)) {
        filterData = excludeUnratedItem(filterData)
    }
    // 筛选电视剧
    if (checkArr.includes(tvPlayConfig.value)) {
        filterData = includeTvPlayItem(filterData)
    }

    return filterData
}

/**
 * @description 过滤电视剧数据
 * @param {*} data 
 * @returns 
 */
export const includeTvPlayItem = (data) => {
    return data.filter(item => {
        return item.type === 'tv'
    })
}

/**
 * @description 过滤未评分数据
 * @param {*} data 
 * @returns 
 */
export const excludeUnratedItem = (data) => {
    return data.filter(item => {
        return !item.waitToScore
    })
}

/**
 * @description 过滤观看终止项
 * @param {*} data 
 * @returns 1、已看完 2、观看中的待评分项 3、观看中的已评分项 4、已看完的待评分项
 */
export const excludeTerminationItem = (data) => {
    return data.filter(item => {
        return item.endProgress === item.episodes || item.waitToScore || item.watching
    })
}

export const initSummaryListData = (data) => {
    data.forEach((item, index) => {
        item.ellipsisContent = ''
        item._index = index
        item.timestamp = Date.parse(new Date(item.date))
        for (let i = 0; i < item.content.length; i++) {
            if (textTypeMap.includes(item.content[i].type)) {
                let itemValue = item.content[i].value
                if (Array.isArray(itemValue)) itemValue = itemValue.join('')
                
                item.ellipsisContent = itemValue.substring(0, 200)
                break
            }
        }
    })
    
    data.sort(descendingOrder('timestamp'))
}

export const formatSummaryContent = (content, splitLanguageList) => {
    const formatDataList = []
    if (content.type === summaryTypeMap.TEXT) { // 文本
        content.value.forEach(lineContent => { // 将单行文本处理为数组——以文字片段、代码片段分割
            let lineList = []
            splitLanguageList.forEach(splitLanguageItem => {
                if (lineContent.indexOf(splitLanguageItem) > -1) {
                    lineList = getSplitListByLanguage(lineContent, lineList, splitLanguageItem)
                }
            })

            if (lineList.length) { // 存在代码片段
                formatDataList.push({
                    value: lineList,
                    type: summaryTypeMap.MIXED,
                })
            } else {
                formatDataList.push({
                    value: lineContent,
                    type: summaryTypeMap.TEXT,
                })
            }
        })
    } else {
        formatDataList.push(content)
    }

    return formatDataList
}

/**
 * @description 处理单行文字 或 二次处理单行文字中的片段
 * @param {*} str 处理单行文字时的对象
 * @param {*} list 二次处理单行文字中的片段的对象
 * @param {*} splitKey 
 * @returns 
 */
export const getSplitListByLanguage = (str, list = [], splitKey) => {
    let lineList = [], mapList = []
    
    if (!list.length) { // 首次对字符串进行切割
        mapList = [{
            value: str,
            type: summaryTypeMap.TEXT,
        }]
    } else {
        mapList = list
    }

    mapList.forEach(item => {
        if (item.value.indexOf(splitKey) > -1) {
            const language = splitKey.slice(1, splitKey.length - 1)
            let reg = new RegExp(eval('/{' + language + '}.+?{\\/' + language + '}/g')) // /\{js}.+?\{\/js}/g
            let splitLineOfContent = item.value.split(reg)
            let splitLineOfCode = item.value.match(reg)
            
            splitLineOfContent.forEach((splitText, index) => {
                if (index) { // 拼接代码段
                    const splitCode = splitLineOfCode[index - 1]
                    lineList.push({
                        value: splitCode.slice(splitKey.length, splitCode.length - splitKey.length - 1),
                        type: summaryTypeMap.CODE,
                        language,
                    })
                }
                lineList.push({ // 拼接文字段
                    value: splitText,
                    type: summaryTypeMap.TEXT,
                })
            })
        } else {
            lineList.push(item)
        }
    })

    return lineList
}
