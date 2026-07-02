 let count = document.getElementById("count");
    let focus = document.getElementById("focus");
    let rest = document.getElementById("rest");
    let timer = document.getElementById("timer");
    let resetbtn = document.getElementById("reset");
    let play = document.getElementById("play");
    let msg = document.getElementById("msg");
    let interval = null;
    let currentMode = "focus";
    let pomodoroCount = 0;

    let timeleft = 1500;
    updateTimerDisplay();
    focus.classList.add("active");
    //convert seconds to string and add zeros to make length 2, if already 2 then do nothing
    //eg if seconds = 5 -> 05 but its its 15 then do nothing coz already its length is 2

    focus.addEventListener("click", function(){
        currentMode = "focus";
        focus.classList.add("active");
        rest.classList.remove("active");
        resetTimer();
    });

    rest.addEventListener("click", function(){
        currentMode = "rest";
        rest.classList.add("active");
        focus.classList.remove("active");
        resetTimer();
    })

    play.addEventListener("click", function(){
    if(interval){
        clearInterval(interval);
        interval = null;
        play.textContent = "Play";
        msg.textContent = "Ready to start?";
    }
    else{
        play.textContent = "Pause";
        interval = setInterval(function(){
        msg.textContent = "Keep going...";
        if(timeleft<=0) {
            if(currentMode==="focus"){
            pomodoroCount++;
            msg.textContent = "✨ Focus session completed!";
            msg.classList.add("glow");
            setTimeout(function(){
            msg.classList.remove("glow");
            msg.textContent="Ready to start?";
        }, 3000);
    }
    resetTimer();
    return;
}
        console.log("tick");
        timeleft--;
        updateTimerDisplay();
    }, 1000);
}});

    resetbtn.addEventListener("click", resetTimer);
    function resetTimer(){
        clearInterval(interval);
        interval = null;
        if(currentMode === "focus"){
        timeleft=1500;
        }
        else{
            timeleft=300;
        }
        updateTimerDisplay();
        play.textContent = "Play";
    }

    function updateTimerDisplay(){
    let minutes = Math.floor(timeleft/60);
    let seconds = timeleft%60;
    timer.textContent = `${minutes}:${seconds.toString().padStart(2,"0")}`; 
    count.textContent="Pomodoros completed today : " + pomodoroCount;
    }