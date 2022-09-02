const allNews = () =>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => CatagoryList(data.data.news_category))
    .catch(error =>console.log(error))
 
}
const CatagoryList = all =>{
    console.log(all)
    const catagoryName = document.getElementById('catagory-Name');
    all.forEach(name => {
         const createCatagory = document.createElement('div')
         createCatagory.classList.add('col')
         createCatagory.innerHTML=`
         <a onclick="catagoryBtn('${name.category_id}')" class="w-100 fw-bold  text-decoration-none">${name.category_name}</a>
         `;
         catagoryName.appendChild(createCatagory)
    });
    
}
const catagoryBtn = id =>{
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
  .then(res => res.json())
  .then(call =>showCatagory(call.data[0]))

}
const showCatagory = show =>{
    console.log(show)
    const cardId = document.getElementById('cardIdCatagory');
    const createCard = document.createElement('card')
    createCard.classList.add('col')
    createCard.innerHTML=`
    <div class="card mb-3" style="max-width:100%;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${show.image_url}" class="img-fluid h-100 rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${show.title}</h5>
          <p class="card-text text-truncate" >${show.details.slice(0,500)}</p>
          <div class="d-flex">
          <img style="height:40px; width:40px" class=" m-3 img-fluid rounded-circle" src="${show.author.img}">
          <div>
          <span class="d-block mt-2" >${show.author.name}</span> 
          <span class="d-block">${show.author.published_date}</span>
          </div>
          
          </div>
          
      
         
        
        </div>
      </div>
    </div>
  </div>
    
    `;
    cardId.appendChild(createCard)

}

allNews()