// 创建元素的函数
/**
 * 描述
 * @param {string} eleName 标签名
 * @param {array} classAttr 类名数组
 * @param {object} styleObj 样式对象
 * @returns {dom对象}
 */
function creatEle( eleName, classAttr, styleObj ){
    var dom = document.createElement( eleName );

    for(var i = 0; i < classAttr.length; i++ ){
        dom.classList.add( classAttr[i] );
    }

    for(var attr in styleObj ){
        dom.style[attr] = styleObj[attr];
    }

    return dom;
}


// 得到随机整数的函数
/**
 * 描述
 * @param {number} min 小值
 * @param {number} max 大值
 * @returns {number}  从小值到大值之间的随机整数值
 */
function getRandom( min, max ){
    return Math.floor( Math.random() * (max-min+1) + min );
}