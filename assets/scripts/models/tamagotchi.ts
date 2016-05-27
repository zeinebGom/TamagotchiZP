class Tamagotchi {
	private name: string;
	private health: number;
	private money: number;
	private cleanness: number;
	private workLevel: number;
	private promoteLevel: string;
	private initialHealth: number;
	private initialMoney: number;
	private initialCleanness: number;
	private initialWorkLevel: number;


	constructor(name: string, health: number, money: number, cleanness: number, workLevel: number) {
		this.name = name;
		this.health = this.initialHealth = health;
		this.money = this.initialMoney = money;
		this.cleanness = this.initialCleanness= cleanness;
		this.workLevel = this.initialWorkLevel = workLevel;
		this.promote();
	}

	/* Reset the Tamagotch */
	reset(): void {
		this.health = this.initialHealth;
		this.money = this.initialMoney;
		this.cleanness = this.initialCleanness;
		this.workLevel = this.initialWorkLevel;
		this.promote();
	}

	/* Getters functions */
	getName(): string {
		return this.name;
	}

	getHealth(): number {
		return this.health;
	}

	getMoney(): number {
		return this.money;
	}

	getCleanness(): number {
		return this.cleanness;
	}

	getPromoteLevel(): string {
		return this.promoteLevel;
	}
	
	// Feed the Tamagotchi
	feed(): any {
		if (this.money > 0) {
			this.health++;
			this.money--;
			return {
				feed: true,
				message: 'Thank you, I am going to eat an hamburger'
			}
		}
		else
			return {
				feed: false,
				message: 'Not enough money for lunch...'
			}
	}

	// Clean the Tamagotchi 
	clean(): any {
		if (this.money > 0) {
			this.initialCleanness++;
			this.money--;
			return {
				clean: true,
				message: 'OK, I take my shower right now!'
			}
		} else
			return {
				clean: false,
				message: 'Not enough money to have my shower...'
			}

	}

	// Go to work
	work(): any {
		if (this.health <= 2) {
			return {
				work: false,
				message: 'So tired to work...'
			}
		}
		else {
			this.money += 10;
			this.health -= 2;
			this.workLevel += 10;
			let promoteReturn = this.promote();

			if(promoteReturn.hasNewPromoteLevel == true) {
				return {
					work: true,
					message: promoteReturn.message
				}
			}

			return {
				work: true,
				message: 'I am going to the office'
			}
		}
	}

	/* Check for the promote level, depending on the work level */
	private promote (): any {
		let oldPromoteLevel = this.promoteLevel;

		if (this.workLevel == 0)
			this.promoteLevel = "Unemployed";
		else if ((this.workLevel > 0) && (this.workLevel < 50))
			this.promoteLevel = "Laborer";
		else if ((this.workLevel >= 51) && (this.workLevel < 200))
			this.promoteLevel = "Chief";
		else
		 	this.promoteLevel = "Director";

		if (this.promoteLevel != oldPromoteLevel)
			return {
				hasNewPromoteLevel: true,
				message: 'You are now ' + this.promoteLevel
			}
		else
			return {
				hasNewPromoteLevel: false,
				message: ''
			}
	}



}