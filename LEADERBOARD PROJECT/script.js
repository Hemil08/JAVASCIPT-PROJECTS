document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = e.target.children[0].value,
        // console.log(e.target);
        lastName = e.target.children[1].value,
        country = e.target.children[2].value,
        score = e.target.children[3].value;

    errorPrompter = document.querySelector(".main_error-prompter")

    if (firstName === '' || lastName === '' || country === '' || score === '') {

        return (errorPrompter.style.display = "block");
    }

    const scoreboardContainer = document.querySelector(".main_scoreboard-wrapper")

    const scoreboardElement = document.createElement("div");

    scoreboardElement.classList.add("main_scoreboard");

    scoreboardElement.innerHTML = `
        <div>
                <p class="main_player-name">${firstName} ${lastName}</p>
                <p class="main_time-stamp">${generateDateandTime()}</p>
        </div>

            <p class="main_player-country">${country}</p>
            <p class="main-player-score">${score}</p>

            <div class="main_scoreboard-btn-container">
                <button>&#x1f5d1;</button>
                <button>+5</button>
                <button>-5</button>
            </div>
        `

        scoreboardContainer.appendChild(scoreboardElement);

        sortScoreBoard()
        activateBtnEventListener()
})  

function activateBtnEventListener(){
    document.querySelectorAll(".main_scoreboard-btn-container").forEach((el) => {
        el.addEventListener("click",(e) =>{
            let textContent = e.target.textContent;
            // console.log(textContent);
            let scorePlayer = e.target.parentElement.
            parentElement.children[2];

            if(textContent.length > 2) return;

            if (textContent === '🗑')
            return e.target.parentElement.parentElement.remove();

            scorePlayer.textContent = parseInt(scorePlayer.textContent) + parseInt(textContent)

            sortScoreBoard()
        });
    });
}



function sortScoreBoard(){
    let scoreboardContainer = document.querySelector(".main_scoreboard-wrapper");

    let scoreBoards = document.querySelectorAll(".main_scoreboard");

    let elementsInArray = [];

    scoreBoards.forEach( (el) => elementsInArray.push(el))

    let sortedElemets = elementsInArray.map((el) =>{
        return el;
    })
    .sort((a,b)=>{
        let numA = parseInt(a.children[2].textContent),
        numB = parseInt(b.children[2].textContent)

        if(numA > numB) return -1;
        if(numA < numB) return 1;
    });

    sortedElemets.forEach( (el)=>{
        scoreboardContainer.append(el);
    })
}

function generateDateandTime(){
    let dateObject = new Date();
    let month = dateObject.toLocaleString("default",{month:"long"})

    // console.log(month);
    day = dateObject.getDate(),
    year = dateObject.getFullYear(),
    time = dateObject.toLocaleTimeString().slice(0,7)
    
    let generateResult = `${month} ${day}, ${year} ${time}`;

    return generateResult;
}
