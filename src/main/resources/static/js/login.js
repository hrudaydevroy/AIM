/* ================= ROLE CHANGE ================= */

function changeRole(){

 const role=document.getElementById("role").value;

 const nameField=document.getElementById("name");
 const usernameField=document.getElementById("username");
 const batchField=document.getElementById("batch");

 const emailField = document.getElementById("email");
 const studentHelp = document.getElementById("studentHelp");

 if(role==="student"){
   usernameField.style.display="block";
   usernameField.placeholder="Username (Unique ID)";
   batchField.style.display="block";
   batchField.placeholder="Batch (e.g., Batch-1, Batch-2)";
   nameField.style.display="none";
   emailField.style.display="none";
   if(studentHelp) studentHelp.style.display="block";
 }
 else if(role==="admin"){
   nameField.style.display="block";
   usernameField.style.display="none";
   batchField.style.display="none";
   emailField.style.display="block";
   if(studentHelp) studentHelp.style.display="none";
 }
 else if(role==="sales"){
   nameField.style.display="none";
   usernameField.style.display="none";
   batchField.style.display="none";
   emailField.style.display="block";
   if(studentHelp) studentHelp.style.display="none";
 }

 const msg=document.getElementById("msg");
 if(msg){
   msg.innerText="";
   msg.style.color="";
 }
}

// Run on page load so correct fields show for default role (Sales)
if(document.readyState==="loading"){
 document.addEventListener("DOMContentLoaded",changeRole);
}else{
 changeRole();
}

function login(){

 const role=document.getElementById("role").value;
 const name=document.getElementById("name").value;
 const email=document.getElementById("email").value;
 const password=document.getElementById("password").value;
 const username=document.getElementById("username").value;
 const batch=document.getElementById("batch").value;
 const msg=document.getElementById("msg");
 if(!msg){ console.error("Login: #msg element not found"); return; }

 msg.innerText="Checking...";

 /* ================= ADMIN ================= */

 if(role==="admin"){

  if(!name || !email || !password){
     msg.innerText="Please fill all fields";
     msg.style.color="#ef4444";
     return;
  }

  if(name==="admin" && email==="admin@gmail.com" && password==="admin123"){
     localStorage.setItem("role","admin");
     localStorage.setItem("email",email);
     msg.innerText="Login Success ✅";
     msg.style.color="#10b981";
     setTimeout(()=>{ window.location="admin.html"; },500);
  }else{
     msg.innerText="Invalid Admin Login";
     msg.style.color="#ef4444";
  }
  return;
 }

 /* ================= SALES ================= */

 if(role==="sales"){

  if(!email || !password){
     msg.innerText="Please enter email and password";
     msg.style.color="#ef4444";
     return;
  }

  msg.innerText="Logging in...";
  msg.style.color="#2563eb";

  fetch("http://localhost:8080/api/auth/login",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({email,password})
  })
  .then(res => {
     if(!res.ok) {
       return res.json().then(data => { throw new Error(data.msg || "Login failed"); });
     }
     return res.json();
  })
  .then((data)=>{

     if(data.token){
       localStorage.setItem("token",data.token);
       localStorage.setItem("role",data.role || "sales");
       localStorage.setItem("email",email);
     }

     msg.innerText="Login Success ✅";
     msg.style.color="#10b981";
     setTimeout(()=>{ window.location="sales.html"; },500);
  })
  .catch((err)=>{
     console.error("Login error:",err);

     if(err.message && err.message.includes("fetch")){
       msg.innerText="Cannot connect to server. Make sure backend is running on port 5000";
     }else{
       msg.innerText=err.message || "Sales Login Failed";
     }

     msg.style.color="#ef4444";
  });

  return;
 }

 /* ================= STUDENT ================= */

 if(role==="student"){

  if(!username || !password || !batch){
     msg.innerText="Please fill all fields";
     msg.style.color="#ef4444";
     return;
  }

  if(!batch.match(/^Batch-[123]$/i)){
     msg.innerText="Batch format incorrect! Use: Batch-1, Batch-2, or Batch-3";
     msg.style.color="#ef4444";
     return;
  }

  msg.innerText="Logging in...";
  msg.style.color="#2563eb";

  const loginData={
     username:username.trim(),
     password:password.trim(),
     batch:batch.trim()
  };

  fetch("http://localhost:8080/api/auth/student-login",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify(loginData)
  })
  .then(res => {
     if(!res.ok) {
       return res.json().then(data => { throw new Error(data.msg || "Invalid credentials"); });
     }
     return res.json();
  })
  .then((student)=>{
     const id = student?._id || student?.id || student?.student?._id;
     if(!id){
       throw new Error("Login succeeded but student id missing. Please contact admin.");
     }

     localStorage.setItem("studentId",id);
     localStorage.setItem("studentName",student?.name || student?.student?.name || "");
     localStorage.setItem("studentBatch",student?.batch || student?.student?.batch || "");
     localStorage.setItem("studentUsername",student?.username || student?.student?.username || "");
     localStorage.setItem("role","student");

     msg.innerText="Login Success ✅";
     msg.style.color="#10b981";

     setTimeout(()=>{ window.location="student-dashboard.html"; },500);
  })
  .catch((err)=>{
     console.error("Student login error:",err);

     if(err.message && err.message.includes("fetch")){
       msg.innerText="Cannot connect to server. Make sure backend is running on port 5000";
     }else{
       msg.innerText=err.message || "Student Login Failed";
     }

     msg.style.color="#ef4444";
  });

 }
}
