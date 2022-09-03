const allNews = () =>{
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => CatagoryList(data.data.news_category))
    .catch(error =>console.log(error))
 
}
const CatagoryList = all =>{
   console.log(all)
   const catagoryName = document.getElementById('catagory-Name');
   const itemNumber =document.getElementById('itemNumber');
    const number = document.createElement('div')
    number.innerHTML=`
    <p class="text-primary fw-bold p-3">${all.length} items found for category Entertainment</p>
    `;
  
  all.forEach(name => {
    
    itemNumber.appendChild(number)
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
  toggleloder(true)
  

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
          <span class="d-block mt-2" >${show.author ?show.author.name :"No name" }</span> 
          <span class="d-block">${show.author ? show.author.published_date :"no date"}</span>
          </div >
            <div class="mt-3 ms-5">
            <p><i class="fa-sharp fa-solid fa-eye"></i><span>${show.total_view ? show.total_view :"no view" }</span></p>
            </div>
           <button onclick="dataDetailsid('${show._id}')" class="btn btn-primary h-25 ms-5 mt-3"  data-bs-toggle="modal" data-bs-target="#modalId">Show Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    `;
    cardId.appendChild(createCard)
    toggleloder(false)

}


const toggleloder = loading =>{
   const loderId = document.getElementById('loderId');
   if(loading){
    loderId.classList.remove('d-none');
   }
   else{
    loderId.classList.add('d-none')
   }

}
const dataDetailsid = newId =>{
    fetch(`https://openapi.programming-hero.com/api/news/${newId ? newId :"No Url"}`)
    .then(res => res.json())
    .then(data =>modalDetails(data.data[0]))
    .catch(error =>console.log(error))

}
 
const modalDetails = modal =>{
   console.log(modal);
   const modalIdTitle = document.getElementById('modalIdTitle');
   modalIdTitle.innerText =modal.title;
   const modalBody = document.getElementById('modal-body')
   modalBody.innerHTML=`
    <img class="img-fluid" src="${modal.image_url ? modal.image_url : " No image"}">  
    <p>${modal.author.name ? modal.author.name : "No Name"}</p>
    <p class="text-truncate">${modal.details}</p>
    <img  src="${modal.thumbnail_url}">
    <p>Thank you</p>
   `;
}




allNews()