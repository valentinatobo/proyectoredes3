const Web3 = require('web3');
const contract = require('./build/Votacion.json');

let web3;
let vota;

const connectWeb3 = async () => {
  let web3Provider;

  // Modern dapp browsers...
  if (window.ethereum) {
    web3Provider = window.ethereum;
     try {
      // Request account access
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error('User denied account access');
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    web3Provider = window.web3.currentProvider;
  }
  // If no injected web3 instance is detected, fall back to Ganached
  else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }

  web3 = new Web3(web3Provider);
};


window.onload = async () => {
  await connectWeb3();
  vota = new web3.eth.Contract(
    contract.abi,
    contract.networks[5777].address
  );
  console.log(vota);  
};


window.votar = async opcionid => {
  const accounts = await web3.eth.getAccounts();
  
  if (!
    await vota.methods.verificarVoto(accounts[0]).call({
      from: accounts[0]
    })
  ) {
    await vota.methods.votar(accounts[0], opcionid).send({
      from: accounts[0]
    })
    alert('Tu voto ya ha sido registrado');
    
    const cantVot = await obtenervotos(0);
    document.getElementById("opc1").innerHTML += cantVot;
    const cantVot1 = await obtenervotos(1);
    document.getElementById("opc2").innerHTML += cantVot1;
    const cantVot2 = await obtenervotos(2);
    document.getElementById("opc3").innerHTML += cantVot2;
  } else {
    alert('Ya has votado :(');
  }
};

window.reiniciar = async() => {
  const accounts = await web3.eth.getAccounts();

  await vota.methods.reiniciarVotos().send({
    from: accounts[0]
    
  })
  alert('Sistema reiniciado');

}

window.obtenervotos = async(opcionid) => {
  const accounts = await web3.eth.getAccounts();
  
  return await vota.methods.getVotos(opcionid).call({
    from: accounts[0]
  })
   
}