//target all elements to save to constants
const page1btn=document.querySelector("#page1-btn");
const page2btn=document.querySelector("#page2-btn");
const page3btn=document.querySelector("#page3-btn");
const page4btn=document.querySelector("#page4-btn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
function hideall(){ //function to hide all pages
	for(let onepage of allpages){ //go through all subtopic pages
		onepage.style.display="none"; //hide it
}
}
function show(pgno){ //function to show selected page no
	hideall();
	//select the page based on the parameter passed in
	let onepage=document.querySelector("#page"+pgno);
	onepage.style.display="block"; //show the page
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
	show(1);
});
page2btn.addEventListener("click", function () {
	show(2);
});
page3btn.addEventListener("click", function () {
	show(3);
});
page4btn.addEventListener("click", function () {
	show(4);
});
hideall();
show(1);


function createSpriteAnimator({ element, frameWidth, frameHeight, frameCount, fps }) {
  let currentFrame = 0;
  let lastTime = 0;
  const frameInterval = 1000 / fps;

  function animate(timestamp) {
    if (timestamp - lastTime >= frameInterval) {
      const x = -(currentFrame * frameWidth);
      element.style.backgroundPosition = `${x}px 0`;
      currentFrame = (currentFrame + 1) % frameCount;
      lastTime = timestamp;
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

createSpriteAnimator({
  element: document.getElementById('owl-sprite'),
  frameWidth: 150,
  frameHeight: 108,
  frameCount: 6,
  fps: 10
});

createSpriteAnimator({
  element: document.getElementById('bird-sprite'),
  frameWidth: 48,
  frameHeight: 48,
  frameCount: 6,
  fps: 10
});

var Owl = document.getElementById("owl-sprite");
var tree = document.getElementById("tree-sprite");
var bird = document.getElementById("bird-sprite");
var startScreen = document.getElementById("startScreen");
var gameOverScreen = document.getElementById("gameOverScreen");
var finalScoreSpan = document.getElementById("finalScore");
var playBtn = document.getElementById("playBtn");
var restartBtn = document.getElementById("restartBtn");

var counter = 1;
var speedIncrease = 0.1;
var baseDuration = 3;
var minDuration = 1; 
var V = 3;
var checkDead = null;
var gameRunning = false;
var lastScore = 0;

function startGame() {
    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    counter = 1;
    lastScore = 0;
    document.getElementById("scoreSpan").innerHTML = 0;
    tree.style.animation = "obstacle 3s infinite linear 1.5s";
    bird.style.animation = "obstacle 3s infinite linear";
    gameRunning = true;
}

function endGame() {
    gameRunning = false;
    tree.style.animation = "none";
    bird.style.animation = "none";
    clearInterval(checkDead);
    checkDead = null;

    finalScoreSpan.innerHTML = Math.floor(counter / 100);
    gameOverScreen.classList.remove("hidden");
    counter = 0;
}

function updateSpeed(score) {
    // duration shrinks as score grows, but never below minDuration
    let duration = Math.max(minDuration, baseDuration - score * speedIncrease * 0.1);
    tree.style.animationDuration = duration + "s";
    bird.style.animationDuration = duration + "s";
}

playBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);

function jump(){
    if (!gameRunning) return;

    if(Owl.classList.contains("animateJ")){ return }
    Owl.classList.add("animateJ");
    setTimeout(function(){
        Owl.classList.remove("animateJ");
    }, 1000);

    if(checkDead) return;
    checkDead = setInterval(function() {
        let OwlTop = parseInt(window.getComputedStyle(Owl).getPropertyValue("top"));
        let treeLeft = parseInt(window.getComputedStyle(tree).getPropertyValue("left"));
        let birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));

        if((treeLeft < 40 && treeLeft > -20 && OwlTop >= 250) || (birdLeft < 40 && birdLeft > -20 && OwlTop >= 250)){
            endGame();
        } else {
            counter++;
            let score = Math.floor(counter / 100);
            document.getElementById("scoreSpan").innerHTML = score;

            if (score !== lastScore) {
                lastScore = score;
                updateSpeed(score);
            }
        }
    }, 14);
}

const owlFamilies = [
    {
        image: "photos/mouse.png",
        title: "Strigidae",
        body: "The true owls the largest owl family, including species like the great horned owl and the snowy owl."
    },
    {
        image: "photos/family2.png",
        title: "Tytonidae",
        body: "The barn owls — recognizable by their heart-shaped facial disc, found on nearly every continent."
    },
    {
        image: "photos/family3.png",
        title: "Bubo",
        body: "A genus within Strigidae containing the largest owls, including eagle-owls known for their powerful build."
    },
    {
        image: "photos/family4.png",
        title: "Athene",
        body: "A genus of small owls including the burrowing owl, known for nesting in underground burrows."
    }
];

let familyIndex = 0;

const familySlideImage = document.getElementById("familySlideImage");
const familySlideTitle = document.getElementById("familySlideTitle");
const familySlideBody = document.getElementById("familySlideBody");
const familySlideText = document.querySelector(".family-slide-text");
const familyPrevBtn = document.getElementById("familyPrevBtn");
const familyNextBtn = document.getElementById("familyNextBtn");
const familyDotsContainer = document.getElementById("familyDots");

owlFamilies.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    familyDotsContainer.appendChild(dot);
});

function renderFamilySlide(index) {
    const slide = owlFamilies[index];

    familySlideImage.classList.add("fade-out");
    familySlideText.classList.add("fade-out");

    setTimeout(function() {
        familySlideImage.src = slide.image;
        familySlideTitle.textContent = slide.title;
        familySlideBody.textContent = slide.body;

        familySlideImage.classList.remove("fade-out");
        familySlideText.classList.remove("fade-out");
    }, 300);

    document.querySelectorAll("#familyDots .dot").forEach(function(dot, i) {
        dot.classList.toggle("active", i === index);
    });

    familyPrevBtn.disabled = index === 0;
    familyNextBtn.disabled = index === owlFamilies.length - 1;
}

familyPrevBtn.addEventListener("click", function() {
    if (familyIndex > 0) {
        familyIndex--;
        renderFamilySlide(familyIndex);
    }
});

familyNextBtn.addEventListener("click", function() {
    if (familyIndex < owlFamilies.length - 1) {
        familyIndex++;
        renderFamilySlide(familyIndex);
    }
});

renderFamilySlide(familyIndex);

const btnSubmit=document.querySelector("#btnSubmit");  
const scorebox=document.querySelector("#scorebox");
var q1,q2,q3,q4,q5,q6,score=0;
function CheckAns(){    
    //read the value of the selected radio button for q1
    q1=document.querySelector("input[name='q1']:checked").value;
    console.log(q1); 
    q2=document.querySelector("input[name='q2']:checked").value;
    console.log(q2); 
	q3=document.querySelector("input[name='q3']:checked").value;
    console.log(q3);
	q4=document.querySelector("input[name='q4']:checked").value;
    console.log(q4);
	q5=document.querySelector("input[name='q5']:checked").value;
    console.log(q5);
	q6=document.querySelector("input[name='q6']:checked").value;
    console.log(q6);
    score=0; 
    if(q1=="ans")score++;
    if(q2=="ans")score++;
	if(q3=="ans")score++;
	if(q4=="ans")score++;
	if(q5=="ans")score++;
	if(q6=="ans")score++;
    scorebox.innerHTML="Score:"+score;
}
btnSubmit.addEventListener("click",CheckAns);