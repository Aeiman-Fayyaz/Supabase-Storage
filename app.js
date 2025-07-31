const supabaseUrl = "https://hwyofckifjeewvmagsgc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3eW9mY2tpZmplZXd2bWFnc2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzk0MDcsImV4cCI6MjA2NzAxNTQwN30.pvsjYctkRI7NHdJrSuatOb-oLoatl8dIZfHUKv74gvE";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);
console.log(createClient);

// Signup Functionality
const signUp = document.getElementById("signUp")

// use addEventListener

signUp && signUp.addEventListener("click" , async () => {
  // Getting user details and store in variables
  const fullName = document.getElementById("fullName")
  console.log(fullName);
  const emailAdress = document.getElementById("emailAdress")
  console.log(emailAdress);
  const userPassword = document.getElementById("userPassword")
  console.log(userPassword);
  const userProfilePic = document.getElementById("userProfilePic")
  console.log(userProfilePic);

  // Getting User Data and destructuring
  const {data : { user }} = await client.auth.getUser()
  console.log(user);

  // Set file extension for saving, update and delete
  const fileExt = userProfilePic.files[0].name.split('.')[1]
  console.log(fileExt);
  
  // Signup Authentication
  if(emailAdress && userPassword){
    try{
      // Again getting user data when user signup account
      const {data : { user } , error} = await client.auth.signUp(
       {
        // Set value of user email and password by using destructuring method
        email : emailAdress.value , 
        password : userPassword.value
      })

    }catch{

    }
  }
})