var url = "http://www.aquehorajuegaboca.com.ar/proximos"
var req = new Request(url)
var res = await req.load()
var html = res.toRawString()

var team = extractTeams(html)
var date = extractDate(html)

var widget;

if (isToday(date)){
  widget = createTodayWidget(date)
} else {
  widget = createWidget(team, date)
}


if (!config.runsInWidget) {
  await widget.presentMedium()
}

Script.setWidget(widget)

Script.complete()



function createTodayWidget(date){
  var widget = new ListWidget()
  var gradient = new LinearGradient()
  gradient.locations = [0, 0.5, 1]
  gradient.colors = [Color.yellow(), Color.blue(), Color.yellow()]
  widget.backgroundGradient = gradient
  widget.backgroundColor = Color.yellow()
  
  widget.addSpacer(35)
  
  widget.addText("💙💛💙").centerAlignText()
  widget.addSpacer()
  
  var title = widget.addText("HOY JUEGA BOCA!")
  title.centerAlignText()
  title.font = Font.heavySystemFont(24)
  title.textColor = Color.yellow()
  
  widget.addSpacer()
  widget.addText("💙💛💙").centerAlignText()
  
  widget.addSpacer(5)
  var timeTxt = widget.addText(date.matchTime)
  timeTxt.centerAlignText()
  timeTxt.font = Font.boldSystemFont(16)
  timeTxt.textColor = Color.blue()
  
  widget.addSpacer()
  
  return widget
}


function createWidget(team, date){
  var widget = new ListWidget()
  widget.backgroundColor = new Color("#152238")
  
  txtColor = Color.yellow()
  
  widget.addSpacer()
  var title = widget.addText("C.A.B.J.")
  title.centerAlignText()
  title.font = Font.heavySystemFont(24)
  title.textColor = txtColor
  
  widget.addText("💙💛💙").centerAlignText()
  
  widget.addSpacer(10)
  var teamTxt = widget.addText(team)
  teamTxt.centerAlignText()
  teamTxt.font = Font.semiboldSystemFont(16)
  teamTxt.lineLimit = 2
  teamTxt.textColor = txtColor
  
  widget.addSpacer(5)
  var dateTxt = widget.addText(date.matchDate)
  dateTxt.centerAlignText()
  dateTxt.font = Font.boldSystemFont(16)
  dateTxt.textColor = txtColor
  
  widget.addSpacer(5)
  var timeTxt = widget.addText(date.matchTime)
  timeTxt.centerAlignText()
  timeTxt.font = Font.boldSystemFont(16)
  timeTxt.textColor = txtColor
  
  widget.addSpacer()
  
  return widget
}


function extractTeams(html){
  var regexTeam = /<div class="equipo_proximo">\r\n(.*?)<\/div>/g
  
  var matches = Array.from(html.matchAll(regexTeam))
  
  return matches[0][1].trim() + " vs. " + matches[1][1].trim()
}

function extractDate(html){
  var regexDate = /<div class="fecha_proximo">\r\n(.*?)<\/div>/
  var matchDate = html.match(regexDate)[1].trim()

  var regexTime = /<div class="hora_proximo">\r\n(.*?)<\/div/
  var matchTime = html.match(regexTime)[1].trim()

  return { "matchDate": matchDate, "matchTime": matchTime}
}


function isToday(date){
  var dateFormatter = new DateFormatter()
  
  dateFormatter.dateFormat = "dd/MM/yyyy HH:mm"
  
  var dateOfTheMatch = dateFormatter.date(date.matchDate + " " + date.matchTime)
  
  var today = new Date()
  
  return today.getDay() === dateOfTheMatch.getDay() && today.getMonth() === dateOfTheMatch.getMonth() && today.getFullYear() === dateOfTheMatch.getFullYear()
}

// get total seconds between the times
// var delta = Math.abs(dateOfTheMatch - new Date()) / 1000;
// 
// calculate (and subtract) whole days
// var days = Math.floor(delta / 86400);
// delta -= days * 86400;
// 
// calculate (and subtract) whole hours
// var hours = Math.floor(delta / 3600) % 24;
// delta -= hours * 3600;
// 
// calculate (and subtract) whole minutes
// var minutes = Math.floor(delta / 60) % 60;
// delta -= minutes * 60;
// 
// what's left is seconds
// var seconds = delta % 60;  // in theory the modulus is not required
// 
// 
