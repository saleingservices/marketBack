function DateFa8(_date){
    return new Date(_date).toLocaleDateString('fa-IR-u-nu-latn'
                      ,{
                      year:"numeric",
                      month:"2-digit" ,
                      day: "2-digit" ,   
                      }
                      ).replaceAll('/','')
  }
  
  
  
  async function MakeVerify(_len = 4) {
    if (_len > 7 || _len < 4)
      _len = 4
    let verifyCode = getRandomIntInclusive(Math.pow(10, _len - 1), Math.pow(10, _len) - 1)
    return verifyCode
  }
  
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    //The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min)
  }
  
  
  // یک جیسان فلت را به یک جیسان که تمام روابطش مشخص است تبدیل میکند
  function FlatToNested(_json) {
    _json = JSON.parse(JSON.stringify(_json))
    let jsonTree = []
    _json.forEach(item => {
      if (!item.parentId)
        return jsonTree.push(item)
      let parentIndex = _json.findIndex(el => el.id === item.parentId)
      if (!_json[parentIndex].children)
        return _json[parentIndex].children = [item]
      else
        _json[parentIndex].children.push(item)
    })
    return jsonTree
  }
  
  
  async function PersianDate() {
    let localToday = new Date().toLocaleDateString('fa-IR-u-nu-latn')
    let date = localToday.split("/")
    if (date[1].toString().length < 2)
      date[1] = '0' + date[1]
    if (date[2].toString().length < 2)
      date[2] = '0' + date[2]
    date = date.toString()
    date = date.replace(/,/g, "")
    return date
  }
  
  
  async function CreateUUID() { // RFC 4122-ish
    return Array.from(Array(32))
      .map((e, i) => {
        let someRandomValue = i === 12 ? 4 : (+new Date() + Math.random() * 16) % 16 | 0;
        return `${~[8, 12, 16, 20].indexOf(i) ? "-" : ""}${(i === 16 ? someRandomValue & 0x3 | 0x8 : someRandomValue).toString(16)}`;
      }).join("");
  }
  
  async function PriceValidation(_price) {
    const reg = new RegExp('^[1-9][0-9]*$')
    if (reg.test(_price))
      return true
    return false
  }


  function persianNumberFix(_text){
    return _text.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
  }



  

  const funcs = {
    MakeVerify,
    FlatToNested,
    PersianDate,
    CreateUUID,
    PriceValidation,
    DateFa8,
    persianNumberFix
  }
  module.exports = funcs
  
  