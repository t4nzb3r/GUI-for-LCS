"""
Name:        eLCS_Run.py
Authors:     Ryan Urbanowicz - Written at Dartmouth College, Hanover, NH, USA
Contact:     ryan.j.urbanowicz@darmouth.edu
Created:     November 1, 2013
Description: To run e-LCS, run this module.  A properly formatted configuration file, including all run parameters must be included with the path to that 
             file given below.  In this example, the configuration file has been included locally, so only the file name is required.
             
---------------------------------------------------------------------------------------------------------------------------------------------------------
eLCS: Educational Learning Classifier System - A basic LCS coded for educational purposes.  This LCS algorithm uses supervised learning, and thus is most 
similar to "UCS", an LCS algorithm published by Ester Bernado-Mansilla and Josep Garrell-Guiu (2003) which in turn is based heavily on "XCS", an LCS 
algorithm published by Stewart Wilson (1995).  

Copyright (C) 2013 Ryan Urbanowicz 
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the 
Free Software Foundation; either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABLILITY 
or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, 
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
---------------------------------------------------------------------------------------------------------------------------------------------------------
"""

#Import Required Modules------------------------------------
from Timer import Timer
from ConfigParser import ConfigParser
from Offline_Environment import Offline_Environment
from eLCS import eLCS
from Constants import *
from RunExporter import RunExporter
import json
#-----------------------------------------------------------

class Run:
	def __init__(self):
		self.name = "Run"
		self.helpstr = """Failed attempt to run e-LCS.  Please ensure that a configuration file giving all run parameters has been specified."""

		#Specify the name and file path for the configuration file. 
		self.configurationFile = "eLCS_Configuration_File.txt"

		#Obtain all run parameters from the configuration file and store them in the 'Constants' module.
		ConfigParser(self.configurationFile)

		#Initialize the 'Timer' module which tracks the run time of algorithm and it's different components.
		self.timer = Timer()
		cons.referenceTimer(self.timer)

		#Initialize the 'Environment' module which manages the data presented to the algorithm.  While e-LCS learns iteratively (one inistance at a time
		self.env = Offline_Environment()
		cons.referenceEnv(self.env) #Passes the environment to 'Constants' (cons) so that it can be easily accessed from anywhere within the code.
		cons.parseIterations() #Identify the maximum number of learning iterations as well as evaluation checkpoints.

		self.lcs = eLCS()


	def run(self):
		self.lcs.run_eLCS()

	def runOneStep(self):
		self.lcs.runMethod()

	def runOneCycle(self):
		self.lcs.runOneCycle()

	def getPopulationHistory(self, i):
		return self.lcs.populationHistory[i]

	def getLastPopulation(self):
		if(len(self.lcs.populationHistory) > 0):
			return RunExporter().export(
				self.lcs.populationHistory[len(self.lcs.populationHistory) - 1]["population"],
				self.lcs.populationHistory[len(self.lcs.populationHistory) - 1]["next-step"],
				self.lcs.populationHistory[len(self.lcs.populationHistory) - 1]["current-step"]
			)
		else:
			return RunExporter().exportEmpty()

	def getLastLearningParams(self):
		return json.dumps(self.lcs.learningParams)

	def getGAValues(self):
		return json.dumps(self.lcs.ga)

	def getDeletionValues(self):
		return json.dumps(self.lcs.population.deletionParams)

	def performSubsumption(self):
		self.lcs.performSubsumption()

	def importRulePopulation(self, newRules):
		self.lcs.importRulePopulation(json.loads(newRules))

	def toJson(self):
		return RunExporter().export(
			self.lcs.populationHistory[0]["population"],
			self.lcs.populationHistory[0]["next-step"],
			self.lcs.populationHistory[0]["current-step"]
		)
