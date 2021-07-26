/**
 * @description 数组或对象的深度克隆
 * @param {*} obj 
 * @returns {*} 返回新的克隆数组或对象
 */
export const deepClone = function(obj) {
    let newObj = Array.isArray(obj) ? [] : {}
 
    if (obj && typeof obj === "object"){
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = (obj && typeof obj[key] ==='object') ? deepClone(obj[key]) : obj[key]
            }
        }
    }
    return newObj
}
