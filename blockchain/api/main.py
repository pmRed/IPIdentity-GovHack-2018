from flask import Flask, request
from flask_cors import CORS
#import data as ipozdata
import json
import subprocess
import hashlib
import os
import random
import string 
app = Flask(__name__)
CORS(app)

workdir=os.getcwd()

persistance_names = {}

persistance_applications = {}

persistance_transactions = {}

hashfunc = lambda x: hashlib.sha1(x.encode("UTF-8")).hexdigest()[:10]
hashfunclong = lambda x: hashlib.sha1(x.encode("UTF-8")).hexdigest()

@app.route("/makeaccount", methods=['GET'])
def makeaccount():
    #app.logger.debug(request.json)
    # wallet must be unlocked already
    #data = request.json['name']
    data = request.args.get('name')
    name = ''.join(random.choices('.12345abcdefghijklmnopqrstuvwxyz', k=11))
    os.chdir(workdir+"/accounts")
    print(name)
    output = subprocess.check_output('./makeaccount.sh %s' % name, shell=True) 
    myjson = json.loads(output)
    mykey = myjson["processed"]["action_traces"][0]['act']['data']['owner']['keys'][0]['key']
    privkey = ""
    if (data not in persistance_names):
        with open(workdir+"/accounts/dataStore_User_"+name, "r") as f:
            lines = f.readlines()
            privkey = lines[-2].strip()
        persistance_names[data] = {"exists": True, "pubkey" : mykey, "accname" : name, "privkey" : privkey[16:]}
        persistance_applications[privkey[16:]] = {"abn": data, "accname" : name, "applications" : []}
        output = {"exists": False, "pubkey" : mykey, "accname" : name, "privkey" : privkey[16:]}
        return json.dumps(output)
    else:
        temp = persistance_names[data]
        temp["privkey"] = ""
        return json.dumps(temp)

@app.route("/addapplication", methods=['GET'])
def addapplication():
    privkey = request.args.get("privkey")
    appdoc = request.args.get("appdoc")
    if (appdoc == ""):
        return json.dumps({transactionlabel : "nodoc"})
    if (privkey in persistance_applications):
        persistance_applications[privkey]["applications"].append(appdoc)
        numapplications = len(persistance_applications[privkey]["applications"])
        abn = persistance_applications[privkey]["abn"]
        accname = persistance_applications[privkey]["accname"]
        # serialize on blockchain
        myhash = hashfunclong(appdoc + accname)
        if (myhash in persistance_transactions):
            return json.dumps({"transactionlabel" : "Already Submitted"})
        else:
            persistance_transactions[myhash] = {"application" : appdoc, "abn" : abn}
        return json.dumps({"transactionlabel" : myhash, "numapplications" : numapplications, "abn" : abn, "accname" : accname})
    else:
        return json.dumps({"transactionlabel" : "nokey %s" % privkey})


@app.route("/getapplication", methods=['GET'])
def getapplication():
    myhash = request.args.get("hash")
    if (myhash in persistance_transactions):
        return json.dumps(persistance_transactions[myhash])
    else:
        return json.dumps({"application" : "Not found", "abn" : "Not found"})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5100, threaded=True, debug=True)
