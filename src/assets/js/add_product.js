console.log("script load success !!!");

document.addEventListener("DOMContentLoaded",()=>{

const part_form = document.querySelector(".part_form");

const parts_menu = document.querySelector(".parts_menu");

const save_button = document.querySelector(".save_button");

var selected_part="motherboard"


  let proxy_state;
  let required_fields;

  const validate_input_form = ()=>{

  const state = {}
  const inputs =document.querySelectorAll('.part_form input , .part_form textarea , .part_form select' );
   
    required_fields = Array.from(inputs).filter(input=>{
  
    

    return input.hasAttribute('required');



  })
console.log("required field lenght",required_fields.length);
    required_fields.forEach(input =>{
    
      state[input.name]='';


    })

    proxy_state = new Proxy(state,{
    
      set(target,key,value){
      
        target[key]=value;

        const filled =Object.values(target).filter(val=>val?.trim()!=='').length;

        console.log("FILLED SO FAR :",filled);

        save_button.disabled=filled!==required_fields.length


        return true;


      }

    });


    required_fields.forEach(input=>{
      
      input.addEventListener("input",e=>{


          proxy_state[e.target.name] = e.target.value;
          
        console.log(" KEY :",e.target.name,"VALUE :",e.target.value);
      })



    })
  

  }




console.log(" dafuq is going on");

save_button.disabled=true;





 const show_form = async(e)=>{
   part_form.innerHTML=''
    selected_part=e.target.value;
    console.log("selected value is ",e.target.value);
    const response =await fetch(`/assets/metadata/${e.target.value}.json?ts=${Date.now()}`);
    const fields =await response.json();

    console.log(fields);

    Object.entries(fields).forEach(( [key,field] )=>{
    
    const label = document.createElement("label");
    label.htmlFor=key;
  
    label.innerText=field.label;
      let input ;
    if(field.type=="select"){
      input=document.createElement("select");
      input.name=key;
      field.options.forEach(option => {
      const opt = document.createElement("option");
      opt.value=option;
      opt.textContent=option;
      input.appendChild(opt);
      });
    }else{
      input =document.createElement("input");
      input.name=key;
      input.required=true;
      input.type = field.type || 'text';
       
   }

         part_form.appendChild(label);
         part_form.appendChild(input);
  
    })


  validate_input_form();

                   
}

const save_part = async (e)=>{

    e.preventDefault();

  const form_data  =  new FormData(part_form);
  const data = {};

  form_data.forEach((v,k)=>{

    data[k] = v.trim();

    })

const response=await fetch(`index.php?dest=save&part=${selected_part}`,{method:"POST",headers:{
      "Content-type": "application/json"
    },
    body:JSON.stringify(data)

    })

const json_response = await response.json();

    if(json_response.success){
   
        alert(`${selected_part} was saved`);


    }else{
        
        alert(`${selected_part} GOT ERROR: ${json_response.error}`)
      

    }

}




part_form.addEventListener("submit",save_part) 



    





parts_menu.addEventListener("change",show_form);

})
