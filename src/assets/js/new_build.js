document.addEventListener("DOMContentLoaded",()=>{

const cpu =document.querySelector(".cpu");
const motherboard = document.querySelector(".motherboard");
const ssd = document.querySelector('.ssd');
const ram = document.querySelector('.ram');
const psu = document.querySelector('.psu');
const gpu = document.querySelector('.gpu');
const casing = document.querySelector('.case');



    console.log("script loaded");
    const selection_title=document.querySelector('.title');
    console.log("selectoin title is ",selection_title);
    const select_part_dialog=document.querySelector('.backdrop');
    console.log("dialog is ",select_part_dialog);
    const parts_list = document.getElementById('item-grid');
    const search_bar  = document.getElementById('search');
    const close_dialog = document.getElementById('close_dialog');
    let selected_part_type=null; 
    var cpus=null;
    var motherboards=null;
    
    const selected_parts ={
        cpu:null,
        gpu:null,
        psu:null,
        motherboard:null,
        ram:null,
        ssd:null,
        case:null

    }



//SHOW DIALOG ON PICKING PART
    const  show_dialog = (part_type,title,choice_source)=>{
    
        selected_part_type=part_type;
        select_part_dialog.classList.remove("hidden");  //SHOWS DIALOG 
        search_bar.value="";
        // parts_list.innerHTML="<p>Loading ....<p>";
        load_parts(part_type,title,choice_source);



    }

//HIDES DIALOG

    const close_dialog_ui =()=>{

        select_part_dialog.classList.add('hidden');
        parts_list.innerHTML='';
    }
    
    close_dialog.addEventListener("click",()=>{

        close_dialog_ui();


    })

    // const handle_keypress = (e)=>{
    //
    //     // e.preventDefault();
    // if(e.altKey && e.shiftKey){
    //     let type="motherboard";
    //     switch (e.key.toLowerCase()) {
    //         case "m": type="motherboard"; break;
    //         case "p":type="cpu";break;
    //
    //         default:
    //             break;
    //     }
    //     console.log("ALT +SHIFT ",e.key," PRESSED");
    //     show_dialog(type);
    //
    // }
    //
    //
    //     console.log("KEY PRESSED ",e.key.toLowerCase());
    //
    //
    // }


    
    // document.addEventListener("keydown",handle_keypress);









    document.querySelectorAll(".part").forEach(card=>{

        card.addEventListener("click",()=>{

        console.log("item clicked");
        const partype = card.dataset.partType;
        const title="SELECT "+partype;
        show_dialog(partype,title,card);


        })


    })







    const cpu_mb_compat = (cpu,motherboard,gpu_selected=false)=>{

        
        const errors=[]

        if(cpu.socket!=motherboard.socket){
            errors.push("CPU AND motherboard SOCKETS mismatch");
        }

        if(!cpu.has_igpu && !gpu_selected){
            errors.push("CPU does not have inbuilt gpu and gpu not selected ");
        }


        return {
            okay:errors.length===0,
            issues:errors
        }

//lets say i chose chpu hav has_igpu and not selectes gpu its says inokay which is supposed to becase when cu does not have igpu and gpu not selected 


    }

    const load_parts = async(part_type,title,choice_source)=>{


        try {
   
            const response = await fetch(`/assets/data/${part_type}.json?ts=${Date.now()}`);
        
            const products = await response.json();

            console.log('products in json format is ',products);

            render_ui(part_type,products,title,choice_source);
        


            
        } catch (error) {
           console.log("failed to load data",error); 
            parts_list.innerHTML="<p>ERROR LOADING</p>";
        }
    }


    const  render_ui = (part_type,data,title,choice_source)=>{

        selection_title.textContent=title;
        console.log(selection_title);
        parts_list.innerHTML="";
        data.forEach(part=> {
            
            const card = document.createElement("div");
            card.className="component";
            card.dataset.id=part.id;
            card.innerHTML=`
            <div class="brand" >${part.brand}</div>
            <div class="modal"  >${part.name}</div>
    `
            parts_list.appendChild(card);
            card.addEventListener("click",()=>{           
            cpu.classList.remove("okay","not_okay");
            motherboard.classList.remove("not_okay","okay");
                choice_source.innerText=part.name;
                selected_parts[part_type]=part;
                if(selected_parts.cpu && selected_parts.motherboard){
                    console.log(selected_parts.cpu);
                    console.log("CPU HAVE IGPU ",selected_parts.cpu.has_igpu);
                    console.log("MOTHERBOARD SOCKET == CPU SOCKET",selected_parts.cpu.socket===selected_parts.motherboard.socket);
                    console.log("gpu exists?",selected_parts.gpu);
                    const gpu_opt = selected_parts.gpu!=null?true:false;
                    const result = cpu_mb_compat(selected_parts.cpu,selected_parts.motherboard,gpu_opt);
                   if(!result.okay){
                        const cpu =document.querySelector('.cpu');
                        cpu.classList.add("not_okay");
                        console.log("dont okay");

                    }else{
                        motherboard.classList.add("okay");
                        cpu.classList.add("okay");
                    }
                    console.log(result);
                    // CPU WITH F DOES NOT HAVE GPU RIGHT BIT  /cpu_mb_compat

                }
                close_dialog_ui();
            })    


        });



    }




  




})
