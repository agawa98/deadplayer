async function getShow(){

    let dzien = document.getElementById("dzien").value
    let miesiac = document.getElementById("miesiac").value
    let rok = document.getElementById("rok").value

    let data = await fetch("https://archive.org/advancedsearch.php?q=grateful+dead+"+rok+"-"+miesiac+"-"+dzien+"&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=num_favorites+desc&sort%5B%5D=&sort%5B%5D=&rows=10&page=1&output=json&save=yes#raw")
    let res = await data.json()
    console.log(res)

    if(res.response.numFound == 0){
        alert("nie znaleziono show w tym dniu")
        return
    }

    var identifier

    for(let i=0;i<res.response.docs.length;i++){
        console.log(res.response.docs[i].identifier)

        //wybieranie recordingu z soundboarda
        if(res.response.docs[i].identifier.toLowerCase().includes("sbd")==true){

            identifier = res.response.docs[i].identifier
            break
        }
    }

    document.getElementById("playerContent").src = "https://archive.org/embed/"+identifier+"&playlist=1"
}


async function getAllShows(){

    let res = await fetch('https://api.setlist.fm/rest/1.0/artist/b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d', {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'x-api-key': "506G_li4jJSLSgWgOHHF-t4HH4pcTmNQLri2"
    }
    });

    let data = await res.json()
    console.log(data)


}


async function randomShow(){

}



document.getElementById("getShowButton").addEventListener("click",async ()=>{
    getShow()
})