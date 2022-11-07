
var trash = document.getElementsByClassName("material-symbols-outlined");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const fName = element.parentElement.innerText
        const lName = element.parentElement.innerText
        const wEmail = element.parentElement.parentElement.children[1].children[0].innerText
        const pEmail = element.parentElement.parentElement.children[1].children[1].innerText
        const pNum = element.parentElement.parentElement.children[1].children[2].innerText
        const wNum = element.parentElement.parentElement.children[1].children[3].innerText
        const addy = element.parentElement.parentElement.children[1].children[4].innerText
        fetch('trash', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          'firstName':fName, 
          'lastName':lName, 
          'workEmail':wEmail, 
          'personalEmail':pEmail,  
          'personalPhone':pNum, 
          'workPhone':wNum,
          'address':addy
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
