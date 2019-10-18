/**
 * @desc: 计算相隔时间
 * 
 * @param: 参数 | 属性说明 | 参考值
 * @param: arr_time | 到达时间 | 14：10
 * @param: dep_time | 出发时间 | 12: 00
 * 
 * @return: 相隔时间的字符串
 */
export function computeTime(arr_time, dep_time) {
    if (!arr_time || !dep_time) return;

    const depTime = dep_time.split(":");
    const arrTime = arr_time.split(":");

    // 到达时间为第二天
    if (arrTime[0] < depTime[0]) {
        arrTime[0] += 24;
    }

    // 出发分钟时间
    const start = depTime[0] * 60 + depTime[1] * 1;

    // 到达分钟时间
    const end = arrTime[0] * 60 + arrTime[1] * 1;

    // 相隔分钟时间
    const dis = end - start;

    // 换算成小时和分钟
    const hour = Math.floor(dis / 60);

    const min = dis % 60;

    return `${hour}小时${min}分钟`;
}