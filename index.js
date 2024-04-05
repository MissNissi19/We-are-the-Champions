// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "insert your firestore database url"
        
    
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const phrasesListInDB = ref(database, "phrases")

const input = document.getElementById("input")
const publishBtn = document.getElementById("publish-btn")
const phrasesLists = document.getElementById("phrases-lists")

publishBtn.addEventListener("click", function(){
    let inputValue = input.value
    console.log(inputValue)
    
    push(phrasesListInDB, inputValue)
    clearInput()
    
})

onValue(phrasesListInDB, function(snapshot) {
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearPhrasesLists()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToPhrasesLists(currentItem)
        }    
    }else {
        phrasesLists.innerHTML = "Nothing..."
    }
})

function clearPhrasesLists() {
    phrasesLists.innerHTML = ""
}

function clearInput() {
    input.value = ""
}
function appendItemToPhrasesLists(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    newEl.dataset.firestoreId = itemID
    
    phrasesLists.append(newEl)


    
}

document.addEventListener("click", function(e){
  const target = e.target.closest("li"); 

  if(target){
    const database = getDatabase();
    const docReference = ref(database, `phrases/${target.dataset.firestoreId}`)

    remove(docReference).then(resp => {
        console.log(`Successfully deleted ${target.dataset.firestoreId}`);
    })

  }
});
