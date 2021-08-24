import axios from '@/libs/api.request'

export const fetchSummaryListData = () => {
    return axios.request({
        url: '/resource/summary-assets/summary-assets.json',
        method: 'get',
    })
}
