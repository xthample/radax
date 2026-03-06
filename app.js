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

  // Check for Aptos Wallet Standard - must have connect method
  const apt = window.aptos
  
  // Check for legacy Petra 
  const petra = window.petra

  // Debug what's available
  console.log("window.aptos:", apt)
  console.log("window.petra:", petra)

  if(!apt && !petra){
    alert("Aptos wallet not detected. Please install Petra or another Aptos wallet.")
    return
  }

  // Use Wallet Standard if available and has connect method
  if(apt && typeof apt.connect === 'function'){
    try{
      const response = await apt.connect()
      account = response.address
      alert("Connected: " + account)
      return
    }catch(e){
      console.log("Wallet Standard connect failed:", e)
      // Continue to fallback
    }
  }

  // Fallback to legacy Petra (deprecated but may still work)
  if(petra && typeof petra.connect === 'function'){
    try{
      console.warn("Falling back to deprecated Petra API")
      const response = await petra.connect()
      account = response.address
      alert("Connected: " + account)
      return
    }catch(e){
      console.log(e)
      alert("Connection rejected or cancelled")
      return
    }
  }

  alert("Wallet found but doesn't support connection. Please update your wallet.")

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
