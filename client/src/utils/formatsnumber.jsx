import numeral, { Numeral } from "numeral";

export const FormatsNumber = (num) => {
    return numeral(num).format('0,0')
}