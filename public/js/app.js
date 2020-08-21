// console.log('client side javascript')     
// fetch('http://puzzle.mead.io/puzzle') .then((response)=> {
//             response.json().then((data) => {
//                 console.log(data)

//             })

// })






const weatherform = document.querySelector('form')                  //define the form into a variable  
const search = document.querySelector('input')                 //define the form into a variable
const msg1 = document.querySelector('#name')                          //paraghrap on index.hbs
const msg2 = document.querySelector('#forecast')
const msg3 = document.querySelector('#lat')
const msg4 = document.querySelector('#long')





weatherform.addEventListener('submit', (event) => {              //click event on buttom form
    event.preventDefault()                                    //prevent to refresh the browser
    
    const location = search.value                                     //.value extract whatever the value on input form

    msg1.textContent = 'Loading.....'
    msg3.textContent = ''
    msg4.textContent = ''
    msg2.textContent = ''


    
    // console.log(location)
    fetch('http://localhost:3000/weather?address='+ location).then((response)=> {          //fetch funtion .then is to set up callback function

    response.json().then((data) => {                                        //response json parse the data
       
        if (data.error) {
        msg1.textContent = data.error
       
         }  else {
            
            // console.log(data.name)
            // console.log(data.forecast) 

            msg1.textContent = data.name
            msg3.textContent = 'Latitude: '+ data.lat +' N'
            msg4.textContent = 'Longitude: ' + data.long +' E'
            msg2.textContent = data.forecast
    
            }  
         })                          
    })  
})

