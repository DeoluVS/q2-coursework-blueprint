//redirector.js
const VALID_PATHS = ["/", "/index.html", "/level1.html", "/level2.html", "/level-select.html", "/coming-soon.html"];

document.addEventListener("DOMContentLoaded", ()=>{
    const currentPath = window.location.pathname;

    const isKnown = VALID_PATHS.includes(currentPath);
    if (!isKnown){
        window.location.replace("/index.html");
    }
    //Added a redirect for any levels not completed fully. Normally activated after 5 seconds when coming soon is opened
    if(currentPath == "/coming-soon.html"){
        const t = setTimeout(() => {console.log("Redirect message up");
                }, 1000);
        document.getElementById("redirectMessage").textContent = "Redirecting to level Select";
        const u = setTimeout(() => {window.location.replace("/level-select.html");
                }, 5000);
    }

});