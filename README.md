# mindwave recording suite

Here's some code to record data from [indra-client](github.com/indra-net/indra-client).

## Installation

Clone this repository and do

`npm install`

Make sure you've also done

`pip install requests`

## Usage

Run the recording saver with `node recording-saver.js`.

Now put on your Mindwave and run indra-client (or run `npm test` to use some fake data).

Finally, emit a start recording message with `python start-recording.py`. 

Recordings will be appended to out.csv.

(You should move your out.csv elsewhere for archival purposes).

### CSV output format

There are four fields in out.csv,

`time, task, sid, data`

Data is a JSON string. It contains everything, including the first 3 fields. 

When processing this data, you can query/select the data you want using the first three fields; then, take the data field and, in python, use [json.loads()](https://docs.python.org/2/library/json.html) to convert it to a python object and explore all the secrets it holds. (Or marshall it into a format that's good for you).
