// SPDX-License-Identifier: MIT
pragma solidity  >=0.4.22 <0.9.0;

contract Votacion {

  string[] opciones = ["muniequito1","munieco2","munieco3"];
  uint[] cantVotos = [0,0,0];

  mapping(address => bool) public verificarvotico;

  function votar(address usuario, uint id) public returns (bool) {

    cantVotos[id] +=1;
    verificarvotico[usuario]=true;
    return true;
  }

  function verificarVoto(address usuario) public view returns (bool) {
    return verificarvotico[usuario];    
  }

  function getVotos(uint id) public view returns (uint) {
    return cantVotos[id];
  }

  function getOpciones(uint id)public view returns (string memory) {
      return opciones[id];
  }

  function reiniciarVotos()public returns (bool){
    cantVotos[0]=0;
    cantVotos[1]=0;
    cantVotos[2]=0;
    return true;
  }
}
