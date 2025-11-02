/*
    This fetches the svg hearts and places them on the screen
    Documentation:
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
*/
/*jshint esversion: 8 */
// Link to svg icon
const URLINK = "https://cdn.jsdelivr.net/npm/iconoir@6/icons/heart.svg";
//Number of icons to be shown
const count = 3;

async function fetchAndPlaceIcon(link){
    try{
        //Fetches the data from the link (not converted yet)
        const res = await fetch(link);
        //If something goes wrong then output an error
        if (!res.ok){
            throw new Error(`Response status: ${res.status}`);
        }
        //Converts data to text
        const result = await res.text();
        //Populate the 3 span containers with the svg element
        for(let i=0;i<count; i++){
            document.getElementById(`live${i+1}`).innerHTML = result;
        }
    }catch(error){
        console.error("Error: ",error);
    }
}
fetchAndPlaceIcon(URLINK);