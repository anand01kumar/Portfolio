let title=document.getElementById("titeltext");
let blogtext=document.getElementById("blogtext");
let blogdata=document.getElementById("blogData");

// let key=prompt("Enetr key");
// let value=prompt("Enter Value")
// if(key=="name" || key=="" || value==""){
//   localStorage.removeItem(key)
// }
// else{
// localStorage.setItem(key,value);

// alert(`key : ${key} and value : ${localStorage.getItem(key)}`);
// }


 

function addBlog(){
  let data=JSON.parse(localStorage.getItem("add")) ||[];
  data.push({'title': title.value,'blogtext': blogtext.value,});
  localStorage.setItem("add",JSON.stringify(data));
  
  let modal=bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
  modal.hide();
  loadData();
  clearForm();
}
function loadData(){
  let data=JSON.parse(localStorage.getItem("add"))||[];
  blogdata.innerHTML="";
  let i=0;
  while(i<data.length){
    blogdata.innerHTML +=` <div class="col-sm-4 mt-3 mb-3" >
          <div class="card" style="height: 20rem; overflow-y: auto;">
  <div class="card-body">
    <h5 class="card-title fw-bold text-danger ">${data[i].title}</h5>
   
    <p class="card-text">${data[i].blogtext}</p>
    <a href="#" onclick="editBlog(${i})"class="card-link btn btn-success">Edit</a>
    <a href="#" onclick="delBlog(${i})" class="card-link btn btn-danger float-end">Delete</a>
  </div>
</div>
        </div>
      </div>`
      i++;
  }
}
loadData();
function delBlog(index){
  let data=JSON.parse(localStorage.getItem("add"))|| [];
  data.splice(index,1);
  localStorage.setItem("add",JSON.stringify(data));
  alert("Your Blog Deleted Sussecfully");
  loadData();
}
let editblog=null;
function editBlog(indexs){
  let data=JSON.parse(localStorage.getItem("add"))||[];
  editblog=indexs;
  title.value=data[indexs].title;
  blogtext.value=data[indexs].blogtext;
  let modal=new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
  document.getElementById("updateb").style.display="inline-block";
  document.getElementById("addb").style.display="none";


}
function updateBlog(){
   let data=JSON.parse(localStorage.getItem("add"))||[];
   data[editblog]={'title':title.value,'blogtext':blogtext.value};
   localStorage.setItem("add",JSON.stringify(data));
  let modal=bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
  modal.hide();
  title.value="";
  blogtext.value="";
    document.getElementById("updateb").style.display="none";
  document.getElementById("addb").style.display="inline-block";
  loadData();
}
function clearForm(){
  document.getElementById("title").value="";
  document.getElementById("blogtext").value="";
 
  let saves=document.querySelector("#exampleModal .btn-primary");
  saves.innerHTML="Add Blog";
  saves.onclick=addBlog();
 }
 function downloadCV() {
    // Replace with your actual CV file path
    window.location.href = "image/Anand Kumarr Resume.pdf";
}

