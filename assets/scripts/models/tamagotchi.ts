class Tamagotchi {
	private name: string;
	private health: number;
	private money: number;
	private hyg: number;


	constructor(name: string, health: number, money: number, hyg:number) {
		this.name = name;
		this.health = health;
		this.money = money;
		this.hyg = hyg;
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

	// Feed the Tamagotchi
	feed(): boolean {
		if (this.money > 0) {
			this.health++;
			this.money--;
			return true;
		}
		else
			return false;

	}
	// cleen the Tamagotchi 
	clean(): boolean {
		if (this.money > 0) {
			this.hyg++;
			this.money--;
			return true;
		} else
			return false;
	}
}