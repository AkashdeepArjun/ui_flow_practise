document.addEventListener("DOMContentLoaded",()=>{



const cpu =document.querySelector(".cpu");
const motherboard = document.querySelector(".motherboard");
const ssd = document.querySelector('.ssd');
const ram = document.querySelector('.ram');
const psu = document.querySelector('.psu');
const gpu = document.querySelector('.gpu');
const casing = document.querySelector('.case');
const log_container =document.querySelector('.log_container');
    const clear_errors=()=>{
    document.querySelector('.log_container').innerHTML='';
     document.querySelectorAll('.part').forEach((card)=>{
            card.classList.remove("not_okay");
            card.classList.remove("okay");
            card.style.transform='';
            // document.querySelector('body').style.background="green";
        })  

        log_container.classList.add("hidden");
      


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
                // [ cpu,gpu,ram,psu]
             
            const selected_units_count = selected_units.length;


            if(selected_units_count <=1){
                
                    return true;
            }
        
           
            errors =check_compatibility(selected_units);
            if(errors.length==0){
                    clear_errors();
            }


            if(errors.length>0){
                
                    highlight_incomaptible_parts(errors);
                    show_logs(errors);

            }else if(selected_units_count==7 && !target.gpu && !target.cpu?.has_igpu){

                // ("IF YOU DONT WANT TO USE GPU ATLEAST SELECT CPU THAT HAVE IN BUILT GPU");


            }else if (selected_units_count==8 && errors.length==0){
                
                    // enable_save_builds();
                    clear_errors();

            }

        }



    })


    const highlight_incomaptible_parts =(bugs)=>{
        
        bugs.forEach(json_obj => {
            
            // const card_ref =document.querylector('.'+json_obj.part_type);

            const card_ref=document.querySelector(`.${json_obj.part_type.toLowerCase()}`);
            card_ref.classList.add("not_okay");
        });



    }

    const show_logs =(bugs)=>{
    
        

    bugs.forEach( (error)=> {
            

            const issues = error.issues;
            const parent = document.createElement("div");

            issues.forEach(issue => {
                
                const txt = document.createElement("h1");
                txt.innerText=issue;
                parent.appendChild(txt);


            });
            
           log_container.appendChild(parent); 





    });


            log_container.classList.remove("hidden");



    }



    const check_compatibility =(selection)=>{
        
        const errors_temp=[];
        const selection_object=Object.fromEntries(selection);

     if(selection_object.CPU && selection_object.PSU && selection_object.GPU){
                console.log("psu cpu and gpu",selection_object.CPU,selection_object.PSU,selection_object.GPU);
                const min_consumption = estimate_power_consumption(selection_object.GPU,selection_object.CPU);
                if(selection_object.PSU.wattage < min_consumption){

                    errors_temp.push({part_type:"psu",issues:["PSU NOT SUPPORTED"]}) 
                }

                console.log("PSU WATTAGE =>", selection_object.PSU.wattage);
                console.log("CONSUMPTION =>",min_consumption);


            }


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
       
    if(A.type.toLowerCase()==="cpu"  && B.type.toLowerCase()=== 'motherboard'){
    if(A.part.socket!==B.part.socket) temp_issues.push("CPU SOCKET MISMATCH MOTHERBOARD");
    if(!A.part.chipsets?.includes(B.part.chipset)) temp_issues.push("CPU CHIPSET NOT SUPPORTED");
    if(A.part.tdp>B.part.max_tdp) temp_issues.push("CPU TDP HIGHER THAN MOTHERBOARD");
}

if(A.type.toLowerCase()==="case" && B.type.toLowerCase()==='gpu'){
       
    if(B.part.length_mm > A.part.gpu_max_length_mm) temp_issues.push("GPU IS BIGGER THAN CASE");

}

if(A.type.toLowerCase()==="motherboard" && B.type.toLowerCase()==="ram"){

    if(B.part.type!==A.part.ram_type) temp_issues.push("RAM SPEED WONT MATCH MOTHERBOARD SUPPORTED ");

}

    if(A.type.toLowerCase()==="motherboard" && B.type.toLowerCase()==="ssd"){
    
    if(!A.part.m2_slots?.includes(B.part.form_factor)) temp_issues.push("MOTHERBOARD DOES NOT SUPPORT SELECTED SSD FORM FACTOR");

    if(!A.part.supported_interfaces?.includes(B.part.interface)) temp_issues.push("SSD INTERFACE (NVME/sata ) NOT SUPPORTED");

    

    }

    if(A.type.toLowerCase()==="case" && B.type.toLowerCase()==="motherboard"){


    if(!A.part.form_factors?.includes(B.part.form_factor)) temp_issues.push("MOTHERBOARD WONT FIT IN CASE");


    }

    if(A.type.toLowerCase()==="gpu" && B.type.toLowerCase()==="psu"){

        
    if(!B.part.connectors?.includes(A.part.required_connector)) temp_issues.push("POWER SUPPLU DOES NOT HAVE CONNECTOR REQUIRED FOR GPU");
        



    }

    if(A.type.toLowerCase()==="gpu" && B.type.toLowerCase()==="motherboard"){

    if(B.part.pci_version < A.part.pci_version) temp_issues.push("GPU PCI IS NOT SUPPORTED IN MOTHERBOARD PCI SLOT")


    }

    if(A.type.toLowerCase()==="coolant" && B.type.toLowerCase()==="cpu"){


       if(!A.part.supported_sockets?.includes(B.part.socket)) temp_issues.push("COOLANT IS NOT SUPPORTED FOR GIVEN CPU");
        if(B.part.tdp > A.part.cooling_capacity_tdp) temp_issues.push("COOLANT CANT COOL DOWN THAT CPU");



    }


    if(A.type.toLowerCase()==="case" && B.type.toLowerCase()==="coolant"){
        
            if(B.part.type==="air" && B.part.height_mm > A.part.cooler_max_height_mm) temp_issues.push(" AIR COOLANT WONT FIT IN CASE");
            if(B.part.type==="liquid"  && B.part.height_mm > A.part.radiator_mount_size_mm) temp_issues.push("LIQUID COOLER WONT FIT INSIDE CASE");   
            


            
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

      document.querySelectorAll(".part").forEach(card=>{

        card.addEventListener("click",()=>{

        console.log("item clicked");
        const partype = card.dataset.partType;
        const title="SELECT "+partype;
        show_dialog(partype,title,card);


        })


    })







    // const cpu_mb_compat = (cpu,motherboard)=>{
    //
    //
    //
    //     const socket_match = cpu.socket===motherboard.socket;
    //     const chipset_okay =cpu.chipsets.includes(motherboard.chipset);
    //     const tdp_okay =cpu.tdp<=motherboard.max_tdp;
    //
    //     if(!socket_match){
    //         errors.push("SOCKETS DOES NOT MATCH");
    //
    //     }
    //     if(!chipset_okay){
    //         errors.push("CHIPSET NOT SUPPORTED");
    //     }
    //
    //     if (!tdp_okay) {
    //
    //         errors.push("CPU ON  MOTHERBOARD WILL BOTTLE NECK");
    //     }
    //
    //
    //
    //     return {
    //         okay:errors.length===0,
    //         issues:errors
    //     }
    //
    //
    //
    // }

    const load_parts = async(part_type,title,choice_source)=>{


        try {
            const fname=part_type.toLowerCase(); 
            const response = await fetch(`/assets/data/${fname}.json?ts=${Date.now()}`);
             

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
                 
                    <img src =${part.logo} class="logo">
                    <h1 class="modal">${part.name}</h1>

               
`   
                selected_parts[part_type]=part;

                close_dialog_ui();
            })    


        });



    }
    function estimate_power_consumption(...parts){

       return parts.reduce((previous, current) => {
       return previous+(current?.tdp || 0) 
       }, 50)

    }

})
