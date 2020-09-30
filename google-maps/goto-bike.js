var toAddress = ""
var by = "bicyling"

var baseURL = "comgooglemaps-x-callback://x-callback-url"

var req = new CallbackURL(baseURL)

req.addParameter("saddr", "")
req.addParameter("daddr", toAddress)
req.addParameter("directionsmode", by)

var res = req.open()
