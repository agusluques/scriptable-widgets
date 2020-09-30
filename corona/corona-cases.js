// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: user-md;
// change "country" to a value from https://coronavirus-19-api.herokuapp.com/countries/
const country = "Argentina"
const url = `https://coronavirus-19-api.herokuapp.com/countries/${country}`
const req = new Request(url)
const res = await req.loadJSON()

// create widget
 let widget = createWidget("Coronavirus", `Casos: ${res.todayCases}\nMuertes: ${res.todayDeaths}`, `Total: ${res.cases}`, Color.yellow())

if (config.runsInWidget) {
  // show widget
  Script.setWidget(widget)
  Script.complete()
} else {
  // make table
  let table = new UITable()
  
  // add header
  let row = new UITableRow()
  row.isHeader = true
  row.addText(`Coronavirus Stats in ${country}`)
  table.addRow(row)
  
  // fill data
  table.addRow(createRow("Cases", res.cases))
  table.addRow(createRow("Today", res.todayCases))
  table.addRow(createRow("Deaths", res.deaths))
  table.addRow(createRow("Recovered", res.recovered))
  table.addRow(createRow("Critical", res.critical))
  
  if (config.runsWithSiri)
    Speech.speak(`There are ${res.cases} cases in ${country}, and ${res.todayCases} cases today.`)
  
  // present table
  //table.present()
  widget.presentSmall()
}

function createRow(title, number) {
  let row = new UITableRow()
  row.addText(title)
  row.addText(number.toString()).rightAligned()
  return row
}

function createWidget(pretitle, title, subtitle, color) {
  let w = new ListWidget()
  w.backgroundColor = color
  let preTxt = w.addText(pretitle)
  preTxt.textColor = Color.black()
  preTxt.textOpacity = 0.8
  preTxt.font = Font.heavySystemFont(16)
  preTxt.centerAlignText()
  w.addSpacer(10)
  let titleTxt = w.addText(title)
  titleTxt.textColor = Color.black()
  titleTxt.font = Font.boldSystemFont(16)
  w.addSpacer(10)
  let subTxt = w.addText(subtitle)
  subTxt.textColor = Color.black()
  subTxt.textOpacity = 0.8
  subTxt.font = Font.systemFont(16)
  return w
}
