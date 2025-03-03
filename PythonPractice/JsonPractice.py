import json
import random

x = {
       "name": "Jaleel",
       "age": 23,
       "major" : "computer science",
       "hobbies": [
        {
         "name": "gaming",
         "time": "45min"
        },
         {
            "name": "exercising",
            "type": ["lifting", "running", "swimming"]
         },
        {
            "name": "drawing",
            "time": "30min"
        }
      ]
    }

#converts to python to json string
#y = json.dumps(x)
#converts json string to python dic
#k = json.loads(y)

#print(x["hobbies"][1]['type'][1])