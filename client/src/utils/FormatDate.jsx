import moment from 'moment/min/moment-with-locales'



export const DateFormat = (date) => {
    return moment(date).locale('th').format('LL')
}