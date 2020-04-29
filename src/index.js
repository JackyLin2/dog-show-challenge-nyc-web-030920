document.addEventListener('DOMContentLoaded', () => {
    requestHeaders = {"accept": "application/json",
    "content-type": "application/json"}
    const registeredDog = document.getElementById("table-body")
    fetch("http://localhost:3000/dogs")
    .then((resp) => resp.json())
    .then((data) => {
       data.forEach(function(dog){
           let perDog = document.createElement("tr")
           let id = perDog.dataset.id = dog.id 
           perDog.innerHTML = `
           <tr><td>${dog.name}</td> 
           <td>${dog.breed}</td> 
           <td>${dog.sex}</td>
            <td><button id= ${dog.id}>Edit</button></td>
            </tr>
           `
           registeredDog.appendChild(perDog)
         const dogEdit = document.getElementById(`${dog.id}`)
         dogEdit.addEventListener('click', function(event){
            const dogForm = document.getElementById("dog-form")
           dogForm.name.value = `${dog.name}`
           dogForm.breed.value = `${dog.breed}`
           dogForm.sex.value = `${dog.sex}`
            })
        
            let submitDog = document.getElementById("dog-form")
        submitDog.addEventListener("submit",function(e){
            e.preventDefault()
            console.log(dog)
            const form = event.target 
            const name = form.name.value 
            const breed = form.breed.value
            const sex = form.sex.value 

            const newDog = {name, breed, sex}
           
        })

        function insertDog(newDog){
            fetch(`http://localhost:3000/dogs/${id}`, {
                method: "PATCH",
                headers: requestHeaders,
                body: JSON.stringify(newDog)
            })
            .then((resp) => resp.json())
            .then((dog) => {
                addDog(dog)
            })
        }

        function addDog(dog){
            let perDog = document.createElement("tr")
           let id = perDog.dataset.id = dog.id 
           perDog.innerHTML = `
           <tr><td>${dog.name}</td> 
           <td>${dog.breed}</td> 
           <td>${dog.sex}</td>
            <td><button id= ${dog.id}>Edit</button></td>
            </tr>
           `
           registeredDog.appendChild(perDog)
        }
       })
    })
})