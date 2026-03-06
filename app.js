let account = null

async function connectWallet(){

const wallet = window.aptos

try {

const response = await wallet.connect()

account = response.address

alert("Connected: " + account)

} catch(err){

alert("Wallet connection failed")

}

}

function saveNote(){

const text = document.getElementById("note").value

if(!text){

alert("Write something first")

return

}

alert("Note saved locally:\n\n" + text)

}