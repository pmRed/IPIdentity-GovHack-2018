import csv
import json
from fuzzywuzzy import process, fuzz

data = []
dumb_data = []

# OrderedDicts are already sorted
snd = lambda t: t[1]
def combinerino(odict):
    return ' | '.join(map(snd, odict))

def load_csv():
    global data
    global dumb_data
    with open('../data/data_for_govhack2.csv', 'r') as f:
        rdr = csv.DictReader(f)
        data.extend(rdr)
        #data.splitBy(lambda x: x[0])

    dumb_data = set(map(combinerino, map(lambda t: t.items(), data)))

def matches(k):
    lst = process.extract(k, dumb_data, limit=4, scorer=fuzz.partial_ratio)
    return list(map(lambda x: x[0]+" | "+str(x[1]),lst))

def labels():
    return list(data[0].keys())

load_csv()