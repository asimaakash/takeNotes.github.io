console.log("This is a Project");

 // localStorage.clear();
showNotes();

// Adding event listner on clicking the button 
let btn = document.getElementById("addBtn");

btn.addEventListener("click",fun1);

// This function fun1() will be executed once button is clicked
function fun1(){
    let addTxt = document.getElementById("addTxt");   
    let noteTitle = document.getElementById("noteTitle")

    let text = addTxt.value;
    let titleText = noteTitle.value;
    
    // Getting the notes already entered from local storage
    let notes = localStorage.getItem("notes");    
    let title = localStorage.getItem("title");
    
    console.log(text);
    console.log(titleText);
    
    
    if(notes == null){    
      notesObj = [];    //If no note is present in local storage
      titleObj = [];
    }
    else{
      //If note is present in local storage get the notes and typecast it into Array
      notesObj = JSON.parse(notes);   
      titleObj = JSON.parse(title);
    }
    
    //Inserting current note to the previously inserted notes
    if(text!==""){

      notesObj.push(text);
    }
    else
    {

      notesObj.push("-");
    }

    if(titleText!==""){

      titleObj.push(titleText);
    }
    else{

      titleObj.push("NOtes");
    }


    //Set the updated notes to local storage by typecasting Array to string 
    localStorage.setItem("notes",JSON.stringify(notesObj));
    localStorage.setItem("title",JSON.stringify(titleObj));


    //Once "Add Notes" is clicked remove the text from textarea
    addTxt.value="";
    noteTitle.value="";
    // console.log(notesObj); 
    
    //To display the notes in Notes Section
    showNotes();

    
}

function showNotes(){

  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");

  // console.log(notes);
  
  if(notes == null){
    notesObj = [];
    titleObj = [];

}
else{
    notesObj = JSON.parse(notes);
    titleObj = JSON.parse(title);

}
  let html="";
  // let nobj = JSON.parse(notesObj);

  //Element will give the note from starting to end
  //We are setting Id of "Delete Node" button and adding onclick function to button
  //Onclick function deleteNote will be invoked once user click the button "Delete Node"

  for (let i = 0; i < notesObj.length; i++) {
    html+=`<div class="cardNote mx-2 my-2" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">${titleObj[i]}</h5> 
      <p class="card-text">${notesObj[i]}</p>
      <button id="${i}" onclick="deleteNote(this.id)" class="btn btn-success">Delete Notes</button>
    </div>
  </div>`;
  }
  // notesObj.forEach(function(element,index){
  //   html += `<div class="cardNote mx-2 my-2" style="width: 18rem">
  //   <div class="card-body">
  //     <h5 class="card-title">Note ${index+1}</h5> 
  //     <p class="card-text">${element}</p>
  //     <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Notes</button>
  //   </div>
  // </div>`;
  // })
  if(notesObj.length>0)
  {
    let noteEle = document.getElementById("notesArea");
    // inserting all notes as a child in div with id notesArea
    noteEle.innerHTML=html;
  }
  else{
    let noteArea = document.getElementById("notesArea");
    //If there is no notes to display
    noteArea.innerText = "Enter some notes above to view here";
  }
}

function deleteNote(index){
  let notes = localStorage.getItem("notes");
  let title = localStorage.getItem("title");

  if(notes == null){
    notesObj = [];
    titleObj = [];
  }
  else{
    notesObj = JSON.parse(notes);
    titleObj = JSON.parse(title);
  }

  //Deleting the Note whose "Delete Note" button is clicked
  notesObj.splice(index,1);
  titleObj.splice(index,1);
  

  //Modifying the local storage after deleting the note
  localStorage.setItem("notes",JSON.stringify(notesObj));
  localStorage.setItem("title",JSON.stringify(titleObj));

  //To display the remaining notes
  showNotes();
}

let search = document.getElementById("searchTxt");

//Function invoked once user start typing inside search box
searchTxt.addEventListener("input",function(){
  let searchVal = search.value;
  searchVal = searchVal.toLowerCase();
  // console.log(searchVal);
  
  
  let cardNotes = document.getElementsByClassName("cardNote");
  // console.log(ele);

  Array.from(cardNotes).forEach(function(element){
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    
    
    if(cardTxt.includes(searchVal))
    {
      element.style.display = "block";
    } 
    else{
      element.style.display = "none";
    }
  })

})


/*

  1. Add Title
  2. Add button to mark which node is importent
  3. Seperate nodes by users
*/