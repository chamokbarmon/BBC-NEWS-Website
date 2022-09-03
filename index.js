
const allNews =async() =>{
    const url = (`https://openapi.programming-hero.com/api/news/categories`)
    try{
      const res =await fetch (url)
      const data = await res.json()
      CatagoryList(data.data.news_category)
     }
     catch(error){
      console.log(error);
     }   
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

const catagoryBtn =async id =>{
  toggleloder(true)
  const url=(`https://openapi.programming-hero.com/api/news/category/${id}`)
  try{
    const res =await fetch (url)
    const data = await res.json()
    showCatagory(data.data)
   }
   catch(error){
    console.log(error);
   } 
   

}

const showCatagory = show =>{
  console.log(show)

  const fountText = document.getElementById('itemNumber')
  fountText.innerText =show.length;

 

  
  const cardId = document.getElementById('cardIdCatagory');
  cardId.innerText ="";

  show.forEach(cards => {
    console.log(cards)
    const createCard = document.createElement('card')
 
    createCard.innerHTML=`
    <div class="card mb-3" style="max-width:100%;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${cards.thumbnail_url ? cards.thumbnail_url : "no image"}" class="img-fluid h-100 rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${cards.title}</h5>
          <p class="card-text text-truncate" >${cards.details.slice(0,500)}</p>
          <div class="d-flex">
          <img style="height:40px; width:40px" class=" m-3 img-fluid rounded-circle" src="${cards.author.img}">
          <div>
          <span class="d-block mt-2" >${cards.author ?cards.author.name :"No name" }</span> 
          <span class="d-block">${cards.author ? cards.author.published_date :"no date"}</span>
          </div >
            <div class="mt-3 ms-5">
            <p><i class="fa-sharp fa-solid fa-eye"></i><span>${cards.total_view ? cards.total_view :"no view" }</span></p>
            </div>
           <button onclick="dataDetailsid('${cards._id}')" class="btn btn-primary h-25 ms-5 mt-3"  data-bs-toggle="modal" data-bs-target="#modalId">Show Details</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    `;
    cardId.appendChild(createCard)
    toggleloder(false)


  });
  
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
    fetch(`https://openapi.programming-hero.com/api/news/${newId}`)
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


catagoryBtn('1')

allNews()
