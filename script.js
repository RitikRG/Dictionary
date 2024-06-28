const searchForm = document.getElementById('searchForm');
const inputFeild = document.getElementById('inputFeild');
const resultContainer = document.getElementById('resultContainer');
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const sound = document.getElementById('sound');

// making variales for the markup


const fetchData=(input)=>{
    let markup, wordType, meaning, example;
    fetch(`${url}${input}`).then((response)=>response.json()).then((data)=>{
        console.log(data);
        if(data.title=='No Definitions Found'){
            resultContainer.innerHTML=`<h2>No results found</h2>`;
        }else{
            wordType = data[0].meanings[0].partOfSpeech + " " + (data[0].phonetic||'');
            meaning = data[0].meanings[0].definitions[0].definition;
            example = data[0].meanings[0].definitions[0].example||'Example Not available';
            sound.setAttribute('src', data[0].phonetics[0].audio);
            
            resultContainer.innerHTML=`
            <div id="wordTitle">
                <p id="word">${input}</p>
                <button onclick='playSound()'><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <p id="wordType">${wordType}</p>
            <p id="wordMeaning">${meaning}</p>
            <div id="wordExample">
                <p>${example}</p>
            </div>

            `;
        }
        

        
    });
}



// Audio file prep
const playSound=()=>{
    sound.play();
}

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let searchedWord = inputFeild.value;
    if(inputFeild.value!=''){
       fetchData(searchedWord);
    }
    inputFeild.value='';
    

})