//redirector.js
/*jshint esversion: 6 */
/* global bootstrap */
document.addEventListener("DOMContentLoaded", ()=>{
    //Redirector.js ensures that redirects work for .
    //Deployment: "/q2-coursework-blueprint/index.html" Testing: /index.html
    //Using ternary statement to check for a path that works for both phases
    //If true it adds on q2-coursework-blueprint and if not then it assigns "" or an empty string to basePath
    const basePath = window.location.pathname.includes("/q2-coursework-blueprint")
    ? "/q2-coursework-blueprint" : "";

    const VALID_PATHS = [
        `${basePath}/`,
        `${basePath}/index.html`,
        `${basePath}/level1.html`,
        `${basePath}/level2.html`,
        `${basePath}/level3.html`,
        `${basePath}/level-select.html`,
        `${basePath}/coming-soon.html`
    ];
    const currentPath = window.location.pathname;

    const isKnown = VALID_PATHS.includes(currentPath);
    if (!isKnown){
        window.location.replace(`${basePath}/index.html`);
    }
    //Added a redirect for any levels not completed fully. Normally activated after 5 seconds when coming soon is opened
    if(currentPath == `${basePath}/coming-soon.html`){
        const t = setTimeout(() => {console.log("Redirect message up");
                }, 1000);
        document.getElementById("redirectMessage").textContent = "Redirecting to level select screen";
        const u = setTimeout(() => {window.location.replace(`${basePath}/level-select.html`);
                }, 5000);
    }

});