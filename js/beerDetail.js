import {getDetails, addLike } from './api.js'
import storage from './storage.js';

const {setItem, getItem} = storage();

const detailTemplate = ({name, image, likes, comments, description, firstBrewed, price, brewersTips} = {}, malt, hops) => {
    return `
    <section class="detail-wrapper">
    <div class="img-container">
        <img src="${image}">
    </div>	
    <header class="beer-header">
    <h1>${name}</h1>
    <div class="underlying">
        <div class="social-info">
         <i class="pill icofont-like"></i>
         <p class="pill likes-num">${likes}</p>
         <label for="text-area"><i class="pill icofont-speech-comments"></i></label>
         <p class="pill comments-num">${comments.length}</p>
     </div>
     <div class="price-tag">
         <h2 class="price">${price}€</h2>
     </div>
    </div>
 <article>${description}</article>
</header>
<div class="more-info">
    <p class="beer-date"> <span class="info-header">Firstly brewed on: </span>${firstBrewed}</p>
    <p class="brewers-tip"><span class="info-header">Brewer tip: </span>${brewersTips}</p>
    <p class="ingredients"><span class="info-header">Ingredients:</span> malt (<span class="ingredients-detail">${malt} </span>), hops (<span class="ingredients-detail">${hops}</span>)</p>      			
</div>
</section>
<section class="comment-container">
    <form id="comment-form" class="comment-form" novalidate>
        <div class="comment-input">
            <label for="text-area">Any comment? </br> Go ahead and let us know</label>
            <textarea required id="text-area" placeholder="Add your beer review here" form="comment-form" minlength=10 maxlength=250></textarea>
        </div>
        <button type="submit" class="send-button">Add comment</button>
    </form>
    
    <div class="comments-list">
    </div>
</section>
`};


const renderDetails = async id => {
    const detail = await getDetails(id);
    //console.log(detail);
    const {ingredients: {malt, hops}} = detail;

    const maltList = malt.map(item => item.name);
    const hopsList = hops.map(item => item.name);

    const mainContainer = document.querySelector("main");    

    mainContainer.innerHTML = detailTemplate(detail, maltList, hopsList);

    const thumbUp = document.querySelector(".icofont-like");
    const likesNum = document.querySelector(".likes-num")

    const liker = evt => {
        
    addLike(id); 
    thumbUp.classList.add("liked")
    likesNum.innerText = parseInt(likesNum.innerText) + 1;
    thumbUp.removeEventListener('click', liker)

    }
   
    getItem(id) !== "liked" ?  thumbUp.addEventListener("click", liker) : thumbUp.classList.add("liked");

};

export default renderDetails;

/*
const getNamer = (array) => {
    
    const newArray = []

    for(let i = 0; i < array.length; i++) {
       newArray.push(` ${array[i].name}`)
    }
    return newArray;
}*/