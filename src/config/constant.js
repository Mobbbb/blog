export const dateType = {
    label: '按日期降序',
    value: 'date',
}

export const scoreType = {
    label: '按评分降序',
    value: 'score',
}

export const sortListConfig = [dateType, scoreType]

export const January = {
    name: '一月',
    value: '1',
}

export const months = [
    January,
    {
        name: '四月',
        value: '4',
    },
    {
        name: '七月',
        value: '7',
    },
    {
        name: '十月',
        value: '10',
    },
]

export const homeRateScoreConfig = {
    max: 5,
    step: 0.1,
    formatTooltip: (value, noValue = false) => {
        let label = ''
        if (value < 0) {
            return '未选择'
        } if (value < 1) {
            label = '非常差'
        } else if (value < 2.5) {
            label = '差'
        } else if (value < 3) {
            label = '较差'
        } else if (value < 3.5) {
            label = '一般'
        } else if (value < 4) {
            label = '较好'
        } else if (value < 4.5) {
            label = '好'
        } else {
            label = '非常好'
        }

        return noValue ? label : `${label}: ${value}`
    },
}

export const movieRateScoreConfig = {
    max: 10,
    step: 1,
    formatTooltip: (value) => {
        return value
    },
}

export const burstScore = {
    label: '破满分',
    value: '0',
}

export const minusScore = {
    label: '破负分',
    value: '1',
}

export const hideScoreConfig = [burstScore, minusScore]

// 其他筛选项
export const terminationConfig = {
    label: '排除观看终止项',
    value: '0',
}

export const unratedConfig = {
    label: '排除未评分项',
    value: '1',
}

export const tvPlayConfig = {
    label: '电视剧',
    value: '2',
}

export const extraChapterConfig = {
    label: '番外',
    value: '3',
}

export const defaultHideConfig = {
    label: '隐藏次要项',
    value: '4',
}

export const movieConfig = {
    label: '电影',
    value: '5',
}

export const animationConfig = {
    label: '动漫',
    value: '6',
}

export const othersCheckConfig = [terminationConfig, extraChapterConfig]

export const mediaTypeConfig = [tvPlayConfig, extraChapterConfig, movieConfig, animationConfig]

export const summaryTypeMap = {
    TEXT: 'text',
    TITLE: 'title',
    CODE: 'code',
    MIXED: 'mixed',
    IMG: 'img',
    LINK: 'link',
}

export const prismMap = {
    javascript: ['{javascript}', '{js}'],
    markup: ['{html}'],
    bash: ['{shell}'],
}

export const textTypeMap = [summaryTypeMap.TEXT, summaryTypeMap.CODE]
