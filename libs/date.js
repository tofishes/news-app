// 格式化日期全局类
const chineseWeek = ['日', '一', '二', '三', '四', '五', '六'];
const dateMethods = ['setFullYear', 'setMonth', 'setDate', 'setHours',
  'setMinutes', 'setSeconds', 'setMilliseconds'];
const second = 1000; // ms
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const month = 30 * day;
const year = 12 * month;

function isDate(o) {
  return Object.prototype.toString.call(o) === '[object Date]';
}

/**
 * 解析字符串为日期对象
 * @param  {[String]} date 字符串可以是任何非数字字符间隔的 年月日 时分秒
 *                         该字符串应去除首尾空格及其他字符
 * @return {[Date]} 日期对象
 */
function parse(dateString) {
  // 是一个Date对象
  if (isDate(dateString)) {
    return dateString;
  }
  // 毫秒数
  if (!Number.isNaN(dateString)) {
    return new Date(+dateString); // ie8不支持 '12313123123' 字符串形式的毫秒数
  }

  // 以下是字符串
  const metas = dateString.split(/\D+/);
  const monthIndex = 1; // 索引到setMonth方法，需要 减1
  const date = new Date();
  const l = metas.length;

  if (metas[monthIndex]) {
    metas[monthIndex] -= 1;
  }
  // 单独执行setMonth方法有误，因为setMonth方法不设第二个参数会影响月份正确性
  // 设置年月日
  date.setFullYear(...metas);
  // 设置时分秒
  let i = 3; // 从小时开始，年月日可以通过setFullYear设置
  for (; i < l; i += 1) {
    const meta = metas[i];
    date[dateMethods[i]](meta);
  }

  return date;
}
/**
 * 格式化日期类
 * @param  {[Date | String]} date 要格式化的日期对象或日期字符串
 * @param  {[type]} formatString 格式化信息，支持 y(年), M（月）, d（日）, w（周), W(中文周), h（时）, m（分）, s（秒）, S（毫秒）
 * @return {[type]}        [description]
 */
function format(dateSource, formatString = 'yyyy-MM-dd hh:mm:ss') {
  if (!dateSource) {
    return dateSource;
  }

  const date = parse(dateSource);
  const week = date.getDay();
  const o = {
    'M+': date.getMonth() + 1,
    // month
    'W+': chineseWeek[week],
    'w+': week,
    'd+': date.getDate(),
    // day
    'h+': date.getHours(),
    // hour
    'm+': date.getMinutes(),
    // minute
    's+': date.getSeconds(),
    // second
    // quarter
    'q+': Math.floor((date.getMonth() + 3) / 3),
    // 季度
    'S': date.getMilliseconds() // millisecond
  };

  let mode = formatString;
  if (/(y+)/.test(format)) {
    mode = mode.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }

  Object.keys(o).map(k => {
    if (new RegExp(`(${k})`).test(mode)) {
      mode = mode.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
    return k;
  });

  return mode;
}

// 只有一个参数，表示与当前时间对比
function diff(date, dateOther) {
  let base = date;
  let differ = dateOther;

  if (!differ) {
    differ = base;
    base = new Date();
  }

  base = parse(base);
  differ = parse(differ);

  return date - differ;
}
// 只有一个参数，表示与当前时间对比
// 判断date是否大于dateOther
function gt(date, dateOther) {
  return diff(date, dateOther) > 0;
}
// 只有一个参数，表示与当前时间对比
// 判断date是否小于dateOther
function lt(date, dateOther) {
  return diff(date, dateOther) < 0;
}

/**
 * 中国口语化的时间输出，规则：
 * 小于1分钟，为{n}秒钟前
 * 小于1小时，为{n}分钟前
 * 小于24小时，为{n}小时前
 * 小于30天，为{n}天前
 * 小于12个月，为{n}个月前
 * 大于等于12个月，为{n}年{m}个月前
 * @param  {[type]} dateSource 时间
 */
const toInt = Number.parseInt;
function spoken(dateSource, now = Date.now()) {
  const surplus = diff(now, dateSource);

  if (surplus < minute) {
    return `${toInt(surplus / second)}秒钟前`;
  }

  if (surplus < hour) {
    return `${toInt(surplus / minute)}分钟前`;
  }

  if (surplus < day) {
    return `${toInt(surplus / hour)}小时前`;
  }

  if (surplus < month) {
    return `${toInt(surplus / day)}天前`;
  }

  if (surplus < year) {
    return `${toInt(surplus / month)}个月前`;
  }

  return `${toInt(surplus / year)}年${toInt((surplus % year) / month)}个月前`;
}

module.exports = {
  isDate, diff, gt, lt, format, parse, spoken
};
