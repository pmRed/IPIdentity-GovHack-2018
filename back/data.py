import csv
import json
from fuzzywuzzy import process, fuzz

data = []
dumb_data = []

# OrderedDicts are already sorted
snd = lambda t: t[1]
def combinerino(odict):
    return ' '.join(map(snd, odict))

def load_csv():
    global data
    global dumb_data
    with open('../data/data_for_govhack.csv', 'r') as f:
        rdr = csv.DictReader(f)
        data.extend(rdr)

    dumb_data = list(map(combinerino, map(lambda t: t.items(), data)))

def matches(k):
    return process.extract(k, dumb_data, limit=5, scorer=fuzz.partial_token_sort_ratio)

load_csv()