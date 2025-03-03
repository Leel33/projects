class staff:
 def __init__(self, fname, lname, age):
  self.fname = fname
  self.lname = lname
  self.age = age

 def printInfo(self):
  print(self.fname, ",", self.lname, ",", self.age)

class GM(staff):
 def __init__(self, fname, lname, age, team):
  staff.__init__(self,fname,lname,age)
  self.team = team
 

class Coach(GM):
 def __init__(self, fname, lname, age, team, yearsAsCoach):
  super().__init__(fname, lname, age, team)
  self.yearsAsCoach = yearsAsCoach

class Player(GM):
 def __init__(self, fname, lname, age, team, height, weight, yearsAsPlayer, position, jerseyNumber):
  super().__init__(fname, lname, age, team)
  self.height = height
  self.weight = weight
  self.yearsAsPlayer = yearsAsPlayer
  self.jerseyNumber = jerseyNumber
  self.position = position
  
firstCoach = Coach("John", "Williams", 45, "Tigers", "5yrs")
firstCoach.printInfo()
print(firstCoach.team)







