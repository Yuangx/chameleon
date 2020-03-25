// import * as t from "@babel/types";
const t = require('@babel/types');
const { SyncHook } = require('tapable');
const {
  conditionMap
} = require('../common/cml-map.js');
const utils = require('../common/utils');


let parseCondition = new SyncHook(['args'])

parseCondition.tap('web-weex', (args) => {
  let { node, type, options: {lang}} = args;
  if (lang === 'cml' && (type === 'web' || type === 'weex')) {
    let currentCondition = node.name.name;
    let targetCondition = conditionMap[currentCondition] && conditionMap[currentCondition][type];
    if (targetCondition && currentCondition !== targetCondition) {
      node.name.name = targetCondition;
      node.value && t.isStringLiteral(node.value) && (node.value.value = utils.trimCurly(node.value.value));
    }
  }
})
parseCondition.tap('wx-alipay-qq-tt', (args) => {
  let { node, type, options: {lang}} = args;
  let miniAppType = ['wx', 'alipay', 'qq', 'tt'];
  if (lang === 'cml' && miniAppType.includes(type)) {
    let currentCondition = node.name.name;
    let targetCondition = conditionMap[currentCondition] && conditionMap[currentCondition][type];
    if (targetCondition && currentCondition !== targetCondition) {
      node.name.name = targetCondition;
    }
  }
});
parseCondition.tap('baidu', (args) => {
  let { node, type, options: {lang}} = args;
  if (lang === 'cml' && type === 'baidu') {
    let currentCondition = node.name.name;
    let targetCondition = conditionMap[currentCondition] && conditionMap[currentCondition][type];
    if (targetCondition && currentCondition !== targetCondition) {
      node.name.name = targetCondition;
      // 百度端比较特殊是 s-if="xxx"
      node.value && t.isStringLiteral(node.value) && (node.value.value = utils.trimCurly(node.value.value));
    }
  }
})


module.exports.parseCondition = parseCondition;
