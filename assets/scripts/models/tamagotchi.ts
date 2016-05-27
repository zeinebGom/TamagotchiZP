class Tamagotchi {
	private name: string;
	private health: number;
	private money: number;
	private hyg: number;
	private workLevel: number;
	private promoteLevel: string;



	constructor(name: string, health: number, money: number, hyg:number, workLevel:number) {
		this.name = name;
		this.health = health;
		this.money = money;
		this.hyg = hyg;
		this.workLevel = workLevel;
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

	getHyg(): number {
		return this.hyg;
	}
	getPromoteLevel():string{
		return this.promoteLevel;
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
	work ():void{
		this.money += 10;
		this.health -= 2;
		this.workLevel += 10;
		this.promote();
	}

	promote (): any{
		if (this.workLevel == 0) {
			return this.promoteLevel="unemployed";
		} else if ((this.workLevel > 0) && (this.workLevel < 50)) {
			return this.promoteLevel = "laborer";
		} else if ((this.workLevel >= 51) && (this.workLevel < 200)) {
			return this.promoteLevel = "chief";
		} else if (this.workLevel >= 201) {	
			return this.promoteLevel = "director";
		}
	}
}