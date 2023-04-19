
let dzien, miesiac, rok, typeFilter, sortBy, showID, direction
let loadingToggle = false

let showArray = []

document.getElementById("getNextShow").disabled = true
document.getElementById("getPrevShow").disabled = true




//autoclicker
setInterval(()=>{
    document.getElementById("getNextShow").click()
},300)




function setDate(){                 // musialem to rozdzielic bo konfliktowalo z szukaniem w przod/tyl
    dzien = document.getElementById("dzien").value
    miesiac = document.getElementById("miesiac").value
    rok = document.getElementById("rok").value
}

async function getShow(){

    console.log("---------START "+dzien+"-"+miesiac+"-"+rok)

    
    typeFilter = document.getElementById("recordingType").value

    // wyczysc divy przed wlozeniem nastepnych danych
    clear()

    if(dzien.toString().length==1){
        dzien="0"+dzien
    }
    if(miesiac.toString().length==1){
        miesiac="0"+miesiac
    }

    let query = "https://archive.org/advancedsearch.php?q=grateful+dead+"+rok+"-"+miesiac+"-"+dzien+"&fl%5B%5D=avg_rating&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=&sort%5B%5D=&sort%5B%5D=&rows=100&page=1&output=json&save=yes"
    
    console.log(query)

    document.getElementById("showDate").textContent = dzien+"-"+miesiac+"-"+rok

    let data = await fetch(query)
    let res = await data.json()
    
    console.log(direction)
    console.log(res)



    // triggeruje gdy direction jest juz ustalony (po kliknievciu przycisku)
    if((direction=="next"||direction=="prev")&&res.response.numFound==0){
        getPrevNextShow(direction)
        return
    }


    if(res.response.numFound == 0){
        document.getElementById("resultsTable").textContent = "no show was found on "+dzien+"-"+miesiac+"-"+rok
        loading()
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
        let tableRow = document.createElement("tr")
        tableRow.classList.add("showRecord")


        
        let nameCell = document.createElement("td")
        nameCell.textContent = sortedArray[i].title

        //z bomby odrzuc wszystko co nie jest koncertem gd (jakies ratdogi albo cos)
        if(sortedArray[i].identifier.toLowerCase().includes("gd")==false){
            console.log("pominalem bo to nie koncert gd - "+sortedArray[i].title+ " , " + sortedArray[i].identifier)
            continue
        }


        let typeCell = document.createElement("td")
        let audType
        if(sortedArray[i].identifier.toLowerCase().includes("sbd")==true||sortedArray[i].identifier.toLowerCase().includes("soundboard")==true){
            audType = "sbd"
        }
        else if(sortedArray[i].identifier.toLowerCase().includes("mtx")==true||sortedArray[i].identifier.toLowerCase().includes("matrix")==true){
            audType = "mtx"
        }
        else if(sortedArray[i].identifier.toLowerCase().includes("aud")==true||sortedArray[i].identifier.toLowerCase().includes("audience")==true){
            audType = "aud"
        }
        else if(sortedArray[i].identifier.toLowerCase().includes("gd")==true){
            

            audType = "unknown"

        }
        else{
            // console.log("pominalem bo nie ma typu w id "+sortedArray[i].title+ " , " + sortedArray[i].identifier)
            // continue
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
            showID = el.target.parentNode.getElementsByClassName("IDCell")[0].textContent
            document.getElementById("playerContent").src = "https://archive.org/embed/"+showID+"&playlist=1"
            document.getElementById("player").style.display = "block"

            // positionPlayer()
        })

        document.getElementById("resultsTable").appendChild(tableRow)

        
    }

    console.log(document.getElementById("resultsTable").children.length)
        
    if(document.getElementById("resultsTable").children.length==1){
        console.log("RESTARTED!")
        getPrevNextShow(direction)
        return
    }

    direction = null

    
    showArray.push(dzien+"-"+miesiac+"-"+rok)

    loading()
    console.log("robie koniec getshow")

   


    // document.getElementById("showNotFound").style.display = "none"
}

function loading(){
    if(loadingToggle==false){
        document.getElementById("uncleSamGif").style.height = "300px"

        //wylaczenie przyciskow aby uzytkownik nie spamowal
        for(let i=0;i<document.getElementsByClassName("formButtons").length;i++){
            document.getElementsByClassName("formButtons")[i].disabled = true
        }
        loadingToggle=true
        
    }else if(loadingToggle==true){
        document.getElementById("uncleSamGif").style.height = "0px"
        //wlaczenie przyciskow 
        for(let i=0;i<document.getElementsByClassName("formButtons").length;i++){
            document.getElementsByClassName("formButtons")[i].disabled = false
        }
        loadingToggle=false
    }

    console.log(loadingToggle)
}

async function getPrevNextShow(direction){  // direction - szukamy w tyl czy w przod


    console.log("####### START GETPREVNEXT")

    // szukanie nastepnego dnia
    console.log(direction)

    if(direction=="next"){
        dzien++
        if(dzien>31){
            dzien=1
            miesiac++
            if(miesiac>12){
                miesiac=1
                rok++
                if(rok==1980&&miesiac==7&&dzien==10){
                    let divek = document.getElementById("arrayContainer")
                    for(let i=0;i<showArray.length;i++){
                        divek.textContent += showArray[i]
                    }
                }
            }
        }
    }
    if(direction=="prev"){
        console.log(dzien)
        dzien--
        if(dzien<1){
            dzien=31
            miesiac--
            if(miesiac<1){
                miesiac=12
                rok--
            }
        }
    }

    if(dzien.length==1){
        dzien = "0"+dzien
    }


    await getShow()
}

function sorter(arrayToSort){       //arrayToSort - array do posortowania    sortByWhat - sortuj przez co(downloads/rating)


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


document.getElementById("getPrevShow").addEventListener("click", async ()=>{
    direction = "prev"
    loading()
    getPrevNextShow(direction)
})

document.getElementById("getNextShow").addEventListener("click", async (el)=>{
    direction = "next"
    loading()
    getPrevNextShow(direction)
})

document.getElementById("getShowButton").addEventListener("click",async ()=>{
    loading()
    setDate()
    getShow()
})