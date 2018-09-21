(function(){
    'use strict'
    var timer = document.getElementById('timer');
    var min = document.getElementById('min');
    var sec = document.getElementById('sec');
    var reset = document.getElementById('reset');
    var start = document.getElementById('start');

    var startTime;
    var timeLeft;
    var timeToCountDown = 0;
    var timerId;
    var isRunning = false;

    function updateTimer(t){
        var d = new Date(t);
        var m = d.getMinutes();
        var s = d.getSeconds();
        var ms = d.getMilliseconds();
        

        m = ('0' + m ).slice(-2);
        s = ('0' + s ).slice(-2);
        ms = ('00' + ms).slice(-3); 
        var timerString = m + ':' + s + '.' + ms
       if(isRunning===true&&timeLeft<5*1000){
           timer.style.color="red";
       }
        timer.textContent = timerString; 
        document.title = timerString;

    }

    function countDown(){
        timerId = setTimeout(function(){
            var elapsedTime = Date.now() - startTime;   
            timeLeft = timeToCountDown - elapsedTime;
            if(timeLeft<0){
                isRunning = false;
                start.textContent = 'Start';
                clearTimeout(timerId);
                timeLeft = 0;
                timeToCountDown = 0;
                updateTimer(timeLeft);
                timer.style.color='white';
                return;
            }
            countDown();
            updateTimer(timeLeft);
        }, 10)
    }

    start.addEventListener('click', function(){
        if(isRunning===false){
            isRunning = true;
            start.textContent = 'Stop'
            startTime = Date.now();
            countDown();
        }else{
            isRunning = false;
            start.textContent = 'Start';
            timeToCountDown = timeLeft;
            clearTimeout(timerId);
        }
        
        
    });

    min.addEventListener('click', function(){
        if(isRunning){
            return;
        }
        timeToCountDown += 60 * 1000;
        if(timeToCountDown > 60 * 60 *1000){
            timeToCountDown = 0;
        }
        updateTimer(timeToCountDown);
    })
    sec.addEventListener('click', function(){
        if(isRunning){
            return;
        }
        timeToCountDown += 1000;
        if(timeToCountDown > 60 * 60 *1000){
            timeToCountDown = 0;
        }
        updateTimer(timeToCountDown);
    })

    reset.addEventListener('click', function(){
        timeToCountDown = 0;
        timer.style.color = 'white';
        updateTimer(timeToCountDown);
    })
    
})();