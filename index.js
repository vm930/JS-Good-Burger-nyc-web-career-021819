document.addEventListener("DOMContentLoaded", () => {
  //Implement Your Code Here
  let burgers 
  const burgerMenuTag = document.querySelector("#burger-menu")
  const orderUlTag = document.querySelector("#order-list")
  const formTag = document.querySelector("#custom-burger")
  const burgerInputTag = document.querySelector("#burger-name")
  const descInputTag = document.querySelector("#burger-description")
  const imageInputTag = document.querySelector("#burger-image")

  // const menuDiv = document.querySelector(".menu")

  fetch("http://localhost:3000/burgers")
  .then(res=>res.json())
  .then(function(json){
    burgers = json
    json.forEach(function(burger){
      burgerMenuTag.innerHTML += `
      <div class="burger">
      <h3 class="burger_title">${burger.name}</h3>
        <img src=${burger.image}>
        <p class="burger_description">
          ${burger.description}
        </p>
        <button class="button">Add to Order</button>
    </div>
    `
    })//end of foreach
    
    burgerMenuTag.addEventListener("click",function(e){
      
      if (e.target.className === "button"){
        const burgerH3Tag = e.target.parentNode.querySelector("h3")
        //create the list under orderUlTag
        const newLiTag = document.createElement("li")
        newLiTag.innerText = burgerH3Tag.innerText
        orderUlTag.appendChild(newLiTag)
      }
      
    })//end of event lisner for burger menu

    formTag.addEventListener("submit",function(e){
      e.preventDefault()
      
      let burgerInput = burgerInputTag.value
      let descInput = descInputTag.value
      let imageInput = imageInputTag.value

      //create a new card of burger for this custom burger input
      burgerMenuTag.innerHTML += `
        <div class="burger">
        <h3 class="burger_title">${burgerInput}</h3>
          <img src=${imageInput}>
          <p class="burger_description">
            ${descInput}
          </p>
          <button class="button">Add to Order</button>
      </div>
    `
      //send a post request to database 
      fetch("http://localhost:3000/burgers",{
        method:"POST",
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          "name": burgerInput,
          "description": descInput,
          "image": imageInput
        })
      })//end of fetch
      
      // console.log(burgerInput)
      // console.log(descInput)
      // console.log(imageInput)

    })//end of formTag



  })
  
})//end of dom contentloaded
