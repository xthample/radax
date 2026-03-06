// Using Aptos Wallet Adapter - https://aptos.dev/build/sdks/wallet-adapter/dapp

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

  // Check if WalletSelector is available (exposed by wallet-adapter-core)
  if(typeof window.WalletSelector === 'undefined'){
    alert("Wallet adapter not loaded. Please refresh the page.")
    return
  }

  try{
    
    // Initialize the wallet selector with the Petra plugin
    const walletSelector = await window.WalletSelector.init({
      network: window.WalletAdapterNetwork.Testnet,
      plugins: [new window.PetraWalletPlugin()]
    })
    
    // Connect to a wallet
    const { wallet } = await walletSelector.connect()
    account = wallet.address
    
    alert("Connected: " + account)

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
