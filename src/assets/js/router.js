console.log("script load success");
document.addEventListener("DOMContentLoaded",()=>{

    const container = document.querySelector('.main_content');
    const DEFAULT_VIEW ="popular_builds";

    const getPageFromUrl = (url)=>{
            
        const parsed_url = new URL(url,location.origin);
        const dest =parsed_url.searchParams.get("dest");

        if(dest){
            return dest;
        }else{
            return parsed_url.pathname.split("/").pop() || DEFAULT_VIEW; 
        }


    }

    const loadview = async(view)=>{ 
        
            
  try {
      const res = await fetch(`index.php?dest=${view}&partial=1`);
      if (!res.ok) throw new Error("view not found");
      const html = await res.text();
      container.innerHTML = html;
    } catch (err) {
      container.innerHTML = "<h1>404 Page Not Found</h1>";
    }
    }


    const navToUrl=async(url,push=true)=>{

        const requested_view= getPageFromUrl(url);
        const current_view = history.state?.lastview || DEFAULT_VIEW;
        loadview(requested_view);
        if(current_view==requested_view){
            console.log("again visiting same page");
            history.replaceState({lastview:current_view},"","/"+current_view); 
        }

        if(requested_view!=current_view && push){
            history.pushState({lastview:requested_view},"","/"+requested_view);
            console.log(`pushing ${requested_view}`);
        }

        

    }

    //IN PUSH STATE OR REPLACE STATE WE PASSS {VIEW:WHATEVER } AS CURRENT STATE ? I AM BIT CONFUSED HERE ABOUT THIS THING

    
    document.addEventListener("click",(e)=>{
        
        const link = e.target.closest("a[data-lol]");
        if(!link){
            return;
        }
        e.preventDefault();
        navToUrl(link.href);





    })

    window.addEventListener("popstate",(e)=>{
        // e.preventDefault();
        const v =e.state?.lastview ||DEFAULT_VIEW;
        console.log(`new view is  ${v}`);
        loadview(v);
    })

    
    // const view = history.state?.lastview || DEFAULT_VIEW 
   const view =getPageFromUrl(location.href) 
    history.replaceState({lastview:view},"","/"+view);
    loadview(view);





})

