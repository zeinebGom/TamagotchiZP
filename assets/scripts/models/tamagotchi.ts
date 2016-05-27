class Tamagotchi {
	private name: string;
	private health: number;
	private money: number;
	private hyg: number;
	private workLevel: number;
	private promoteLevel: string;
	private initialHealth: number;
	private initialMoney: number;
	private initialHyg: number;
	private initialWorkLevel: number;


	constructor(name: string, health: number, money: number, hyg:number, workLevel:number) {
		this.name = name;
		this.health = this.initialHealth = health;
		this.money = this.initialMoney = money;
		this.hyg = this.initialHyg = hyg;
		this.workLevel = this.initialWorkLevel = workLevel;
		this.promote();
	}

	/* Restart game */
	restartGame(): void {
		console.log('Santé ini ' + this.initialHealth);
		this.health = this.initialHealth;
		this.money = this.initialMoney;
		this.hyg = this.initialHyg;
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

	// Clean the Tamagotchi 
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
			return this.promoteLevel="Unemployed";
		} else if ((this.workLevel > 0) && (this.workLevel < 50)) {
			return this.promoteLevel = "Laborer";
		} else if ((this.workLevel >= 51) && (this.workLevel < 200)) {
			return this.promoteLevel = "Chief";
		} else if (this.workLevel >= 201) {	
			return this.promoteLevel = "Director";
		}
	}



}