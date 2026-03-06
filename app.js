// Using Aptos Wallet Standard - https://aptos.dev/build/sdks/wallet-adapter/dapp

let account = null

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

  // Check for Aptos Wallet Standard (window.aptos) - modern wallets
  const apt = window.aptos
  
  // Fallback: Check for legacy Petra (deprecated but still works for now)
  const petra = window.petra

  if(!apt && !petra){
    alert("Aptos wallet not detected. Please install Petra or another Aptos wallet.")
    return
  }

  try{
    
    // Try the wallet standard first
    if(apt){
      const response = await apt.connect()
      account = response.address
      alert("Connected: " + account)
    } 
    // Fallback to legacy Petra (will show deprecation warning but works)
    else if(petra){
      console.warn("Using deprecated Petra API. Please update your wallet.")
      const response = await petra.connect()
      account = response.address
      alert("Connected: " + account)
    }

  }catch(e){

    console.log(e)
    alert("Connection rejected or cancelled")

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
