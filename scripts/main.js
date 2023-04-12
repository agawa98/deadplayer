async function getShow(){

    let dzien = document.getElementById("dzien").value
    let miesiac = document.getElementById("miesiac").value
    let rok = document.getElementById("rok").value
    let typeFilter = document.getElementById("recordingType").value

    let data = await fetch("https://archive.org/advancedsearch.php?q=grateful+dead+"+rok+"-"+miesiac+"-"+dzien+"&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&save=yes")
    let res = await data.json()
    console.log(res)


    //todo: znajdz najblizszy show w przod i w tyul w wypadku gdy nie ma go w  danej dacie

    if(res.response.numFound == 0){
        alert("nie znaleziono show w tym dniu")
        return
    }
    
    //czyszczenie tabeli
    document.getElementById("resultsTable").innerHTML = ""

    for(let i=0; i<res.response.numFound; i++){
        if(i==0){

            //         TABLE HEADER
            let nameCell = document.createElement("td")
            nameCell.textContent = "Nazwa nagrania"

            let typeCell = document.createElement("td")
            typeCell.textContent = "Typ nagrania"

            let idCell = document.createElement("td")
            idCell.textContent = "Identyfikator nagrania"
            
            

            let tableRow = document.createElement("tr")

            tableRow.style.backgroundColor = "#fa1f0f"
            tableRow.style.color = "white"

            tableRow.appendChild(nameCell)
            tableRow.appendChild(typeCell)
            tableRow.appendChild(idCell)

            document.getElementById("resultsTable").appendChild(tableRow)

            //      TABLE HEADER

        }
        console.log("asdasd")
        let tableRow = document.createElement("tr")
        tableRow.classList.add("showRecord")
        
        let numCell = document.createElement("td")
        numCell.textContent = i

        let nameCell = document.createElement("td")
        nameCell.textContent = res.response.docs[i].title

        let typeCell = document.createElement("td")
        let audType
        if(res.response.docs[i].identifier.includes("sbd")==true||res.response.docs[i].identifier.includes("soundboard")==true){
            audType = "sbd"
        }
        else if(res.response.docs[i].identifier.includes("mtx")==true||res.response.docs[i].identifier.includes("matrix")==true){
            audType = "mtx"
        }
        else if(res.response.docs[i].identifier.includes("aud")==true||res.response.docs[i].identifier.includes("audience")==true){
            audType = "aud"
        }
        else{
            continue
        }

        //jesli wybreany typ nagrania nie pasuje do typu z pliku to pomin jego dodawaanie
        if(audType!=typeFilter && typeFilter!="any"){
            continue
        }
        typeCell.textContent = audType

        let idCell = document.createElement("td")
        idCell.textContent = res.response.docs[i].identifier
        idCell.classList.add("IDCell")
        


        //zrob addeventlistener
        // tableRow.addEventListener("click",(tableRow.getElementsByClassName("idCell"))=>{
        //     asdasdas
        // })




        tableRow.appendChild(nameCell)
        tableRow.appendChild(typeCell)
        tableRow.appendChild(idCell)

        tableRow.addEventListener("click",(el)=>{
            console.log(el.target.parentNode.getElementsByClassName("IDCell")[0].textContent)
            let showID = el.target.parentNode.getElementsByClassName("IDCell")[0].textContent
            document.getElementById("playerContent").src = "https://archive.org/embed/"+showID+"&playlist=1"
            document.getElementById("player").style.display = "block"
        })

        document.getElementById("resultsTable").appendChild(tableRow)
    }
    


    // SBD ONLY MODE - obsolete

    // for(let i=0;i<res.response.docs.length;i++){
    //     console.log(res.response.docs[i].identifier)

    //     //wybieranie recordingu z soundboarda
    //     if(res.response.docs[i].identifier.toLowerCase().includes("sbd")==true){

    //         identifier = res.response.docs[i].identifier
    //         break
    //     }
    // }

    // document.getElementById("playerContent").src = "https://archive.org/embed/"+identifier+"&playlist=1"
}



document.getElementById("getShowButton").addEventListener("click",async ()=>{
    getShow()
})