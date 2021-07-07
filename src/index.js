console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
const dogArr = [];

function parseImg() {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => json.message.forEach(element => {
        createDogImage(element);
    }));
}


function createDogImage(dog) {
    let dogPic = document.createElement('img');
    let dogPicList = document.createElement('ul');
    let dogPicLi = document.createElement('li');
    
    dogPic.src = dog
    dogPicLi.append(dogPic);
    dogPicList.append(dogPicLi);
    document.querySelector("#dog-image-container").append(dogPicList)
}


function parseDogBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(function(json){
        console.log(json)
        addDogsToSite(json.message)
    })
}


function addDogsToSite(dogObj) {
    for(currentDog in dogObj) {
        if(dogObj[currentDog].length > 0){
            dogObj[currentDog].forEach(dog => {
                let dogStr = `${dog} ${currentDog}`
                addDogLi(dogStr);
                dogArr.push(dogStr);
            })
        }
        else{
            addDogLi(currentDog);
            dogArr.push(currentDog);
        }
    }
}
parseImg();
parseDogBreeds();

function addDogLi(currentBreed) {
    let dogLi = document.createElement('li');
    dogLi.textContent= currentBreed;
    dogLi.className = "dog-list"
    document.getElementById("dog-breeds").append(dogLi);

    dogLi.addEventListener('click', () => dogLi.style.color = "blue");
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('breed-dropdown').onchange = function(){
        let val = this.value;
        let list = document.getElementById("dog-breeds");
        while(list.firstChild){
            list.removeChild(list.firstChild);
            // list.removeChild(".dog-list");
        }
        dogArr.forEach(dog => {
            if(dog[0] === val){
                addDogLi(dog);
            }
        })
    }
})