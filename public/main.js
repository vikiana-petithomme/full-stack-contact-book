
var trash = document.getElementsByClassName("material-symbols-outlined");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const fName = element.parentElement.children[1].innerText
        console.log(fName)
        const lName = element.parentElement.children[0].innerText
        const wEmail = element.parentElement.parentElement.children[1].children[0].innerText
        const pEmail = element.parentElement.parentElement.children[1].children[1].innerText
        const pNum = element.parentElement.parentElement.children[1].children[2].innerText
        const wNum = element.parentElement.parentElement.children[1].children[3].innerText
        const addy = element.parentElement.parentElement.children[1].children[4].innerText
        
        const _id = element.parentElement.getAttribute('id')

        console.log('this is id', _id)
        
        
        /*fetch('trash', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
         
          })
        }).then(function (response) {
          window.location.reload()
        })
      });*/
      fetch('trash', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'firstName':fName.trim(), 
          'lastName':lName, 
          'workEmail':wEmail, 
          'personalEmail':pEmail,  
          'personalPhone':pNum, 
          'workPhone':wNum,
          'address':addy,
           _id
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
})
