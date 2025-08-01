
console.log("script loaded");

document.addEventListener("DOMContentLoaded",()=>{


  const fetch_motherboards = async()=>{
  
    const response = await fetch(`/assets/data/motherboard.json?ts=${Date.now()}`);
    const boards =await response.json();
    const board= document.querySelector('.motherboards');
    board.classList.remove("item_skeleton");
    board.textContent=boards.length;
    console.log("boards ",boards);
    console.log("size ",boards.length);
  }


    const fetch_cpus = async()=>{
  
    const response = await fetch(`/assets/data/cpu.json?ts=${Date.now()}`);
    const boards =await response.json();
    const board= document.querySelector('.cpus');
    board.classList.remove("item_skeleton");
    board.textContent=boards.length;
    console.log("boards ",boards);
    console.log("size ",boards.length);
  }


    const fetch_rams = async()=>{
  
    const response = await fetch(`/assets/data/ram.json?ts=${Date.now()}`);
    const boards =await response.json();
    const board= document.querySelector('.rams');
    board.classList.remove("item_skeleton");
    board.textContent=boards.length;
    console.log("boards ",boards);
    console.log("size ",boards.length);
  }


  const fetch_ssds= async()=>{
  
    const response = await fetch(`/assets/data/ssd.json?ts=${Date.now()}`);
    const boards =await response.json();
    const board= document.querySelector('.ssds');
    board.classList.remove("item_skeleton");
    board.textContent=boards.length;
    console.log("boards ",boards);
    console.log("size ",boards.length);
  }

  const fetch_psus= async()=>{
  
    const response = await fetch(`/assets/data/psu.json?ts=${Date.now()}`);
    const boards =await response.json();
    const board= document.querySelector('.psus');
    board.classList.remove("item_skeleton");
    board.textContent=boards.length;
    console.log("boards ",boards);
    console.log("size ",boards.length);
  }

  const fetch_gpus= async()=>{
  
    const response = await fetch(`/assets/data/gpu.json?ts=${Date.now()}`);
    const boards =await response.json();
    const board= document.querySelector('.gpus');
    board.classList.remove("item_skeleton");
    board.textContent=boards.length;
    console.log("boards ",boards);
    console.log("size ",boards.length);
  }

  const fetch_cases= async()=>{
  
    const response = await fetch(`/assets/data/case.json?ts=${Date.now()}`);
    const boards =await response.json();
    const board= document.querySelector('.cases');
    board.classList.remove("item_skeleton");
    board.textContent=boards.length;
    console.log("boards ",boards);
    console.log("size ",boards.length);
  }


  const fetch_coolants= async()=>{
  
    const response = await fetch(`/assets/data/coolant.json?ts=${Date.now()}`);
    const boards =await response.json();
    const board= document.querySelector('.coolants');
    board.classList.remove("item_skeleton");
    board.textContent=boards.length;
    console.log("boards ",boards);
    console.log("size ",boards.length);
  }

  const go_to_inventory = (event) =>{

    event.preventDefault();
    const type= event.target.id;
    window.location.href=`index.php?dest=${type}`;


  }




  

  fetch_motherboards();
  fetch_cpus();
  fetch_rams();
  fetch_ssds();
  fetch_psus();
  fetch_gpus();
  fetch_cases();
  fetch_coolants();


  document.querySelectorAll('.item').forEach(category => {
    
    category.addEventListener("click",go_to_inventory);






  
  });




});

