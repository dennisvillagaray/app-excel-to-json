const xlsx = require('xlsx')

const excelJSON = (file) => {
  const excel = xlsx.readFile(file)
  let nameHoja = excel.SheetNames
  let datos = xlsx.utils.sheet_to_json(excel.Sheets[nameHoja[0]])

  console.log(datos)
}

const file = '//home//dennis//Documentos//PERSONAL/DENAROR_projects//app-excel-to-json//prueba.xlsx'

excelJSON(file)
