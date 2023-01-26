function setup() {
    createCanvas(500, 500);
    Game.addCommonBalloon()
}

function draw() {
    function gameOver() {
        noLoop()
        Game.balloons.length = 0;
        background(136, 220, 166)
        let finalScore = Game.score
        let a = finalScore
        Game.scoreList.push(a)
        Game.score = ''
        textSize(64)
        fill('white')
        textAlign(CENTER, CENTER)
        text('Finish', 200, 200)
        textSize(34)
        text('Score: ' + finalScore, 200, 300)
        background('skyblue')
    }

    for (let balloon of Game.balloons) {

        balloon.display()
        balloon.move(Game.score);

        if (balloon.y <= balloon.size / 2 && balloon.color != 'black') {

            let Prompt = prompt("choose 1 or 2")
            if (Prompt === "1") {
                console.log("You've chosen 1");
            }

            let randomNum = Math.random();



            if (randomNum < 0.5) {
                randomNum = "1";
            } else {
                randomNum = "2";
            }

            console.log("random number is " + randomNum + ".");

            if (Prompt === randomNum) {
                console.log('You win');
                Game.balloons.length = 0
                continue

            } else {

                console.log('You lose');
                gameOver()

            }
        }
    }

    textSize(32)
    fill('black')
    text(Game.score, 20, 40)

    if (frameCount % 50 === 0) {
        Game.addCommonBalloon()
    }
    if (frameCount % 100 === 0) {
        Game.addUniqBalloon()
    }
    if (frameCount % 120 === 0) {
        Game.addAngryBalloon()
    }
}

function mousePressed() {
    if (!isLooping()) {
        loop()
        Game.score = 0;
    }
    Game.checkIfBalloonBurst()
}

class Game {

    static scoreList = []
    static balloons = []
    static score = 0;


    static addCommonBalloon() {
        let commonBalloon = new CommonBalloon('blue', 50)
        this.balloons.push(commonBalloon)
    }

    static addUniqBalloon() {
        let uniqBalloon = new UniqBalloon('green', 30)
        this.balloons.push(uniqBalloon)
    }

    static addAngryBalloon() {
        let angryBalloon = new AngryBalloon('black', 50)
        this.balloons.push(angryBalloon)
    }


    static checkIfBalloonBurst() {
        this.balloons.forEach((balloon, index) => {
            let distance = dist(balloon.x, balloon.y, mouseX, mouseY)
            if (distance <= balloon.size / 2) {
                balloon.burst(index)
            }

        }
        )
    }
}

class CommonBalloon {
    constructor(color, size) {
        this.x = random(width)
        this.y = random(height - 10, height + 50)
        this.color = color;
        this.size = size;
    }
    display() {
        fill(this.color);
        ellipse(this.x, this.y, this.size)
        line(this.x, this.y + this.size / 2, this.x, this.y + 2 * this.size)
    }

    move(score) {
        if (score < 100) {
            this.y -= 1
        } else if (score >= 100 && score <= 200) {
            this.y -= 1.5
        } else {
            this.y -= 2
        }
    }


    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score += 1
    }
}

class UniqBalloon extends CommonBalloon {
    constructor(color, size) {
        super(color, size)
    }

    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score += 10
    }
}

class AngryBalloon extends CommonBalloon {
    constructor(color, size) {
        super(color, size)
    }

    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score -= 10
    }
}

