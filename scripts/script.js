var eren = document.getElementById('1')
var mikasa = document.getElementById('2')
var levi = document.getElementById('3')
var armin = document.getElementById('4')
const text = document.getElementsByClassName('container-fluid')[0]
const dugme1 = document.getElementById('dugme1')
const dugme2 = document.getElementById('dugme2')
const poljeZavrsio = document.getElementsByClassName('score')
const poljeNivo1 = document.getElementById('nivo1')
const poljeNivo2 = document.getElementById('nivo2')
var kraj = document.getElementsByClassName('type-field')
var pobednici = [[], [], [], []]

var score = 0
var nivo = 1

var greska = 0

// console.log(window.innerWidth)

var windowWIdth = window.innerWidth

function reportWindowSize() {
    windowWIdth = window.innerWidth
  }
  
  window.onresize = reportWindowSize;



const tekstovi = ['Ko rano rani dve srece Gnabri', 'Nikome nije do zore gorela', 'Sto mogu danas to cu sutra vidzet', 'Bez alata nema ni zanata', 'Oko za oko, pasta za zube', 'Bolje biti bogat i zdrav, jer kad si siromasan dzaba ti sto si bolestan', 'Bolje voditi ljubav nego psa']
var random;

if(windowWIdth < 576){
    console.log(windowWIdth)
    var poljeNivo = poljeNivo1
    poljeNivo.innerHTML = `<h4>Nivo: ${nivo}</h4>`
    var dugme = dugme1
    console.log(dugme)
    pocniIgru(dugme, poljeNivo)
} else {
    console.log(windowWIdth)
    var poljeNivo = poljeNivo2
    poljeNivo.innerHTML = `<h4>Nivo: ${nivo}</h4>`
    var dugme = dugme2
    console.log(dugme)
    pocniIgru(dugme, poljeNivo)
}

