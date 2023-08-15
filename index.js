const canvas = document.getElementById('gameCanvas');
const awal = document.getElementById("start")
    const gambar = canvas.getContext('2d');
    let isGameStarted = false;

    const orang = {
        x: 102,
        y: canvas.height / 1.5,
        width: 50,
        height: 50,
        velocity: 0,
        gravity: 0.6,
        jump: -3
      };

      const lawanku = {
        x: 500,
        y: canvas.height / 1.5,
        width: 50,
        height: 50,
        velocity: 0,
        gravity: 0,
        jump: -3
      };


    function mulaiGame(){
        // mulai game  
        function startGame() {
        isGameStarted = true;
        canvas.style.display = "block";
        start.style.display = "none";
        // menjalankan permainan
        if (isGameStarted) {
            gambar.clearRect(0, 0, canvas.width, canvas.height);
            gambarOrang();
            gameLoop();  
        }
    }

    let rudiImg = new Image();
    rudiImg.src = "lawan.png";


    let birdImg = new Image();
    birdImg.src = "manjat.png";

    var backgroundImage = new Image();
    backgroundImage.src = "bg.jpg"

    birdImg.onload = function() {
        gambar.drawImage(birdImg, orang.x, orang.y, orang.width, orang.height);
    }
    rudiImg.onload = function() {
        gambar.drawImage(rudiImg, lawanku.x, lawanku.y, lawanku.width, lawanku.height);
    }


    backgroundImage.onload = function() {
        gambar.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }


    function gambarOrang() {
        
        gambar.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        gambar.drawImage(birdImg, orang.x, orang.y, orang.width, orang.height);
        gambar.drawImage(rudiImg, lawanku.x, lawanku.y, lawanku.width, lawanku.height);
    }

    function update() {
        orang.velocity += orang.gravity;
        orang.y += orang.velocity;
    
        if (orang.y + orang.height >= canvas.height) {
        orang.y = canvas.height - orang.height;
        orang.velocity = 0;
        }
    
        if (orang.y - orang.height <= 0) {
        orang.y = orang.height;
        orang.velocity = 0;
        }

        // lawan
        lawanku.velocity += lawanku.gravity;
        lawanku.y += lawanku.velocity;
    
        if (lawanku.y + lawanku.height >= canvas.height) {
        lawanku.y = canvas.height - lawanku.height;
        lawanku.velocity = 0;
        }
    
        if (lawanku.y - lawanku.height <= 0) {
        lawanku.y = lawanku.height;
        lawanku.velocity = 0;
        }
    
    }

    function checkCollision() {
        if (orang.y + orang.height >= canvas.height || lawanku.y - lawanku.height <= 0) {
            isGameStarted= false
            gameOver();
        }else if( orang.y - orang.height <= 0) {
            menang()
        }
    }

    function gameOver() {
        alert("kalah! Kalo arahnya keatas jangan tekan space dong")
        restart();
    }
    function restart(){
        orang.y = canvas.height / 1.5
        lawanku.y = canvas.height / 1.5
        velocity = 0;
    }

    function menang() {
        alert('yeyyyyy kamu menang');
        restart();
    }
  
    function gameLoop() {
        gambar.drawImage(birdImg, orang.x, orang.y, orang.width, orang.height);
        gambar.drawImage(rudiImg, lawanku.x, lawanku.y, lawanku.width, lawanku.height);
        gambar.clearRect(0, 0, canvas.width, canvas.height);
        update();
        gambarOrang();
        checkCollision();
        requestAnimationFrame(gameLoop);
        
    }

    let isJumping = false;
    
    document.addEventListener('keydown', function(event) {
        if (event.code == 'Space' && !isJumping) {
        orang.velocity = orang.jump;
        lawanku.velocity = -1;
        isJumping = true;
        
        } 
        if (event.code == 'ArrowUp') {
        orang.velocity = -5;
        lawanku.velocity = -1;
        } 
    });

    document.addEventListener('keyup', function(event) {
        if (event.code === 'Space') {
            isJumping = false;
        }
    });
    document.addEventListener("click", startGame);
}

mulaiGame();





// aksi Ngobrol



