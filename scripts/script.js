var eren = document.getElementById('1')
const pravilaIgre = document.getElementById('pravila-igre')
const pravilaLink = document.getElementById('pravila-link')
const x = document.getElementsByClassName('x')

const odaberiNivoe = document.getElementsByClassName('odaberi-nivo')

var poljeIme = document.getElementById('ime')
var mikasa = document.getElementById('2')
var levi = document.getElementById('3')
var armin = document.getElementById('4')
const text = document.getElementsByClassName('container-fluid')[0]
const dugme = document.getElementById('dugme2')
const poljeZavrsio = document.getElementsByClassName('score')
const poljeNivo = document.getElementById('nivo2')
var kraj = document.getElementsByClassName('type-field')
var players = document.getElementsByClassName('playerField')
var pobednici = [[], [], [], []]
var igraci;
const padajuci = document.getElementById('padajuci')
const nivoLink = document.getElementById('nivo-link')
const navLink = document.getElementsByClassName('nav-link')[0]
const nivoLista = document.getElementsByClassName('nivo-lista')
const izaberiNivo = document.getElementById('izaberi-nivo')

var profil = document.getElementById('profil-igraca')
var statistika = document.getElementById('statistika')
var profilLink = document.getElementById('profil')
var profSlika = document.getElementById('profilna-slika')
var statIme = document.getElementById('statistika-ime')
var itekstovi = document.getElementById('itekstovi')
var omecevi = document.getElementById('omecevi')
var pob = document.getElementById('pob')

var pobeda = document.getElementById('pobeda')
var roar = new Audio('../assets/sounds/roar.mp3')

// console.log(itekstovi, omecevi, pob)

var score = 0
var nivo = 1
var greska = 0
var otkucaniTekstovi = 0
var odigraniMecevi = 0
var pobede = 0

// localStorage.removeItem('igraci')

class Igraci {
    imena = []
}

class Igrac {
    ime = ''
    slika;
    otkucaniTekstovi = 0
    odigraniMecevi = 0
    pobede = 0
    constructor(ime) {
        this.ime = ime
    }
}

igraci = JSON.parse(localStorage.getItem('igraci'))

var igrac;
console.log(igraci)
var ime = prompt('Unesite ime igrača')

var igraciLength = 0

