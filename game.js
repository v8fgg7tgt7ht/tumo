

function setup() {
    createCanvas(500, 500);
    Game.addCommonBalloon()
}

function draw() {

    background('skyblue')

    for (let balloon of Game.balloons) {

        balloon.display()
        balloon.move(Game.score);

        if (balloon.y <= balloon.size / 2 && balloon.color != 'black') {
            gameOver()
            clearInterval(interval)


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
        interval = setInterval(() => {
            Game.sendstatistics()
        }, 5000);
    }


    Game.checkIfBalloonBurst()
}



let interval = setInterval(() => {
    Game.sendstatistics()
}, 5000);

class Game {

    static highScores = []
    static balloons = []
    static commonBurst = 0
    static uniqBurst = 0
    static angryBurst = 0
    static commonBurst = 0
    static score = 0


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

    static sendstatistics() {
        let statistics = {
            commonBurst: this.commonBurst,
            uniqBurst: this.uniqBurst,
            angryBurst: this.angryBurst,
            score: this.score
        }
        fetch('/statistics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statistics)
        });
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
        Game.commonBurst += 1
    }
}

class UniqBalloon extends CommonBalloon {
    constructor(color, size) {
        super(color, size)
    }

    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score += 10
        Game.uniqBurst += 1
    }
}

class AngryBalloon extends CommonBalloon {
    constructor(color, size) {
        super(color, size)
    }

    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score -= 10
        Game.angryBurst += 1
    }
}
