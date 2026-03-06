// Using Aptos Wallet Standard - https://aptos.dev/build/sdks/wallet-adapter/dapp
// The wallet-adapter-core exposes WalletAdapterNetwork and WalletSelector globally

let account = null
let walletSelector = null

async function loadNotes(){

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

  // Use the Aptos Wallet Standard (window.aptos)
  // This is the supported way per https://aptos.dev/build/sdks/wallet-adapter/dapp
  const provider = window.aptos

  if(!provider){
    alert("Aptos wallet not detected. Please install a compatible wallet like Petra.")
    return
  }

  try{

    // Request connection using the Wallet Standard API
    const response = await provider.connect()
    account = response.address
    
    alert("Connected: " + account)

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
