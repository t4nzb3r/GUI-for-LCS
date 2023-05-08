// import actions from './actions.js'
// import mutations from './mutations.js'
// import getters from './getters.js'

export default {
	namespaced: true,
	state: {
		c01misc: {
			t01appExplanation: "<p> The application's goal is to teach you about the basics of learning classifier systems (LCSs). The application guides you through the learning cycle and explains every step. You can use the buttons in the menubar at the top to control the learning cycle. 'Next' runs the next step in the cycle. 'Run Cycle' executes one learning cycle. 'Run 10 Cycles' and 'Run 100 Cycles' execute 10 and 100 cycles, respectively.</p>"
				+ "<p>Executing multiple cycles at once is useful to see how the rule population improves. You can also manipulate the rule population by clicking on a bit in the classifier or on the phenotype. This will cycle through the three possible options, i.e. '1', '0', and '#'.</p>",
			t02lcsIntro: "<h3>Introduction to Learning Classifier Systems</h3>"
				+ "<p>This is the start of the learning cycle. The underlying LCS is Michigan-style accuracy-based. This type is also called XCS. Initially, an LCS doesn't have any rules yet.</p>"
				+ "<p>You can get information about the components by clicking their icon or title.</p>"
				+ "<h3>What is an LCS?</h3>"
				+ "<p>Machine learning is mainly concerned with making predictions based on data collected earlier. There are many algorithms to do so. A very rudimentary algorithm would be simply checking all the data you have collected for the most similar case and then using that case to perform a prediction. For example, if you want to predict tomorrow's weather, you simply check a weather database of the last few years for a day with weather that is very close to the weather we have today and then use that day's subsequent day's weather as your prediction for tomorrow's weather.</p>"
				+ "<p>However, this algorithm is very restricted. For one, you have to store a lot of data (e.g., many days' weather). Secondly, the algorithm does not generalize well (e.g., if there is no day in the database whose weather is any way near today's weather—this may, for example, be the case for extreme weather events). One way to improve this algorithm is to deduce a set of simple if-then rules from the available data (e.g., if it's sunny today and there is no wind at all, then it's sunny tomorrow with high probability). This is what an LCS tries to do: Find an optimal set of if-then rules that describes available data such that predictions can be made with low error. Each input of information is analyzed, and if a rule already exists that fits this input, it can be used to decide the class/action/phenotype. If no fitting rule exists, a new one is created randomly. Each time the LCS gets feedback on its decisions, the rules can be evaluated accordingly, i.e., if they contributed to correct or incorrect decisions. This way, over time, the rules can be adapted to improve the results.</p>"
				+ "<p>Goals could be to classify an image, e.g., is it an image of a cat or a dog, or to decide what to do next in a game or while driving a car. The information given depends on the task at hand and could be very low-level, e.g., RGB-values of each pixel in an image, or rather high-level, e.g., can the agent in a game currently see an enemy in front of him.</p>"
				+ "<h3>What's next?</h3>"
				+ "<p>Next, you can click on 'rule population' on the right to learn more about this component. There it is explained what rules are. Or you can explore the learning cycle on your own by clicking 'next' in the menubar.</p>",
			t03multiplexerProblem: "<h3>Multiplexer Problem</h3>"
				+ "<p>To teach LCS, the 6-bit multiplexer problem is taken as an example problem. If you are unfamiliar with it, you can read it up on <a href=\"https://ryanurbanowicz.com/index.php/resources-2/multiplexer-problem/\" target=\"_blank\">this website</a>.</p>"
		},
		c02data: {
			t01explanation: "<h3 class='text-align-center'><b>Data Entries</b></h3>"
				+ "<p>In this LCS implementation, the LCS learns one data entry at a time. The LCS doesn't initially know the correct phenotype when receiving the entry.</p>"
				+ "<p>Now, every rule in the population is compared with the given data entry. All the rules whose conditions match the data entry are gathered in the <b>matching phase</b>.</p><p>If no rules in the population match, a new rule is created by taking the current entry and randomly replacing bits with the wildcard (#). This process is called <b>covering</b></p>"
		},
		c03matching: {
			t01explanation: "<h3 class='text-align-center'><b>Matching</b></h3>"
				+ "<p>All the matching rules have been gathered.</p>"
				+ "<p>After the matching is done, the LCS gets told what the correct phenotype is. All the matching rules are now sorted into <b>correct ([C])</b> and <b>incorrect ([I])</b>.</p>"
		},
		c04parameterUpdate: {
			t01explanation: "<h3 class='text-align-center'><b>Parameter Update</b></h3>"
				+ "<p>If the rules' predicted phenotype was correct, they are rewarded. Otherwise, they are punished. Rewarding and punishing rules can happen in various ways. In this implementation, the amount of total predictions is increased by one for all rules in [C] and [I]. The amount of correct predictions is increased by one only for the rules in [C].</p>"
				+ "<p>A rule's fitness is calculated by dividing the number of correct predictions by the number of total predictions, yielding values from 0 to 1. The higher the value, the fitter the rule.</p>"
		},
		c05geneticAlgorithm: {
			t01parentSelection: "<h3 class='text-align-center'><b>Genetic Algorithm — Selection</b></h3>"
				+ "<p>The parents for the genetic algorithm are selected randomly from the set of correct rules. If there is only one rule in [C], then this one rule is taken for both parents.</p>",
			t02crossover: "<h3 class='text-align-center'><b>Genetic Algorithm — Crossover</b></h3>"
				+ "<p>During crossover, two new rules are created by randomly taking the bit either from the left or right parent for each bit.</p>",
			t03mutation: "<h3 class='text-align-center'><b>Genetic Algorithm — Mutation</b></h3>"
				+ "<p>In mutation bits are randomly altered. A '1' might become a '0' or a '#', or it stays the same.</p>"
		},
		c06deletion: {
			t01explanation: "<h3 class='text-align-center'><b>Deletion</b></h3>"
				+ "<p>When the population reaches its maximum size, rules are probabilistically chosen and removed based on their fitness and accuracy.</p>"
		},
		c07startOver: {
			t01furtherLearning: "<p>Now that you have stepped through the whole learning cycle, you can either go through the learning cycle again if you are unsure about something or run multiple learning cycles at once and see the rule population fill up and improve.</p>"
				+ "<p>Also, if you want to see the 'deletion' step activated, you should run 100 cycles and then step through the learning cycle step-by-step.</p>"
		},
		c08components: {
			population: "<p>The population contains the rules. Through the learning cycle, the population as a whole is improved. A rule consists of a condition and a phenotype. It can be understood as an if-statement 'if [condition] then [phenotype]'.</p>",
			dataEntries: "<p>This is the source from which the learning cycle gets its data to train with. This implementation of the learning cycle trains with each data entry one at a time.</p>",
			matching: "<p>In the matching section, one data entry is compared to all the rules in the population. Only a rule's condition must match the data entry. The phenotype is ignored while gathering all matching rules because the learning cycle doesn't know the data entries phenotype.</p>",
			parameterUpdate: "<p>This is where learning is achieved. Rules collected during the <b>matching phase</b>, whose phenotype is correct, are rewarded. Those rules are summarized in [C]. The rules that match the data entry, whose phenotype is incorrect, are punished. Those rules are summarized in [I].</p>"
				+ "<p>This implementation increases the correct rules amount of correct matches and total matches. Because the fitness is calculated by dividing correct matches by total matches, this will increase their fitness. In turn, only the amount of total matches of the incorrect rules is increased. This decreases a rules fitness, effectively punishing them.</p>",
			geneticAlgorithm: "<p>This step can greatly differ from LCS to LCS. In this implementation, two parents are randomly taken from [C]. In <b>crossover</b> two new rules are created by randomly taking bits from either the left or the right parent. So that diverse rules are created, random bits are altered in the two new rules by replacing them with another bit value.</p>"
				+ "<p>The new rules' parameters combine their parents' parameters.</p>",
			deletion: "<p>When the rule population exceeds a predefined maximum size, excess rules are probabilistically removed based on their fitness.</p>"
		}

	},
	actions: {
	}
	// mutations,
	// getters
}