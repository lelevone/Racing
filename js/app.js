const score = document.querySelector('.score'),
    gameArea = document.querySelector('.gameArea'),
    start = document.querySelector('.start'),
    car = document.createElement('div')
;

car.classList.add('car');
console.log()
const keys = {
    ArrowUp : false,
    ArrowDown : false,
    ArrowRight : false,
    ArrowLeft : false
};

const setting = {
    start: false,
    score : 0,
    speed : 3,
    traffic: 1.8
}

function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight/heightElement + 1;
}

function startGame(){
    start.classList.add('hide');
    car.style.left = '125px';
    car.style.top = 'auto';
    gameArea.classList.remove('hide');
    gameArea.innerHTML = '';
    gameArea.classList.remove('hide');
    for (let i = 0; i < getQuantityElements(50); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }
    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i+1);
        enemy.style.background = `url('./img/enemy${Math.floor(Math.random()*3 + 1)}.png') center/cover no-repeat`;
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        gameArea.appendChild(enemy);
    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    console.log(setting.x);
    requestAnimationFrame(playGame);
}

function playGame(){
    if (setting.start) {
        setting.score += Math.ceil(setting.speed/10);
        score.textContent = setting.score;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < 250) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.clientHeight-105)){
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
}

function startRun(event){
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}


function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    })
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy .forEach((item) => {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom &&
        carRect.right >= enemyRect.left &&
        carRect.left <= enemyRect.right &&
        carRect.bottom >= enemyRect.top){
            setting.start = false;
            gameArea.classList.add('hide');
            start.innerHTML = `
            <span>Repeat game</span>
            <div>Score : ${score.textContent}<div/>
            `
            start.classList.remove('hide');
        }

       item.y += setting.speed/2;
       item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}

start.addEventListener('click',startGame);
document.addEventListener('keydown',startRun);
document.addEventListener('keyup',stopRun);


