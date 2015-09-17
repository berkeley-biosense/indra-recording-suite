import requests
import json
url = "http://indra.webfactional.com/"
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}

# MESSAGE PARAMTERS
# ALL OF THESE ARE STRINGS
tag = "mental-rotation" # tag - probably task name
sid = "24" # subject ID
dur = "10" # duration of recording, in seconds

start_record_message = {
  "type": "start-recording",
  "tag": tag,
  "duration": dur,
  "sid": sid,
}

requests.post(url, data=json.dumps(start_record_message), headers=headers)
print 'posted', start_record_message
