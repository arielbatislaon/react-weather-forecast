import dayjs from 'dayjs-ext'
import axios from 'axios';
import debounce from 'lodash.debounce';

export const getDayLabelOfDate = (date) => {
   return dayjs(date).format('dddd');
}

export const getAPI = (url) => {
    return axios({
        method: 'get',
        url: url,
        headers: {'X-Requested-With':'XMLHttpRequest'}
    })
}

export const debounceKeyInput = (input, delay) => {
    return debounce(input, delay);    
} 