if (ime) {
    if (igraci !== null) {

        if (igraci.imena.length > 0) {
            for (let igrac1 of igraci.imena) {
                // console.log(igraciLength)
                var ime1 = igrac1.ime
                if (ime1.toLowerCase().includes(ime.toLowerCase())) {

                    igraciLength = 1
                    igrac = igrac1
                    function profStat() {
                        profilLink.innerText = igrac.ime
                        profSlika.setAttribute('src', igrac.slika)
                        statIme.innerHTML = `<strong>${igrac.ime}</strong>`
                        itekstovi.innerText = `Iskucani tekstovi: ${igrac.otkucaniTekstovi}`
                        omecevi.innerText = `Odigrani mečevi: ${igrac.odigraniMecevi}`
                        pob.innerText = `Pobede: ${igrac.pobede}`
                    }

                    console.log(statIme, itekstovi, omecevi, pob)
                    dane = prompt(`${ime1}, da li želiš da promeniš ime?(U polje ukucaj 'Da' ili 'Ne')`)
                    asliku = prompt('A sliku?(U polje ukucaj "Da" ili "Ne")')

                    if (asliku) {
                        if (dane.toLowerCase() == 'da' && asliku.toLowerCase() == 'da') {
                            profStat()
                            statIme.innerHTML = `<strong>${ime}</strong>`
                            profilLink.innerText = ime
                            poljeIme.innerText = ime
                        } else if (dane.toLowerCase() == 'da' && asliku.toLowerCase() == 'ne') {
                            profStat()
                            statIme.innerHTML = `<strong>${ime}</strong>`
                            profilLink.innerText = ime
                            poljeIme.innerText = ime
                            var poljeSlika = document.getElementById('slikaIgrac')
                            poljeSlika.setAttribute('src', igrac.slika)
                        } else if (dane.toLowerCase() == 'ne' && asliku.toLowerCase() == 'ne') {
                            profStat()
                            var poljeSlika = document.getElementById('slikaIgrac')
                            poljeSlika.setAttribute('src', igrac.slika)
                            poljeIme.innerText = igrac.ime
                            var label = document.getElementById('label')
                            label.style.display = 'none'
                        } else if (dane.toLowerCase() == 'ne' && asliku.toLowerCase() == 'da') {
                            profStat()
                            poljeIme.innerText = igrac.ime
                        }
                    }
                    break;
                } else {
                    igraciLength = 0
                    igrac = new Igrac(ime)
                    // igraci.imena.push(igrac)
                    // localStorage.setItem('igraci', JSON.stringify(igraci))
                    poljeIme.innerText = igrac.ime
                    profilLink.innerText = igrac.ime
                    statIme.innerHTML = `<strong>${igrac.ime}</strong>`
                    itekstovi.innerText = `Iskucani tekstovi: ${igrac.otkucaniTekstovi}`
                    omecevi.innerText = `Odigrani mečevi: ${igrac.odigraniMecevi}`
                    pob.innerText = `Pobede: ${igrac.pobede}`
                }

            } if (igraciLength == 0) {
                console.log(igrac)
                igraci.imena.push(igrac)
                localStorage.setItem('igraci', JSON.stringify(igraci))
            }
        }
    } else {
        igrac = new Igrac(ime)
        // console.log(igrac)
        igraci = new Igraci()
        igraci.imena.push(igrac)
        localStorage.setItem('igraci', JSON.stringify(igraci))
        poljeIme.innerText = igrac.ime
        profilLink.innerText = igrac.ime
        statIme.innerHTML = `<strong>${igrac.ime}</strong>`
        itekstovi.innerText = `Iskucani tekstovi: ${igrac.otkucaniTekstovi}`
        omecevi.innerText = `Odigrani mečevi: ${igrac.odigraniMecevi}`
        pob.innerText = `Pobede: ${igrac.pobede}`
    }
}

// console.log(igraciLength)






function profilClick() {
    profilLink.addEventListener('click', () => {
        profil.style.display = 'block'
        x[2].addEventListener('click', () => {
            profil.style.display = 'none'
        })
    })
}

profilClick()



if (ime == '') poljeIme.innerText = 'Eren'


if (window.innerWidth < 576) {
    nivoLink.addEventListener('click', () => {
        izaberiNivo.style.display = 'block'
        x[1].addEventListener('click', () => {
            izaberiNivo.style.display = 'none'
        })
        for (let i = 0; i < nivoLista.length; i++) {
            const element = nivoLista[i];
            element.addEventListener('click', () => {
                izaberiNivo.style.display = 'none'
                nivo = i + 1
                poljeNivo.innerHTML = `<h4>Nivo: ${nivo}</h4>`
            })
        }
    })
}

pravilaLink.addEventListener('click', () => {
    pravilaIgre.style.display = 'block'
    x[0].addEventListener('click', () => {
        pravilaIgre.style.display = 'none'
    })
})

for (let i = 0; i < odaberiNivoe.length; i++) {
    const odaberiNivo = odaberiNivoe[i];
    odaberiNivo.addEventListener('click', () => {
        nivo = i + 1
        poljeNivo.innerHTML = `<h4>Nivo: ${nivo}</h4>`
    })
}


function dodajSliku() {
    var slika = document.getElementById('slika')
    if (slika.files.length > 0) {
        var fileReader = new FileReader()
        fileReader.onload = function (e) {
            var poljeSlika = document.getElementById('slikaIgrac')
            poljeSlika.setAttribute('src', e.target.result)
            profSlika.setAttribute('src', e.target.result)
            igrac.slika = e.target.result
            for (let i = 0; i < igraci.imena.length; i++) {
                let element = igraci.imena[i];
                if (element.ime == igrac.ime) {
                    element = igrac
                    console.log(element)
                    localStorage.setItem('igraci', JSON.stringify(igraci))
                }
            }
            // console.log(slikaIgrac)
        }
        fileReader.readAsDataURL(slika.files[0])
        slika.style.display = 'none'
        var label = document.getElementById('label')
        label.style.display = 'none'
    }

}

