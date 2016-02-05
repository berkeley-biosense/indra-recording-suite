var _              = require('lodash')
var fs             = require('fs')
var hostname       = 'http://indra.webfactional.com'
var faucet         = require('socket.io-client')(hostname)
var d              = new Date()
var date_label     = d.toUTCString()
var log_file       = 'out' + date_label + '.csv'


faucet.on('connect', () => {
  
  // CSV row: time, tag, sid, full data
  var log_line = function (d) {
    d.reading.eeg_power = d.reading.eeg_power + ''
    d.reading.raw_values = d.reading.raw_values + ''
    return JSON.stringify(d)
  }
  
  var append_to_log = function (d, cb) {
    fs.appendFile(log_file, log_line(d)+',\n', cb)
  }
  
  var save_data = function(data, start_msg) {
    var d = _.extend(data, start_msg)
    append_to_log(d, function (err) {
      if (err) throw err
      console.log('saved: ', d)
    })
  }
  
  // handler for start recording message
  var start_recording = function (start_msg) { 
    // save mindwave data during duration
    var handler = function (data) { return save_data(data, start_msg) }
    faucet.on('mindwave', handler)
    console.log('started recording', start_msg) 
    // stop saving mindwave data after record duration
    setTimeout(function () {
      faucet.removeListener('mindwave', handler)
      console.log('stopped recording') 
    },  start_msg.duration*1000)
  }
  
  // bind start recording handler to start-recording event
  faucet.on('start-recording', start_recording)
  console.log('listening for start-recording messages..')
})
