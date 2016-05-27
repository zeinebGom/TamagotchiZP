class Tamagotchi {
	private name: string;
	private health: number;
	private money: number;


	constructor(name: string, health: number, money: number) {
		this.name = name;
		this.health = health;
		this.money = money;
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
}