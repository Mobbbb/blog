import axios from '@/libs/api.request'

export const fetchMovieListData = () => {
    return axios.request({
        url: '/resource/movie-assets/movie-data.json',
        method: 'get',
    })
}
