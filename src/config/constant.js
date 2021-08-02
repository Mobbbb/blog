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

export const burstScore = {
    label: '破满分',
    value: '0',
}

export const minusScore = {
    label: '破负分',
    value: '1',
}

export const hideScoreConfig = [burstScore, minusScore]
