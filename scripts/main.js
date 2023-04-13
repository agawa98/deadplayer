
let dzien = document.getElementById("dzien").value
let miesiac = document.getElementById("miesiac").value
let rok = document.getElementById("rok").value
let typeFilter = document.getElementById("recordingType").value
let sortBy = document.getElementById("sortBy").value



async function getShow(){

    // wyczysc divy przed wlozeniem nastepnych danych
    clear()

    let data = await fetch("https://archive.org/advancedsearch.php?q=grateful+dead+"+rok+"-"+miesiac+"-"+dzien+"&fl%5B%5D=avg_rating&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=100&page=1&output=json&save=yes")
    let res = await data.json()
    console.log(res)


    //todo: znajdz najblizszy show w przod i w tyul w wypadku gdy nie ma go w  danej dacie

    if(res.response.numFound == 0){
        alert("nie znaleziono show w tym dniu")
        return
    }


    //sorter
    
    let sortedArray = sorter(res.response)



    for(let i=0; i<sortedArray.length; i++){
        if(i==0){

            //         TABLE HEADER
            let nameCell = document.createElement("td")
            nameCell.textContent = "Recording Title"

            let typeCell = document.createElement("td")
            typeCell.textContent = "Recording Type"

            let idCell = document.createElement("td")
            idCell.textContent = "Recording ID"

            let downloadsCell = document.createElement("td")
            downloadsCell.textContent = "Downloads"

            let ratingCell = document.createElement("td")
            ratingCell.textContent = "Avg rating"
            
            

            let tableRow = document.createElement("tr")

            tableRow.style.backgroundColor = "#fa1f0f"
            tableRow.style.color = "white"
            tableRow.style.cursor = "default"

            tableRow.appendChild(nameCell)
            tableRow.appendChild(typeCell)
            tableRow.appendChild(idCell)
            tableRow.appendChild(downloadsCell)
            tableRow.appendChild(ratingCell)

            document.getElementById("resultsTable").appendChild(tableRow)

            //      TABLE HEADER

        }
        console.log("asdasd")
        let tableRow = document.createElement("tr")
        tableRow.classList.add("showRecord")


        
        let nameCell = document.createElement("td")
        nameCell.textContent = sortedArray[i].title



        let typeCell = document.createElement("td")
        let audType
        if(sortedArray[i].identifier.includes("sbd")==true||sortedArray[i].identifier.includes("soundboard")==true){
            audType = "sbd"
        }
        else if(sortedArray[i].identifier.includes("mtx")==true||sortedArray[i].identifier.includes("matrix")==true){
            audType = "mtx"
        }
        else if(sortedArray[i].identifier.includes("aud")==true||sortedArray[i].identifier.includes("audience")==true){
            audType = "aud"
        }
        else{
            console.log("pominalem bo nie ma typu w id "+sortedArray[i].title+ " , " + sortedArray[i].identifier)
            continue

        }

        //jesli wybreany typ nagrania nie pasuje do typu z pliku to pomin jego dodawaanie do tabelki
        if(audType!=typeFilter && typeFilter!="any"){
            console.log("pominalem bo typ zly - "+sortedArray[i].title+ " , " + sortedArray[i].identifier)
            continue
            
        }
        typeCell.textContent = audType



        let idCell = document.createElement("td")
        if(sortedArray[i].identifier.includes(rok-1900+"-"+miesiac+"-"+dzien)==false){
            console.log("pominalem bo data zla - "+sortedArray[i].title+ " , " + sortedArray[i].identifier)
            continue
        }
        idCell.textContent = sortedArray[i].identifier
        idCell.classList.add("IDCell")



        let downloadsCell = document.createElement("td")
        downloadsCell.textContent = sortedArray[i].downloads



        let ratingCell = document.createElement("td")
        ratingCell.textContent = sortedArray[i].avg_rating
        


        tableRow.appendChild(nameCell)
        tableRow.appendChild(typeCell)
        tableRow.appendChild(idCell)
        tableRow.appendChild(downloadsCell)
        tableRow.appendChild(ratingCell)
        

        tableRow.addEventListener("click",(el)=>{
            console.log(el.target.parentNode.getElementsByClassName("IDCell")[0].textContent)
            let showID = el.target.parentNode.getElementsByClassName("IDCell")[0].textContent
            document.getElementById("playerContent").src = "https://archive.org/embed/"+showID+"&playlist=1"
            document.getElementById("player").style.display = "block"

            // positionPlayer()
        })

        document.getElementById("resultsTable").appendChild(tableRow)
    }
}

function sorter(arrayToSort){

    //          TODO: DODAJ OPCJE WYBRANIA SORTOWANIA ALBO DOWNLOADSY ALBO RATING, RATING MOZE WAZONY?

    let unsortedArray = []
    let sortedArray = []    // array z posortowanymi showami
    

    //umieszczenie wszystkich elementow do arraya aby pozniej mozna bylo je usuwac

    // uwaga: sorter jest przeznaczony do obiektow json ktore sa zwracane rzez query w intenret archive,
    // wiec [array].numFound to liczba itemkow w arrayu, a .docs[i] to dany itemek iterowany

    for(let i=0; i<arrayToSort.numFound; i++){
        console.log("s")
        unsortedArray.push(arrayToSort.docs[i])
    }

    for(let i=0; i<unsortedArray.length; i++){
        if(i==0){                                    //tylko za pierwszym razem
            sortedArray.push(unsortedArray[i])
            continue
        }
        if(unsortedArray[i].downloads>sortedArray[0].downloads){      //kiedy jest wieksze od najwiekszego w sorted
            sortedArray.unshift(unsortedArray[i])
            continue
        }
        if(unsortedArray[i].downloads < sortedArray[sortedArray.length-1].downloads){     //kiedy jest mniejsze od najmniejszego w sorted
            sortedArray.push(unsortedArray[i])
            continue
        }
        else{                                                           //kiedy jest jakos w srodku
            for(let j=sortedArray.length-1; j>=0;j--){    // j=1 poniewaz przy wykonywaniu tej petli jest zapewniony przynajmniej jeden element w arrayu
                if(unsortedArray[i].downloads>sortedArray[j].downloads){      //kiedy unsroted jest wieksze od current sorted - idzie do gory
                    continue
                }
                if(unsortedArray[i].downloads<=sortedArray[j].downloads){       //kiedy unsorted jest 
                    sortedArray.splice(j+1,0,unsortedArray[i])
                    break
                }
            }
        }
    }
    console.log(sortedArray)
    return sortedArray
}

function clear(){
    //czyszczenie tabeli oraz playera
    document.getElementById("resultsTable").innerHTML = ""

    document.getElementById("playerContent").src = ""
}


//retired
function positionPlayer(){
    console.log("sdsda")

    
    // sczytywanie szerokosci playera

    let player = document.getElementById("playerContent")
    let playerHeight = document.getElementsByClassName("maudioEmbed")[0].clientHeight
    let playerWidth = document.getElementsByClassName("maudioEmbed")[0].clientWidth
    console.log(playerWidth + ", " + playerHeight)

    let playerContainer = document.getElementById("player")

    playerContainer.style.height = playerHeight + "px"
    playerContainer.style.width = playerWidth + "px"
    playerContainer.style.bottom = "0px"
    playerContainer.style.right = "0px"

    document.getElementsByClassName("jw-button-container")[0].clientHeight


    
}




document.getElementById("getShowButton").addEventListener("click",async ()=>{
    getShow()
})