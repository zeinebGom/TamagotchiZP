/* This class provides an abstraction view of a Tamagotchi character */
var Tamagotchi = (function () {
    function Tamagotchi(name, health, happiness, money, cleanness, workLevel) {
        this.name = name;
        this.health = this.initialHealth = health;
        this.isDead = false;
        this.happiness = this.initialHappiness = happiness;
        this.money = this.initialMoney = money;
        this.cleanness = this.initialCleanness = cleanness;
        this.workLevel = this.initialWorkLevel = workLevel;
        this.promote();
    }
    /* Reset the Tamagotch */
    Tamagotchi.prototype.reset = function () {
        this.health = this.initialHealth;
        this.happiness = this.initialHappiness;
        this.money = this.initialMoney;
        this.cleanness = this.initialCleanness;
        this.workLevel = this.initialWorkLevel;
        this.promote();
    };
    /* Getters functions */
    Tamagotchi.prototype.getName = function () {
        return this.name;
    };
    Tamagotchi.prototype.getHealth = function () {
        return this.health;
    };
    Tamagotchi.prototype.getMoney = function () {
        return this.money;
    };
    Tamagotchi.prototype.getCleanness = function () {
        return this.cleanness;
    };
    Tamagotchi.prototype.getHappiness = function () {
        return this.happiness;
    };
    Tamagotchi.prototype.getWorkLevel = function () {
        return this.workLevel;
    };
    Tamagotchi.prototype.getPromoteLevel = function () {
        return this.promoteLevel;
    };
    // Feed the Tamagotchi
    Tamagotchi.prototype.feed = function () {
        if (this.money > 0) {
            this.health++;
            this.money--;
            return {
                feed: true,
                message: 'Thank you, I am going to eat an hamburger'
            };
        }
        else
            return {
                feed: false,
                message: 'Not enough money for lunch...'
            };
    };
    // Clean the Tamagotchi 
    Tamagotchi.prototype.clean = function () {
        if (this.money > 0) {
            this.cleanness++;
            this.money--;
            return {
                clean: true,
                message: 'OK, I take my shower right now!'
            };
        }
        else
            return {
                clean: false,
                message: 'Not enough money to have my shower...'
            };
    };
    // Go to work
    Tamagotchi.prototype.work = function () {
        if (this.health <= 2) {
            return {
                work: false,
                message: 'So tired to work...'
            };
        }
        else {
            this.money += 10;
            this.health -= 2;
            this.workLevel += 10;
            var promoteReturn = this.promote();
            if (promoteReturn.hasNewPromoteLevel == true) {
                return {
                    work: true,
                    message: promoteReturn.message
                };
            }
            return {
                work: true,
                message: 'I am going to the office'
            };
        }
    };
    /* Play football */
    Tamagotchi.prototype.playFootball = function () {
        /*if (this.health <= 2) {
            return {
                work: false,
                message: 'So tired to play football...'
            }
        }
        else {*/
        this.health += 2;
        this.happiness += 1;
        this.money--;
        if (this.cleanness > 3)
            this.cleanness = 3;
        else
            this.cleanness = 0;
        return {
            work: true,
            message: 'Playing football with my friends'
        };
        /*}*/
    };
    /* Sleep */
    Tamagotchi.prototype.sleep = function () {
        this.health += 15;
        return {
            sleep: true,
            message: 'Yes, I am going to sleep a little'
        };
    };
    /* Go to cinema */
    Tamagotchi.prototype.goCinema = function () {
        this.happiness += 4;
        this.money -= 2;
        this.cleanness--;
        return {
            goCinema: true,
            message: 'Yeah, I am going to watch a nice movie!'
        };
    };
    /* Check for the promote level, depending on the work level */
    Tamagotchi.prototype.promote = function () {
        var oldPromoteLevel = this.promoteLevel;
        if (this.workLevel == 0)
            this.promoteLevel = "Unemployed";
        else {
            if ((this.workLevel > 0) && (this.workLevel < 50))
                this.promoteLevel = "Laborer";
            else {
                if ((this.workLevel >= 51) && (this.workLevel < 200))
                    this.promoteLevel = "Chief";
                else
                    this.promoteLevel = "Director";
            }
        }
        if (this.promoteLevel != oldPromoteLevel)
            return {
                hasNewPromoteLevel: true,
                message: 'You are now ' + this.promoteLevel
            };
        else
            return {
                hasNewPromoteLevel: false,
                message: ''
            };
    };
    /* Auto modifications for some features */
    /* Loose some health */
    Tamagotchi.prototype.looseHealth = function (value, isIncrement) {
        if (isIncrement == true)
            this.health += value;
        else
            this.health = value;
    };
    return Tamagotchi;
}());
