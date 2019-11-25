function setTime() {
    const date = new Date()
    document.querySelector('.time h2').innerHTML = date.getHours() + '<span class="blink">:</span>' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
}

function getApiData() {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            const data = JSON.parse(xhr.responseText);

            const rers = data.result.rers.length
            const metros = data.result.metros.length

            let hasProblem = false

            for(let i = 0; i < rers; i++) {
                if(data.result.rers[i].slug === 'critical') {
                    hasProblem = true
                }
            }

            for(let i = 0; i < metros; i++) {
                if(data.result.metros[i].slug === 'critical') {
                    hasProblem = true
                }
            }
            document.querySelector('.status h1').innerHTML = hasProblem ? 'Incident(s)' : 'Trafic normal'
            templateType('rers', data.result.rers)
        }
    }
    xhr.open('GET', 'https://api-ratp.pierre-grimaud.fr/v4/traffic');
    xhr.send()
}
function templateType(type, data) {
    console.log(type)
}

//  Timer
setTime()
setInterval(function () {
    setTime();
}, 1000);

getApiData()