from flask import Flask, request
from flask_cors import CORS
import data as ipozdata
import json

app = Flask(__name__)
CORS(app)

@app.route("/search", methods=['POST'])
def hello():
    app.logger.debug(request.json)
    res = ipozdata.matches(request.json['key'])
    return json.dumps({"results": res})