// referenciando as tags HTML
const [minuteLeftSpan, minuteRightSpan] = document.querySelectorAll('div#minutes span')
const [secondLeftSpan, secondRightSpan] = document.querySelectorAll('div#seconds span')
const buttonsDiv = document.querySelector('div#buttons')
const startButton = document.querySelector('button#start')

// começando do ZERO a contagem
let minutes = 0
let seconds = 0


// função responsável por criar botões
function createButton(id) {
    
    // criando o botão
    const button = document.createElement('button')

    // adicionando os atributos
    button.setAttribute('type', 'button')
    button.setAttribute('id', id)

    // preparando o texto para ir para o HTML
    id = id.split('')
    id[0] = id[0].toUpperCase()
    id = id.join('')

    // adicionando o texto na TAG
    button.innerHTML = id

    // adicionando o botão dentro da DIV
    buttonsDiv.appendChild(button)

    return button
}


// função responsável por alterar o innerHTML
function addToHTML(seconds, minutes) {
    
    // definindo as variáveis que irão para o HTML
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    
    // colocando os MINUTOS e SEGUNDOS no corpo da página
    secondLeftSpan.innerHTML = secondLeft
    secondRightSpan.innerHTML = secondRight
    minuteLeftSpan.innerHTML = minuteLeft
    minuteRightSpan.innerHTML = minuteRight
}


// função responsável por iniciar a countagem do cronômetro
function startCount() {

    // cada vez que for chamada, a função irá adicionar +1 SEGUNDO
    seconds++

    // se SEGUNDO for IGUAL a 60, adicionar 1 MINUTO e ZERAR os SEGUNDOS
    if (seconds == 60) {
        minutes++
        seconds = 0
    }

    addToHTML(seconds, minutes)
}


// função responsável por setar o intervalo do cronômetro (1 SEGUNDO)
function mineSetInterval() {

    // definindo um intervado de 1 SEGUNDO para realizar a contagem
    return setInterval(startCount, 1000)
}


// iniciando o cronômetro quando o botão START for clicado
startButton.onclick = () => {

    // apagando o botão START
    startButton.remove()

    // criando o botão STOP
    const stopButton = createButton('stop')

    // definindo um intervado de 1 SEGUNDO para realizar a contagem
    let count = mineSetInterval()

    // parando a contagem quando o botão STOP for clicado
    stopButton.onclick = () => {

        // parando a contagem
        clearInterval(count)
        
        // apagando o botão STOP
        stopButton.remove()
        
        // criando o botão RESET
        const resetButton = createButton('reset')

        // zerando o cronômetro quando o botão RESET for clicado
        resetButton.onclick = () => {
            
            // zerando as variáveis
            seconds = 0
            minutes = 0

            // apagando os botões RESET e RESUME
            resetButton.remove()
            resumeButton.remove()

            // atualizando os valores no HTML
            addToHTML(seconds, minutes)

            // adicionando o botão START
            buttonsDiv.appendChild(startButton)
        }

        // criando o botão RESUME
        const resumeButton = createButton('resume')

        // continuando a contagem quando o botão RESUME for clicado
        resumeButton.onclick = () => {
            
            // apagando os botões RESET e RESUME
            resetButton.remove()
            resumeButton.remove()

            // adicionando o botão STOP
            buttonsDiv.appendChild(stopButton)

            // definindo o intervalo de 1 SEGUNDO
            count = mineSetInterval()
        }
    }
}
