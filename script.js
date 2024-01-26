var canvas = document.getElementById('monCanvas');
var ctx = canvas.getContext('2d');

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

/* ----------------- dessin raquette -------------------- */

var raquette1 = {
    width : 100,
    height : 10,
    x : (canvas.width / 2.5),
    y : (canvas.height - 40),
    speed :5,
    speedY : 0,
    maxSpeed : 2,
    }

    // sans la fonction et sans fillRect. la raquette n'apparait pas.
    function dessinerRaquette() {
        ctx.fillStyle = 'black'; // Choisissez la couleur de remplissage
        ctx.fillRect(raquette1.x, raquette1.y, raquette1.width, raquette1.height);
    }

   // dessinerRaquette();

    /* --------------------- dessin balle------------------ */

    var balle = {
        width : 10,
        height :10,
        x : 350,
        y: (canvas.height - 50),
        vx : 4, // vitesse initiale sur l'axe x
        vy : - 4, // vitesse initiale sur l'axe y
        speedMax : 5 // vitesse maximale de la balle pour l'impact sur la raquette
    }
    
    function dessinerBalle(){
        ctx.fillStyle = 'balle';
        ctx.fillRect(balle.x, balle.y, balle.width, balle.height);
    
    }

    function updateBalle() {
        // Mise à jour de la position de la balle
        balle.x += balle.vx;
        balle.y += balle.vy;
    
        /* Détection des collisions avec les bords du canvas, balle.y < 0 verifie le haut du canvas 
        balle.y + balle.height > canvas.height*/
        if ( balle.y < 0) {
            balle.vy *= -1; // Inverser la vitesse verticale
        }
        if (balle.x + balle.width > canvas.width || balle.x < 0) {
            balle.vx *= -1; // Inverser la vitesse horizontale
        }
        if (balle.x > raquette1.x && 
            balle.x < raquette1.x + raquette1.width &&
            balle.y + balle.height > raquette1.y &&
            balle.y < raquette1.y + raquette1.height) {
            
            balle.vy = -balle.vy; // Inverser la direction verticale de la balle
            }

    }
    
    

   /* ---------------------------------------------------------------------------------------------*/

let isMovingLeft = false;
let isMovingRight = false;

function keyDownHandler(e) {
    console.log(e.key);
    if (e.key == "ArrowLeft") {
        isMovingLeft = true;
    } else if (e.key == "ArrowRight") {
        isMovingRight = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "ArrowLeft") {
        isMovingLeft = false;
    } else if (e.key == "ArrowRight") {
        isMovingRight = false;
    }
}

 // Update the game state  si tu ne fais pas un gameLoop et que tu redesinne pas la raquette. Les mouvements de la raquette de gauche a droite ne se verront pas.
 function updateGame() {
    if (isMovingLeft && raquette1.x > 0) {
     raquette1.speedX = -1;
    raquette1.x -= raquette1.speed;
     }
    if (isMovingRight && raquette1.x < canvas.width - raquette1.width) {
    raquette1.speedX = 1;
     raquette1.x += raquette1.speed;
     }
    }

    

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas est très important
        updateGame(); // Met à jour la position de la raquette
        dessinerRaquette(); // Redessine la raquette
        dessinerBalle();
        updateBalle() 
    
        requestAnimationFrame(gameLoop); // Appelle gameLoop à chaque frame
    }
    
    gameLoop(); // Commence la boucle de jeu
    