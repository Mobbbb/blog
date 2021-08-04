import axios from '@/libs/api.request'

export const fetchHomeListData = () => {
    return axios.request({
        url: '/resource/home-assets/home-data.json',
        method: 'get',
    })
}

export const fetchScoreMap = () => {
    return axios.request({
        url: '/resource/home-assets/score-map.json',
        method: 'get',
    })
}