//Resenje za problem kada tastatura natelefonu pomera sadrzaj stranice na gore
setTimeout(function () {
    let viewheight = window.innerHeight;
    let viewwidth = window.innerWidth;
    let viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
}, 300);

var tekstovi = ['Ko rano rani dve srece Gnabri', 'Nikome nije do zore gorela', 'Sto mogu danas to cu sutra vidzet', 'Bez alata nema ni zanata', 'Oko za oko, pasta za zube', 'Bolje biti bogat i zdrav, jer kad si siromasan dzaba ti sto si bolestan', 'Bolje voditi ljubav nego psa']
var random;

poljeNivo.innerHTML = `<h4>Nivo: ${nivo}</h4>`

if (dugme.innerHTML === 'Start') {
    // console.log(dugme.innerText)
    dugme.addEventListener('click', () => {
        // console.log(tekstovi)
        eren.classList.remove('is-valid')
        var slika = document.getElementById('slika')
        if (slika.value == '' && !igrac.slika) {
            var poljeSlika = document.getElementById('slikaIgrac')
            poljeSlika.setAttribute('src', './assets/images/Eren_jaeger.png')
            var label = document.getElementById('label')
            label.style.display = 'none'
        }
        if (nivo != 6) {
            text.innerHTML = '<h4 class="yellow">Nakon odbrojavanja ovde ce se pojaviti tekst koji treba da prekucate. Srećno! 😉</h4>'
            kraj[0].innerHTML = `<textarea id="1" disabled></textarea>`
            eren = document.getElementById('1')
            eren.addEventListener('keyup', (e) => {
                var tekst = tekstovi[random]
                var zavrsio = poljeZavrsio[0]
                if (greska == 1) {
                    if (e.key == 'Backspace') {
                        greska--
                        eren.classList.remove('is-invalid')
                    }
                }

                if (e.key === 'Enter') {
                    var erenTrim = eren.value.trim()
                    if (erenTrim == tekst) {
                        eren.classList.add('form-control', 'is-valid')
                        eren.setAttribute('disabled', 'disabled')
                        eren.classList.remove('is-invalid')
                        igrac.otkucaniTekstovi = igrac.otkucaniTekstovi + 1
                        itekstovi.innerText = `Iskucani tekstovi: ${igrac.otkucaniTekstovi}`
                        score++
                        // console.log(igrac)
                        tekstovi = tekstovi.toSpliced(random, 1)
                        for (let i = 0; i < igraci.imena.length; i++) {
                            let element = igraci.imena[i];
                            if (element.ime == igrac.ime) {
                                element = igrac
                                console.log(element)
                                localStorage.setItem('igraci', JSON.stringify(igraci))
                            }
                        }

                        zavrsioPoRedu(score, zavrsio, 0)
                        if (score == 4) {

                            // console.log(tekstovi)
                            visiNivo()
                            if (nivo == 5) {
                            }
                        }
                    }
                    else {
                        eren.classList.add('form-control', 'is-invalid')
                        greska++
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
        dugme.style.pointerEvents = 'none';
        dugme.style.backgroundColor = '#2e8cad';
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
                var interval
                if (window.innerWidth < 576) {
                    interval = 650
                } else {
                    interval = 550
                }
                // console.log(interval)
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
                        pozoviPisanje(mikasa, levi, armin, interval, 190, 420, random, 1, 2, 3)
                        break;

                    case 5:
                        pozoviPisanje(mikasa, levi, armin, interval, 220, 440, random, 1, 2, 3)
                        break;

                    default:


                        break;
                }
            }

        }, 1000)
    })
}

//funckija za pisanje teksta racunara u textarea
function pisanjeTextArea(area, randInterval, min, max, random, i) {
    var tekst = tekstovi[random]
    var zavrsio = poljeZavrsio[i]
    let slova = tekst.split('')
    let randNiz = []
    //ubacivanje random brojeva u niz duzine niza varijable slova koje kasnije koristimo za interval u setTimeout()
    for (let index = 0; index < slova.length; index++) {
        randNiz.push((randInterval - generateRandom(min, max)))
    }
    var k = 0
    let interval = randNiz[k]
    //interval za kucanje teksta racunara
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

//funkcija koja se poziva za povecanje nivoa
function visiNivo() {

    dugme.style.pointerEvents = 'all';
    dugme.style.backgroundColor = '#0C4A60';
    nivo++
    eren.setAttribute('disabled', true)

    poljeNivo.innerHTML = nivo < 6 ? `<h4>Nivo: ${nivo}</h4>` : ``
    //provera da li je doslo do poslednjeg nivoa i kraja igre, gde kasnije sledi sabiranje bodova i proglasenje konacnog pobednika, 
    //na kraju svega restartuje se vracanjem nivoa na 1 i skora na 0
    if (nivo == 6) {

        igrac.odigraniMecevi = igrac.odigraniMecevi + 1
        omecevi.innerText = `Odigrani mecevi: ${igrac.odigraniMecevi}`
        for (let i = 0; i < igraci.imena.length; i++) {
            let element = igraci.imena[i];
            if (element.ime == igrac.ime) {
                element = igrac
                // console.log(element)
                localStorage.setItem('igraci', JSON.stringify(igraci))
            }
        }
        var igrac1 = pobednici[0].reduce(sum)
        var igrac2 = pobednici[1].reduce(sum)
        var igrac3 = pobednici[2].reduce(sum)
        var igrac4 = pobednici[3].reduce(sum)
        pobednici = []
        pobednici.push(igrac1, igrac2, igrac3, igrac4)
        // console.log(pobednici)
        let max_niza = pobednici[0]
        for (let i = 0; i < pobednici.length; i++) {
            if (pobednici[i] > max_niza) {
                max_niza = pobednici[i]
            }

        }
        if (max_niza == pobednici[0]) {
            pobeda.style.display = 'block'
            roar.play()
            pobeda.addEventListener('click', () =>{
                pobeda.style.display = 'none'
            })
            igrac.pobede = igrac.pobede + 1
            pob.innerText = `Pobede: ${igrac.pobede}`
            for (let i = 0; i < igraci.imena.length; i++) {
                let element = igraci.imena[i];
                if (element.ime == igrac.ime) {
                    element = igrac
                    console.log(element)
                    localStorage.setItem('igraci', JSON.stringify(igraci))
                }
            }
        }
        for (let k of kraj) {
            k.innerHTML = ''
        }
        let i = pobednici.indexOf(max_niza)
        kraj[i].innerHTML = `<h3 class="text-center pobednik">POBEDNIK!</h3>`
        nivo = 1
        if (nivo == 1) {
            tekstovi = ['Ko rano rani dve srece Gnabri', 'Nikome nije do zore gorela', 'Sto mogu danas to cu sutra vidzet', 'Bez alata nema ni zanata', 'Oko za oko, pasta za zube', 'Bolje biti bogat i zdrav, jer kad si siromasan dzaba ti sto si bolestan', 'Bolje voditi ljubav nego psa']
            poljeNivo.innerHTML = nivo < 6 ? `<h4>Nivo: ${nivo}</h4>` : ``

            pobednici = [[], [], [], []]
        }

    }
    // console.log(omecevi, itekstovi, pob)
    dugme.innerHTML = 'Start'
    pob.innerText = `Pobede: ${igrac.pobede}`
    itekstovi.innerText = `Otkucani tekstovi: ${igrac.otkucaniTekstovi}`
    omecevi.innerText = `Odigrani mečevi: ${igrac.odigraniMecevi}`
    dugme.style.display = 'block'
    score = 0
    eren.value = ''
    mikasa.innerHTML = ''
    armin.innerHTML = ''
    levi.innerHTML = ''
    text.innerHTML = ` <ul class="nav nav-tabs">
            
                <li class="nav-item dropdown col-2 col-sm-1">
                  <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown"  href="#" role="button" aria-expanded="false">
                    <div class="burger"></div>
                    <div class="burger"></div>
                    <div class="burger"></div>
                  </a>
                  <ul class="dropdown-menu" id="padajuci">
                    <li><a id="pravila-link" class="dropdown-item" href="#">Pravila igre</a></li>
                    
                    <li>
                        <a class="dropdown-item" id="nivo-link" href="#">
                          Odaberi nivo &raquo;
                        </a>
                        <ul class="dropdown-menu dropdown-submenu">
                          <li>
                            <a class="dropdown-item odaberi-nivo" href="#">Nivo 1</a>
                          </li>
                          <li>
                            <a class="dropdown-item odaberi-nivo" href="#">Nivo 2</a>
                          </li>
                          <li>
                            <a class="dropdown-item odaberi-nivo" href="#">Nivo 3</a>
                          </li>
                          <li>
                            <a class="dropdown-item odaberi-nivo" href="#">Nivo 4</a>
                          </li>
                          <li>
                            <a class="dropdown-item odaberi-nivo" href="#">Nivo 5</a>
                          </li>
                        </ul>
                      </li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a id="profil" class="dropdown-item" href="#">${igrac.ime}</a></li>
                    
                  </ul>
                </li>
                <li class="align-self-center col-8 col-sm-10" id="title">
                    <h4>Attack on Keyboard</h4>
                </li>
                <li>
                    <div class="logo">
                        <img src="./assets/images/logo.svg" alt="">
                    </div>
                </li>
              </ul>`;
    var profilLink = document.getElementById('profil')
    profilLink.addEventListener('click', () => {
        var profil = document.getElementById('profil-igraca')
        profil.style.display = 'block'
        x[2].addEventListener('click', () => {
            profil.style.display = 'none'
        })
    })
    var pravilaLink = document.getElementById('pravila-link')
    pravilaLink.addEventListener('click', () => {
        var pravilaIgre = document.getElementById('pravila-igre')
        pravilaIgre.style.display = 'block'
        x[0].addEventListener('click', () => {
            pravilaIgre.style.display = 'none'
        })
    })
    var odaberiNivoe = document.getElementsByClassName('odaberi-nivo')
    for (let i = 0; i < odaberiNivoe.length; i++) {
        const odaberiNivo = odaberiNivoe[i];
        odaberiNivo.addEventListener('click', () => {
            nivo = i + 1
            poljeNivo.innerHTML = `<h4>Nivo: ${nivo}</h4>`
        })
    }


}

//funkcija za lakse pozivanje funkcija za pisanje teksta kompjutera
function pozoviPisanje(igracDva, igracTri, igracCetiri, interval, min, max, random, zavrsioJedan, zavrsioDva, zavrsioTri) {
    pisanjeTextArea(igracDva, interval, min, max, random, zavrsioJedan)
    pisanjeTextArea(igracTri, interval, min, max, random, zavrsioDva)
    pisanjeTextArea(igracCetiri, interval, min, max, random, zavrsioTri)
}

//funckija za odredjivanje ko je prvi iskucao tekst na kraju nivoa/runde
function zavrsioPoRedu(score, zavrsio, i) {
    switch (score) {
        case 1:
            zavrsio.innerHTML = '<h6 class="prvi"><strong>Prvi</strong></h6>'
            pobednici[i].push(4)
            break;
        case 2:
            zavrsio.innerHTML = '<h6><strong>Drugi</strong></h6>'
            pobednici[i].push(3)
            break;
        case 3:
            zavrsio.innerHTML = '<h6><strong>Treći</strong></h6>'
            pobednici[i].push(2)
            break;
        case 4:
            zavrsio.innerHTML = '<h6 class="poslednji"><strong>Poslednji</strong></h6>'
            pobednici[i].push(1)
            break;

        default:
            break;
    }
}

//funkcija za sumu za reduce metod
function sum(total, num) {
    return total + num
}

//funkcija za generisanje random broja u rasponu od n do n
function generateRandom(min, max) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
}








