function register(){

 const name=document.getElementById("name").value;
 const email=document.getElementById("email").value;
 const password=document.getElementById("password").value;
 const msg=document.getElementById("msg");

 // Validation
 if(!name || !email || !password){
   msg.innerText="Please fill all fields";
   msg.style.color="#ef4444";
   return;
 }

 if(password.length < 6){
   msg.innerText="Password must be at least 6 characters";
   msg.style.color="#ef4444";
   return;
 }

 msg.innerText="Registering...";
 msg.style.color="#2563eb";

 fetch("http://localhost:8080/api/auth/register",{
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body:JSON.stringify({
     name:name,
     email:email,
     password:password
   })
 })
 .then(async res=>{
   const data = await res.json();
   if(!res.ok) {
     throw new Error(data.msg || "Registration failed");
   }
   return data;
 })
 .then((data)=>{
   msg.innerText="Registration Success ✅";
   msg.style.color="#10b981";
   setTimeout(()=>{
     window.location="login.html";
   },1500);
 })
 .catch((err)=>{
   console.error("Registration error:", err);
   if(err.message && err.message.includes("fetch")){
     msg.innerText="Cannot connect to server. Make sure backend is running on port 5000";
   } else {
     msg.innerText=err.message || "Register Failed ❌";
   }
   msg.style.color="#ef4444";
 });

}
