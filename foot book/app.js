const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-player");

//create element and render the data in the document
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let age = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    age.textContent = doc.data().age;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(age);
    li.appendChild(cross);

    cafeList.appendChild(li);
    // deleting data
cross.addEventListener('click', (e) =>{
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('cafes').doc(id).delete();
    })

}


// getting data
//db.collection('cafes').where('name' ,'>', 'a').get().then((snapshot) => {
//snapshot.docs.forEach(doc => {
  //renderCafe(doc);
//})
//})



// saving data
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    db.collection('cafes').add({
        name : form.name.value,
        age : form.age.value
    })
    form.name.value = '';
form.age.value = '';
});




//real Time Listener
db.collection('cafes').orderBy('name').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        }else
           if(change.type == 'removed'){
               let li = cafeList.querySelector('[data-id = ' + change.doc.id + ' ]');
               cafeList.removeChild(li);
           }
    })
})