function pocniIgru(dugme, poljeNivo){
    if (dugme.innerHTML == 'Start') {
        dugme.addEventListener('click', () => {
            if (nivo == 1) {
                kraj[0].innerHTML = `<textarea id="1" disabled></textarea>`
                eren = document.getElementById('1')
                eren.addEventListener('keyup', (e) => {
                    
                    console.log(greska)
                    var tekst = tekstovi[random]
                    
                    var zavrsio = poljeZavrsio[0]
                    if(greska == 1){
                        if(e.key == 'Backspace') {
                            greska --
                            eren.classList.remove('is-invalid')
                            console.log('cistim')
                        }
                    }
                   
                    if (e.key === 'Enter') {
                        var erenTrim = eren.value.trim()
                        if (erenTrim == tekst) {
                            eren.classList.remove('is-invalid')
                            // console.log(tekst)
                            score++
                            zavrsioPoRedu(score, zavrsio, 0)
                            if (score == 4) {
                                console.log(pobednici)
                                visiNivo()
                            }
                        }
                        else {
                            eren.classList.add('form-control', 'is-invalid')
                            greska ++
                        }
                        
                    }
                })
    
                for (let i = 1; i < kraj.length; i++) {
                    kraj[i].innerHTML = `<textarea id="${i + 1}" disabled></textarea>`
                    mikasa = document.getElementById('2')
                    levi = document.getElementById('3')
                    armin = document.getElementById('4')
                }
            }
            kraj = document.getElementsByClassName('type-field')
            dugme.setAttribute('disabled', true);
            score = 0
            for (let polje of poljeZavrsio) {
                polje.innerHTML = ''
            }
            random = Math.floor(Math.random() * tekstovi.length)
            var brojac = 5
            dugme.innerHTML = brojac
            var loop = setInterval(() => {
                brojac--
                dugme.innerHTML = brojac
                if (brojac == 0) {
                    clearInterval(loop)
                    eren.removeAttribute('disabled')
                    eren.focus()
                    dugme.style.display = 'none'
                    text.innerHTML = `<h4>${tekstovi[random]}</h4>`
                    text.style.display = 'block'
                    var interval = 500
                    switch (nivo) {
                        case 1:
                            pozoviPisanje(mikasa, levi, armin, interval, 90, 350, random, 1, 2, 3)
                            break;
    
                        case 2:
                            pozoviPisanje(mikasa, levi, armin, interval, 120, 400, random, 1, 2, 3)
                            break;
    
                        case 3:
                            pozoviPisanje(mikasa, levi, armin, interval, 170, 400, random, 1, 2, 3)
                            break;
    
                        case 4:
                            pozoviPisanje(mikasa, levi, armin, interval, 200, 450, random, 1, 2, 3)
                             break;
    
                        case 5:
                            pozoviPisanje(mikasa, levi, armin, interval, 250, 480, random, 1, 2, 3)
                            break;
    
                        default:
                            document.body.innerHTML = 'Kraj igre!'
    
                            break;
                    }
                }
    
            }, 1000)
        })
    }



function pisanjeTextArea(area, randInterval, min, max, random, i) {
    var tekst = tekstovi[random]
    var zavrsio = poljeZavrsio[i]
    let slova = tekst.split('')
    let randNiz = []
    for (let index = 0; index < slova.length; index++) {
        randNiz.push((randInterval - generateRandom(min, max)))
    }
    var k = 0
    let interval = randNiz[k]
    console.log(interval)
    let intervalFunction = () => {
        if (slova.length > 0) {
            k = Math.floor(Math.random() * slova.length)
            let interval = randNiz[k]
            area.innerHTML += slova.shift()
            setTimeout(intervalFunction, interval)
        }
        else {
            score++
            zavrsioPoRedu(score, zavrsio, i)
            if (score == 4) {
                visiNivo()
            }
        }

    }
    setTimeout(intervalFunction, interval)

}


function visiNivo() {
    
        dugme.removeAttribute('disabled')
    
    
    nivo++
    eren.setAttribute('disabled', true)
    
        poljeNivo.innerHTML = nivo < 6 ? `<h4>Nivo: ${nivo}</h4>` : ``

    if (nivo == 6) {
        var igrac1 = pobednici[0].reduce(sum)
        var igrac2 = pobednici[1].reduce(sum)
        var igrac3 = pobednici[2].reduce(sum)
        var igrac4 = pobednici[3].reduce(sum)
        pobednici = []
        pobednici.push(igrac1, igrac2, igrac3, igrac4)
        console.log(pobednici)
        let max_niza = pobednici[0]
        for (let i = 0; i < pobednici.length; i++) {
            if (pobednici[i] > max_niza) {
                max_niza = pobednici[i]
            }

        }
        for (let k of kraj) {
            k.innerHTML = ''
        }
        let i = pobednici.indexOf(max_niza)
        kraj[i].innerHTML = `<h3 class="text-center">POBEDNIK!</h3>`
        nivo = 1
        if (nivo == 1) {
            
                poljeNivo.innerHTML = nivo < 6 ? `<h4>Nivo: ${nivo}</h4>` : ``
            
            pobednici = [[], [], [], []]
        }

    }
    score = 0
    eren.value = ''
    mikasa.innerHTML = ''
    armin.innerHTML = ''
    levi.innerHTML = ''
    
        dugme.innerHTML = 'Start'
        dugme.style.display = 'block'
    
    text.style.display = 'none'
}

function pozoviPisanje(igracDva, igracTri, igracCetiri, interval, min, max, random, zavrsioJedan, zavrsioDva, zavrsioTri) {
    pisanjeTextArea(igracDva, interval, min, max, random, zavrsioJedan)
    pisanjeTextArea(igracTri, interval, min, max, random, zavrsioDva)
    pisanjeTextArea(igracCetiri, interval, min, max, random, zavrsioTri)
}

function zavrsioPoRedu(score, zavrsio, i) {
    switch (score) {
        case 1:
            zavrsio.innerHTML = '<h6 class="prvi">Prvi</h6>'
            pobednici[i].push(4)
            break;
        case 2:
            zavrsio.innerHTML = '<h6>Drugi</h6>'
            pobednici[i].push(3)
            break;
        case 3:
            zavrsio.innerHTML = '<h6>Treći</h6>'
            pobednici[i].push(2)
            break;
        case 4:
            zavrsio.innerHTML = '<h6 class="poslednji">Poslednji</h6>'
            pobednici[i].push(1)
            break;

        default:
            break;
    }
}

function sum(total, num) {
    return total + num
}


function generateRandom(min, max) {
    let difference = max - min;
    let rand = Math.random(); 
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
}


}

    



