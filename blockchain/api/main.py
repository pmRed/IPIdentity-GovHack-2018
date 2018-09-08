from flask import Flask, request
from flask_cors import CORS
import data as ipozdata
import json
import subprocess

app = Flask(__name__)
CORS(app)


@app.route("/makeaccount", methods=['POST'])
def makeaccount():
    app.logger.debug(request.json)
    # wallet must be unlocked already
    subprocess.call(['cleos', 'create', 'account', 'eosio', "ACN"+request.json['ACN'], ])

    #res = ipozdata.matches(request.json['key'])
    #res2=list(map(lambda x : x[0].split('|'),res))
    #lab1 = ipozdata.labels()
    plainNames = ["UID", "Year", "Name", "Type", "ABN", "ACN", "Entity", "App NO.", "New IPA", "Old IPA", "Party", "CSS", "SAP", "Customer IPA"]
    lab = list(map( lambda x: {'id': x[0], 'name': x[1]}, zip(lab1,plainNames)))
    res3 = list(map(lambda x: {'key': 'r'+str(x[0]), 'value': dict(zip(lab1,x[1]))}, enumerate(res2)))
    return json.dumps({"dataLabels": lab, "dataTable": res3})
