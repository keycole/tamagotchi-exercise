const inquirer = require('inquirer');

//DigitalPal Class
class DigitalPal {
    constructor(hungry, sleepy, bored, age, outside, houseCondition) {
        this.hungry = false;
        this.sleepy = false;
        this.bored = true;
        this.age = 0;
        this.outside = false;
        this.houseCondition = 100;
        this.feed = function () {
            if (this.hungry) {
                console.log('That was yummy');
                this.hungry = false;
                this.sleepy = true;
            } else {
                console.log('No thanks! I\'m full.');
            }
        };
        this.sleep = function () {
            if (this.sleepy) {
                console.log('Zzzzzzzz');
                this.sleepy = false;
                this.bored = true;
                this.increaseAge(this.age);
            } else {
                console.log('No way! I\'m not tired.');
            }
        };
        this.play = function () {
            if (this.bored) {
                console.log('Yay! Let\'s play!');
                this.bored = false;
                this.hungry = true;
            } else {
                console.log('Not right now. Later?');
            }
        };
        this.increaseAge = function () {
            this.age += 1;
            console.log('Happy Birthday  to me! I am ' + this.age + ' old!');
        };
        this.bark = function () {
            console.log('Woof! Woof!');
        };
        this.goOutside = function () {
            if (this.outside) {
                console.log('We\'re already outside though...');
            } else {
                console.log('Yay! I love the outdoors!');
                this.outside = true;
                this.bark();
            }
        };
        this.goInside = function () {
            if (this.outside) {
                console.log('Do we have to? Fine...');
                this.outside = false;
            } else {
                console.log('I\'m already inside.');
            }
        };
        this.meow = function () {
            console.log('Meow! Meow!')
        };
        this.destroyFurniture = function () {
            if (this.houseCondition > 0) {
                this.houseCondition -= 10;
                console.log('MUAHAHAHAHA! TAKE THAT FURNITURE!');
                console.log('House Condition = ', this.houseCondition);
                this.bored = false;
            }
        };
        this.buyNewFurniture = function () {
            this.houseCondition += 10;
            console.log('Are you sure about that?');
            console.log('House condition = ', this.houseCondition);
        };
    }
};

//Animal Constructors
const dog = new DigitalPal();
const cat = new DigitalPal();

//User Questions to allow for interaction via the console
const userQuestions = function () {
    inquirer.prompt([
        {
            type: "rawlist",
            name: "animalInput",
            message: "What animal would you like to play with?",
            choices: [
                "dog",
                "cat"
            ]
        },
        {
            type: "rawlist",
            name: "actionInput",
            message: "What action would you like to take for your animal?",
            choices: [
                "feed",
                "sleep",
                "play",
                "go outside",
                "go inside",
                "destroy furniture",
                "buy new furniture"
            ]
        },
        {
            type: "confirm",
            name: "replay",
            message: "Would you like to play again after this turn?",
            default: false
        }

    ]).then(answers => {
        animalFunction(answers);
        //If the user wants to play again, the questions function is run again
        if(answers.replay===true){
            userQuestions();
        }
    }).catch(error => {
        if (err) {
            throw err;
        }
    })
};

///Call function based on user input
const animalFunction = function (answers) {
    if (answers.animalInput === "cat") {
        if (answers.actionInput === "feed") {
            return cat.feed();
        } else if (answers.actionInput === "sleep") {
            return cat.sleep();
        } else if (answers.actionInput === "play") {
            return cat.play();
        } else if (answers.actionInput === "go outside") {
            return cat.goOutside();
        } else if (answers.actionInput === "go inside") {
            return cat.goInside();
        } else if (answers.actionInput === "destroy furniture") {
            return cat.destroyFurniture();
        } else {
            return cat.buyNewFurniture();
        }
    } else {
        if (answers.actionInput === "feed") {
            return dog.feed();
        } else if (answers.actionInput === "sleep") {
            return dog.sleep();
        } else if (answers.actionInput === "play") {
            return dog.play();
        } else if (answers.actionInput === "go outside") {
            return dog.goOutside();
        } else if (answers.actionInput === "go inside") {
            return dog.goInside();
        } else if (answers.actionInput === "destroy furniture") {
            return dog.destroyFurniture();
        } else {
            return dog.buyNewFurniture();
        }
    }
};
//First call for userQuestions
userQuestions();