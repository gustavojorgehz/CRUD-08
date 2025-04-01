'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () =>  JSON.parse(localStorage.getItem('dbClient')) ?? []   
const setLocalStorage = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient))

const tempClient = {
    nome: "Gustavo",
    email: "gustavo@gmail.com",
    celular: "47999222521",
    cidade: "Jeriquaquara"
}

// CRUD - create read update delete

const creatClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const readClient = () => getLocalStorage()

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

//Interação com o layout

const isValidFields = () =>{
    document.querySelector("#form").reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll(".modal-field")
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome:document.querySelector("#nome").value,
            email:document.querySelector("#email").value,
            cidade:document.querySelector("#cidade").value,
            celular:document.querySelector("#celular").value,
        }
        creatClient(client)
        closeModal()
    }
}


// Eventos
document.querySelector('#cadastrarCliente')
    .addEventListener('click', openModal)

document.querySelector('#modalClose')
    .addEventListener('click', closeModal)

document.querySelector('#salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)

document.querySelector('#cancelar')
    .addEventListener('click', closeModal)