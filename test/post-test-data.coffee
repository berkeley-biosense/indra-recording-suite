request    = require 'request-json'
fake_data  = require './fake-data.js'
delay 	   = (t, cb) -> setTimeout cb, t
repeatedly = (t, cb) -> setInterval cb, t

json_rest_client = request.createClient 'http://indra.webfactional.com'
post = (d) -> json_rest_client.post '/', d, (err, res, body) -> if err then console.log err
post_test_data = (i, d) ->
	delay 1000*i-1, () -> 
		post d
		console.log 'posted', i
#main
repeatedly 1000*fake_data.length, () ->
	post_test_data i+1, data for data, i in fake_data