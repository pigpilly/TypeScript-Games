"use strict";
window.addEventListener("load", function () {
    //Game width & height
    const GAMW_WIDTH = 640;
    const GAME_HEIGHT = 360;
    //Keep the game going
    let gameLive = true;
    //Current level & life
    let level = 1;
    let life = 5;
    //Random color picker
    let color = `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;
    //Enemy object
    let enemies = [
        {
            x: 100,
            y: 100,
            speedY: 2,
            w: 40,
            h: 40,
        },
        {
            x: 200,
            y: 0,
            speedY: 2,
            w: 40,
            h: 40,
        },
        {
            x: 330,
            y: 100,
            speedY: 3,
            w: 40,
            h: 40,
        },
        {
            x: 450,
            y: 100,
            speedY: -3,
            w: 40,
            h: 40,
        },
    ];
    //Player object
    let player = {
        x: 10,
        y: 160,
        speedX: 2,
        w: 40,
        h: 40,
        isMoving: false,
    };
    let goal = {
        x: 580,
        y: 160,
        w: 50,
        h: 36,
    };
    let sprites = {};
    //Grabbing the Canvas element & getting Context
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    //function to move the player
    function movePlayer() {
        player.isMoving = true;
    }
    //Function to stop the player
    function stopPlayer() {
        player.isMoving = false;
    }
    //Updating the position
    function update() {
        //Check for wiin
        if (checkCollision(player, goal)) {
            alert("Win!");
            //Increase life, level & speed
            level += 1;
            life += 1;
            player.speedX += 1;
            //Resetting the players position
            player.x = 10;
            player.y = 160;
            player.isMoving = false;
            //Resetting the enemies
            enemies.forEach((enemy) => {
                if (enemy.speedY > 1) {
                    enemy.speedY += 1;
                }
                else {
                    enemy.speedY -= 1;
                }
            });
        }
        //Update the players position after movement
        if (player.isMoving) {
            player.x = player.x + player.speedX;
        }
        //Updating enemies position
        enemies.forEach(function (element, index) {
            //Checking for Collision with enemy
            if (checkCollision(player, element)) {
                //Check for game over
                if (life === 0) {
                    alert("Game Over!");
                    //Resetting enemies
                    enemies.forEach((enemy) => {
                        if (enemy.speedY > 1) {
                            enemy.speedY -= level - 1;
                        }
                        else {
                            enemy.speedY += level - 1;
                        }
                    });
                    //Resetting level, life & player speed
                    level = 1;
                    life = 6;
                    player.speedX = 2;
                    color = `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;
                }
                //Decrease life if Game isn't over
                if (life > 0) {
                    life -= 1;
                    color = `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;
                }
                //Resetting players position
                player.x = 10;
                player.y = 160;
                player.isMoving = false;
            }
            //Moving the enemy
            element.y += element.speedY;
            //Check for borders
            if (element.y <= 10) {
                element.y = 10;
                element.speedY *= -1;
            }
            else if (element.y >= GAME_HEIGHT - 50) {
                element.y = GAME_HEIGHT - 50;
                element.speedY *= -1;
            }
        });
    }
    //Drawing the Canvas
    function draw() {
        //Clearing the canvas
        ctx?.clearRect(0, 0, GAMW_WIDTH, GAME_HEIGHT);
        //Game info
        ctx.font = "16px Montserrat";
        ctx.fillStyle = "rgb(240, 240, 255)";
        ctx.fillText(`Level: ${level}`, 10, 15);
        ctx.fillText(`Life: ${life}`, 10, 35);
        ctx.fillText(`Speed: ${player.speedX}`, 10, 55);
        //Player with Random color
        ctx.fillStyle = color;
        ctx.fillRect(player.x, player.y, player.w, player.h);
        //Enemies
        ctx.fillStyle = "rgb(255, 120, 70)";
        enemies.forEach((enemy) => {
            ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
        });
        //GOAL
        ctx.fillStyle = "rgb(0, 255, 120)";
        ctx.fillRect(goal.x, goal.y, goal.w, goal.h);
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText("Goal", goal.x + 7, goal.y + 25);
    }
    //Executes multiple times per second
    function step() {
        update();
        draw();
        if (gameLive) {
            window.requestAnimationFrame(step);
        }
    }
    //Fucntion to check collision
    function checkCollision(rect1, rect2) {
        const closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
        const closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
        return closeOnWidth && closeOnHeight;
    }
    //Event listeners to move player
    canvas?.addEventListener("mousedown", movePlayer);
    canvas?.addEventListener("mouseup", stopPlayer);
    canvas?.addEventListener("touchstart", movePlayer);
    canvas?.addEventListener("touchend", stopPlayer);
    //Initial starting point
    step();
    console.log(gameLive);
});
//# sourceMappingURL=movingGame.js.map