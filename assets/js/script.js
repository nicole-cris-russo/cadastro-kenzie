const nome            = document.querySelector(".input-name")
const sobrenome       = document.querySelector(".input-sobrenome")
const dataNascimento  = document.querySelector(".input-data")
const email           = document.querySelector(".input-email")
const contato         = document.querySelector(".input-contato")
const telefone        = document.querySelector(".input-telefone")
const cargo           = document.querySelector(".input-cargo")
const button          = document.querySelector("#register-button")

const totalAlunos     = document.querySelector("#total-alunos")

const cargoOption     = document.querySelector("#cargoOption")
const btn             = document.querySelector("#btn")
const ul              = document.querySelector("#lista-requisitada")

class Pessoa {
    constructor (nome, sobrenome, dataNascimento, email, contato, telefone, cargo) {
        this.nome = nome
        this.sobrenome = sobrenome
        this.dataNascimento = dataNascimento
        this.email = email
        this.contato = contato
        this.telefone = telefone
        this.cargo = cargo
    }

    static users = []

    static newUser () {
        let dateToday = new Date()
        let dateEntered = new Date(dataNascimento.value)
        let year  = dateToday.getFullYear() - dateEntered.getFullYear()
        let month = dateToday.getMonth() - dateEntered.getMonth()
        let day   = dateToday.getDate() - dateEntered.getDate() 
        if ((year <= 18 && month < 0) || (year = 18 && month == 0 && day <= 0)) {
            Pessoa.modalAlert("Menores de 18 anos não podem se inscrever")
        } else {
            if (Pessoa.users.length > 0) {
                let validation = Pessoa.users.some(
                    (user) => user.email.includes(email.value)
                )
                if (validation) {
                    Pessoa.modalAlert("Email já cadastrado")
                } else {
                    let newUser = new Pessoa (nome.value, sobrenome.value, dataNascimento.value, email.value, contato.value, telefone.value, cargo.value)
                    this.users.push(newUser)
                }
            } else {
                let newUser = new Pessoa (nome.value, sobrenome.value, dataNascimento.value, email.value, contato.value, telefone.value, cargo.value)
                this.users.push(newUser)
            }
        }
    }

    static cardUserCargo (usuario) {
        let li     = document.createElement("li")
        let pName  = document.createElement("p")
        let pEmail = document.createElement("p")
        let pCargo = document.createElement("p")

        pName.innerText  = usuario.nome
        pEmail.innerText = usuario.email
        pCargo.innerText = usuario.cargo

        li.append(pName, pEmail, pCargo)

        return li
    }

    static filterUser () {
        ul.innerHTML = ""
        let cont = 1
        Pessoa.users.forEach(
            (user) => {
                if (cargoOption.value == "Todos") {
                    ul.appendChild(Pessoa.cardUserCargo(user))
                    totalAlunos.innerText = cont++
                } else
                if (cargoOption.value == user.cargo) {
                    ul.appendChild(Pessoa.cardUserCargo(user))
                    totalAlunos.innerText = cont++
                }
            }
        )
        return ul
    }

    static modalAlert (alert) {
        const body   = document.querySelector("body")

        const div    = document.createElement("div")
        const button = document.createElement("button")
        const p      = document.createElement("p")

        div.className = "div-modal"
        button.className = "button-modal"
        p.className = "p-modal"

        p.innerText = alert
        button.innerText = "Ok"

        div.append(p, button)
        body.append(div)

        button.addEventListener("click", (event) => div.style.display = "none")

        return div
    }
/*  static showUsers () {
        console.log(this.users)
    } */
}

button.addEventListener("click", (event) => {
    event.preventDefault()
    Pessoa.newUser()
    Pessoa.filterUser()
    /* Pessoa.showUsers() */
})


btn.addEventListener("click", (event) => {
    ul.innerHTML = ""
    Pessoa.filterUser()
})