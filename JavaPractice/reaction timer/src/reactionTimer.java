import java.util.Scanner;
public class reactionTimer {
	 public static long startTime;
	public static long stopTime; 
	public static void countDown() throws InterruptedException {
		System.out.println("Instructions: While the display counts down to 1, The user must press the letter \"s\" & enter on keyboard once the timer starts in order to stop the time.");
		Thread.sleep(11000);

		System.out.println("");
		System.out.println("Starting in...");
		Thread.sleep(3000);

		for (int i = 3; i>=1; i--) {
			System.out.println(i);
			Thread.sleep(1000);
		}
		
		System.out.println("START!!!");
		long startTime = System.currentTimeMillis();
		
		long stopTime = 0; 

		Scanner scr = new Scanner(System.in); 
		char stopRequest = scr.next().charAt(0);
		 
		if (stopRequest == 's') {
			
			 stopTime = System.currentTimeMillis();
		 }
		   else {
			 System.out.println("Sorry, please read the following instructions: ");
			 countDown();
			
		 }

		float reactionTime = (stopTime) - (startTime); 
	reactionTime = (reactionTime) / 1000;
		System.out.println("Your reaction time is: " + reactionTime + "seconds!");
		
		if (reactionTime <= 1.5) {
			System.out.println("Great Reaction!");
		}
		else {
				System.out.println("Poor Reaction");
			}
		
		System.out.println("Would you like to try again? Enter \"y\" for Yes or \"n\" for No");

		char userChoice;
 
		userChoice = scr.next().charAt(0); 
		if ((userChoice == 'y') || (userChoice == 'Y')) {
			countDown();
		
			
		}
		else if ((userChoice == 'n') || (userChoice == 'N')) {
			System.out.println("Thanks for playing!");
			System.exit(0);
		}
		else {
			System.out.print("Error");
			System.exit(0);
		}
	}

	public static void main(String[] args) throws InterruptedException  {

System.out.println("Welcome to my reaction timer!");
countDown();

	}
}
