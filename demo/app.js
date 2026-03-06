let account = null

function loadNotes(){

const saved = localStorage.getItem("radax_notes")

if(saved){

const notes = JSON.parse(saved)

notes.forEach(n => {

const div = document.createElement("p")
div.innerText = n
document.body.appendChild(div)

})

}

}

async function connectWallet(){

const provider = window.aptos || window.petra

if(!provider){
alert("Aptos wallet not detected")
return
}

try{

const response = await provider.connect()

alert("Connected: " + response.address)

}catch(e){

console.log(e)
alert("Connection rejected")

}

}

function saveNote(){

const text = document.getElementById("note").value

if(!text){
alert("Write something first")
return
}

const div = document.createElement("p")
div.innerText = text
document.body.appendChild(div)

let notes = JSON.parse(localStorage.getItem("radax_notes") || "[]")

notes.push(text)

localStorage.setItem("radax_notes", JSON.stringify(notes))

document.getElementById("note").value = ""

}

loadNotes()