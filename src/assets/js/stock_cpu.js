document.addEventListener("DOMContentLoaded",()=>{

  const stock_list_headers = document.querySelector('.title_data');
  
  const stock_list_body = document.querySelector('tbody');

  const context_menu = document.getElementById("context-menu");
  
  let selected_row = null;
 
  const table_wrapper = document.querySelector('.table_wrapper');

  const delete_button = document.getElementById("delete_item");




  

  console.log("SCRIPT LOAD SUCCESS TF");



  const load_stock = async()=>{
    
    const response = await fetch(`/assets/data/cpu.json?ts=${Date.now()}`);

    const json_format = await response.json();

    console.log("DATA IN JSON FORMAT IS ",json_format);

    const titles = Object.keys(json_format[0]);

    titles.forEach((v,k)=>{
      
      if(v!="logo"){
        
      const title = document.createElement("td");
      title.innerText=v;
      stock_list_headers.appendChild(title);


      }
            
    })

   stock_list_body.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

    const tr=e.target.closest("tr");
    if(!tr) return;
  
    const wrapper_box=table_wrapper.getBoundingClientRect();
    const row_box = tr.getBoundingClientRect();

    if(selected_row){
        selected_row.classList.remove('selected');}

    selected_row=tr;
    selected_row.classList.add("selected");



    const top= wrapper_box.scrollTop>0?wrapper_box.scrollTop+row_box.top:row_box.top;    
    const left = e.clientX-wrapper_box.left;

    context_menu.style.top=`${top}px`;
    context_menu.style.left=`${left}px`;

    context_menu.classList.remove("hidden");

    });


    document.addEventListener("click",(e)=>{
   
      if(!context_menu.contains(e.target)){

      context_menu.classList.add("hidden");
      if(selected_row){
          
        selected_row.classList.remove("selected");
        }
      }


    })
   json_format.forEach( (json_entry,index)=> {
      
      const row = document.createElement("tr");
      
      let entry_id=null;
    
      Object.entries(json_entry).forEach(([k,v])=>{
        
        if(k==="id"){
          entry_id=v.toString().trim();
        }

        if(k!="logo"){
      const td=document.createElement("td");
            td.innerText=v;

      row.appendChild(td);

        }
    



      });
      if(entry_id!=null){
  
        row.id=entry_id;

      }
      stock_list_body.appendChild(row);
     


    });












  }

load_stock();

const delete_article = async(id)=>{
  console.log("ID SELECTED WAS ",id)
    context_menu.classList.add("hidden");
    const type='cpu';
  const response =  await fetch(`index.php?dest=delete&id=${id}&type=${type}`,{method:'POST'});
  const json_format_response = await response.json();
  console.log("RESPONSE WE GOT WAS ",json_format_response);
  if(json_format_response.success){

      console.log("deletion was success");
      window.location.replace("index.php?dest=cpus");
    }
  else{

      console.log("error response found ",json_format_response.error);


  }


}



delete_button.addEventListener("click",(e)=>{

  if(selected_row!=null){
    console.log("INSIDE DELETE LOGIC ID PASSED WAS ",selected_row.id);
    delete_article(selected_row.id);

  }
    selected_row=null;
  





 })


})
