document.addEventListener("DOMContentLoaded",()=>{

const cpu =document.querySelector(".cpu");
const motherboard = document.querySelector(".motherboard");
const ssd = document.querySelector('.ssd');
const ram = document.querySelector('.ram');
const psu = document.querySelector('.psu');
const gpu = document.querySelector('.gpu');
const casing = document.querySelector('.case');

    const clear_errors=()=>{

     document.querySelectorAll('.part').forEach(card=>{
            card.classList.remove("no_okay");
            card.classList.remove("okay");
            card.style.transform='';
        })   
      


    }



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
    const selected_parts = new Proxy({
    cpu:null,
    gpu:null,
    motherboard:null,
    ram:null,
    ssd:null,
    psu:null,
    case:null,
    },{
        set(target,key,value){

            clear_errors();

            target[key]=value;

            let errors = []; 
            
            const selected_units = Object.entries(target).filter(( [k,v] )=>v!=null);
            
            const selected_units_count = selected_units.length;


            if(selected_units_count <=1){
                
                    return true;
            }
           
            errors =check_compatibility(selected_units);

            if(errors.length>0){
                
                    highlight_incomaptible_parts(errors);


            }else if(selected_units_count==6 && !target.gpu && !target.cpu?.has_igpu){

                ui_error("IF YOU DONT WANT TO USE GPU ATLEAST SELECT CPU THAT HAVE IN BUILT GPU");


            }else if (selected_units_count==7 && errors.length==0){
                
                    enable_save_builds();

            }


            
        

            

        }



    })


    const highlight_incomaptible_parts =(bugs)=>{
        
        bugs.forEach(json_obj => {
            
            // const card_ref =document.querylector('.'+json_obj.part_type);

            const card_ref=document.querySelector(`.${json_obj.part_type}`);
            card_ref.classList.add("not_okay");
        });



    }




    const check_compatibility =(selection)=>{
        
        const errors_temp=[];
        for (let index = 0; index < selection.length; index++) {
            
            for (let next = index+1; next < selection.length; next++) {
               
                const [type,part] = selection[index];

                const [type2,part2] = selection[next];

                const issues =check_pair_compatibility(type,part,type2,part2);
                    
                if(issues.length>0){
                    errors_temp.push({part_type:type2,issues})
                }
                
        

            }
            
        }
        return errors_temp;
    }

    const check_pair_compatibility = (type_a,a,type_b,b)=>{
      
        const temp_issues = [];
        const pair =[{
            type:type_a,
            part:a
            },{
                type:type_b,
                part:b

            }].sort((a,b)=>a.type.localeCompare(b.type)
            );
        
        
            const [A,B] = pair; 
           
            if(A.type==='cpu' && B.type==='motherboard'){
            if(A.part.socket!==B.part.socket) temp_issues.push("CPU SOCKET MISMATCH MOTHERBOARD");
            if(!A.part.chipsets?.includes(B.part.chipset)) temp_issues.push("CPU CHIPSET NOT SUPPORTED");
            if(A.part.tdp>B.part.max_tdp) temp_issues.push("CPU TDP HIGHER THAN MOTHERBOARD");
        }

        if(A.type==="case" && B.type==='gpu'){
               
            if(B.part.length_mm > A.part.gpu_max_length_mm) temp_issues.push("GPU IS BIGGER THAN CASE");

        }

        if(A.type==="motherboard" && B.type==="ram"){

            if(B.part.type!==A.part.ram_type) temp_issues.push("RAM SPEED WONT MATCH MOTHERBOARD SUPPORTED ");

        }

    
    return temp_issues;
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







    const cpu_mb_compat = (cpu,motherboard)=>{

        

        const socket_match = cpu.socket===motherboard.socket;
        const chipset_okay =cpu.chipsets.includes(motherboard.chipset);
        const tdp_okay =cpu.tdp<=motherboard.max_tdp;

        if(!socket_match){
            errors.push("SOCKETS DOES NOT MATCH");

        }
        if(!chipset_okay){
            errors.push("CHIPSET NOT SUPPORTED");
        }
        
        if (!tdp_okay) {
            
            errors.push("CPU ON  MOTHERBOARD WILL BOTTLE NECK");
        }



        return {
            okay:errors.length===0,
            issues:errors
        }



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
            <img src =${part.logo} class="logo">
            <div class="brand" >${part.brand}</div>
            <div class="modal"  >${part.name}</div>
    `
            parts_list.appendChild(card);
            card.addEventListener("click",()=>{           
            cpu.classList.remove("okay","not_okay");
            motherboard.classList.remove("not_okay","okay");
                choice_source.innerHTML=`
                <div class ="selected_part">   
                    <img src =${part.logo} class="logo">
                    <h1 class="modal">${part.name}</h1>

                </div>
`   
                selected_parts[part_type]=part;

                close_dialog_ui();
            })    


        });



    }




  




})
