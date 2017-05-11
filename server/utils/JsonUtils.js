
function JsonUtils() { }
// class JsonUtils { }


JsonUtils.stringToJson = function (data) {
  return JSON.parse(data);
};

JsonUtils.jsonToString = function (data) {
  return JSON.stringify(data);
};

JsonUtils.mapToObj = function (strMap) {
  let obj = Object.create(null);
  for (let [k, v] of strMap) {
    obj[k] = v;
  }
  return obj;
};

JsonUtils.mapToKeyValueArray = function (strMap) {
  let array = new Array();
  for (let [k, v] of strMap) {
    let obj = Object.create(null);
    obj.key = k;
    obj.value = v;
    array.push(obj);
  }
  return array;
};

JsonUtils.mapToJson = function (map) {
  return JSON.stringify(JsonUtils.mapToKeyValueArray(map));
}

JsonUtils.objToMap = function (obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

JsonUtils.jsonToMap = function (jsonStr) {
  return JsonUtils.objToMap(JSON.parse(jsonStr));
}


module.exports = JsonUtils;