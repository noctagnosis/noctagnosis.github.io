const clickSound = new Audio("audio/click.mp3");
clickSound.volume = 0.7;
const flapSound = new Audio("audio/flap.mp3");
flapSound.volume = 0.7;
const lossSound = new Audio("audio/loss.mp3");
lossSound.volume = 0.7;

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
	clickSound.currentTime = 0; // rewind so rapid clicks retrigger it
	clickSound.play();
});
page2btn.addEventListener("click", function () {
	show(2);
	clickSound.currentTime = 0; // rewind so rapid clicks retrigger it
	clickSound.play();
});
page3btn.addEventListener("click", function () {
	show(3);
	clickSound.currentTime = 0; // rewind so rapid clicks retrigger it
	clickSound.play();
});
page4btn.addEventListener("click", function () {
	show(4);
	clickSound.currentTime = 0; // rewind so rapid clicks retrigger it
	clickSound.play();
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
	lossSound.currentTime = 0;
	lossSound.play();
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

    if(Owl.classList.contains("animateJ")){ return; }
    Owl.classList.add("animateJ");
	flapSound.currentTime = 0;
	flapSound.play();
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

document.querySelectorAll(".card-contain").forEach(function(cardContain) {
	cardContain.addEventListener("click", function() {
		const card = cardContain.querySelector(".card");
		card.classList.toggle("flipped");
		clickSound.currentTime = 0; // rewind so rapid clicks retrigger it
		clickSound.play();
	});
});

const owlFamilies = [
    {
        image: "photos/family1.jpg",
        title: "Strigidae",
        body: "Strigidae, commonly known as the 'true owls' or 'typical owls,' is by far the largest owl family, containing more than 220 recognized species spread across every continent except Antarctica. Members of this family are defined by a rounded, often symmetrical facial disc, large forward-facing eyes, and ear openings positioned roughly level with one another — a key difference from the asymmetrical hearing setup found in barn owls. This family includes some of the most familiar owl species in the world, from the tiny elf owl, barely larger than a sparrow, to the powerful great horned owl and the striking snowy owl of the Arctic tundra.\n\nBecause Strigidae is so large and diverse, its members occupy an enormous range of habitats and hunting styles. Some, like the burrowing owl, nest underground and hunt during daylight hours, while others, like the screech owls, are strictly nocturnal forest dwellers. This adaptability across climates, habitats, and hunting strategies is a major reason the true owls have become the most successful and widespread owl family on Earth."
    },
    {
        image: "photos/family2.png",
        title: "Tytonidae",
        body: "The barn owl family is far smaller than Strigidae, containing roughly 20 species, but is instantly recognizable thanks to its heart-shaped facial disc, long legs, and pale, ghostly plumage. This distinctive facial shape isn't just for appearance — it acts as an especially efficient sound-collecting dish, funneling faint noises toward the owl's asymmetrically placed ears with remarkable precision. As a result, barn owls are considered among the most skilled nocturnal hunters of any bird, capable of catching small mammals in complete darkness using hearing alone.\n\nBarn owls are also among the most globally distributed birds of prey, found on every continent except Antarctica, and are unusually comfortable living close to humans. They frequently nest in barns, church towers, and abandoned buildings, earning them their common name, and their presence has long been valued by farmers for their ability to control rodent populations without any pesticides."
    },
    {
        image: "photos/family3.jpg",
        title: "Bubo",
        body: "Bubo is a genus within the Strigidae family that contains some of the largest and most powerful owls in the world, including the Eurasian eagle-owl, the great horned owl, and the snowy owl. Species in this genus are built for strength as much as stealth, with wingspans that can exceed five feet and talons strong enough to take down prey far larger than a typical owl's diet, including hares, foxes, and even other birds of prey.\n\nDespite their size, Bubo owls retain the same silent-flight adaptations found throughout the owl order, allowing these large, powerful hunters to approach prey with almost no warning. Many species in this genus sit at or near the top of their local food chain, with few natural predators once they reach adulthood, and they are often considered the apex nocturnal predators within their ecosystems."
    },
    {
        image: "photos/family4.jpg",
        title: "Athene",
        body: "Athene is a genus of small, compact owls best known for the burrowing owl, one of the only owl species that nests and roosts underground rather than in trees or cliffs. Instead of digging their own burrows, they typically move into abandoned tunnels dug by prairie dogs, ground squirrels, or tortoises, adapting an existing structure to suit their needs. This ground-dwelling lifestyle also makes them unusually active during the day compared to most owls, which are strictly nocturnal.\n\nMembers of this genus are found across open grasslands, deserts, and agricultural land, where their long legs — noticeably longer relative to body size than most other owls — help them run and maneuver on the ground while hunting insects and small rodents. Their willingness to nest at ground level also makes them more vulnerable to habitat disruption, and burrowing owl populations have declined in some regions due to the loss of open grassland and the mammal burrows they depend on."
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
		clickSound.currentTime = 0; // rewind so rapid clicks retrigger it
		clickSound.play();
    }
});

familyNextBtn.addEventListener("click", function() {
    if (familyIndex < owlFamilies.length - 1) {
        familyIndex++;
        renderFamilySlide(familyIndex);
		clickSound.currentTime = 0; // rewind so rapid clicks retrigger it
		clickSound.play();
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