/*
    This fetches the svg hearts and places them on the screen
    Documentation:
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
*/
const URL = "https://cdn.jsdelivr.net/npm/iconoir@6/icons/heart.svg";
const count = 3

async function fetchAndPlaceIcon(url){
    try{
        const res = await fetch(url);
        if (!res.ok){
            throw new Error(`Response status: ${res.status}`);
        }
        const result = await res.text();
        console.log(result);
        for(let i=0;i<count; i++){
            document.getElementById(`live${i+1}`).innerHTML = result;
        }
    }catch(error){
        console.error("Error: ",error);
    }


}

fetchAndPlaceIcon(URL);