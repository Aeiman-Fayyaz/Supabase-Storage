const supabaseUrl = "https://hwyofckifjeewvmagsgc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3eW9mY2tpZmplZXd2bWFnc2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzk0MDcsImV4cCI6MjA2NzAxNTQwN30.pvsjYctkRI7NHdJrSuatOb-oLoatl8dIZfHUKv74gvE";

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);
console.log(createClient);

// Signup Functionality
const signUp = document.getElementById("signUp");

// use addEventListener

signUp &&
  signUp.addEventListener("click", async () => {
    // Getting user details and store in variables
    const fullName = document.getElementById("fullName").value;
    const emailAdress = document.getElementById("emailAdress").value;
    const userPassword = document.getElementById("userPassword").value;
    const userProfilePic = document.getElementById("userProfilePic");

    // Getting User Data and destructuring
    const {
      data: { user },
    } = await client.auth.getUser();
    console.log(user);

    // Set file extension for saving, update and delete
    const fileExt = userProfilePic.files[0].name.split(".")[1];
    console.log(fileExt);

    // Signup Authentication
    if (emailAdress && userPassword) {
      try {
        // Again getting user data when user signup account
        const {
          data: { user },
          error,
        } = await client.auth.signUp({
          // Set value of user email and password by using destructuring method
          email: emailAdress,
          password: userPassword,
        });
        if (user) {
          console.log(user);
          // Destructuring Profile data name
          const { data: profileUrl, error } = await client.storage.from('profilepic')
          .upload(`Avatars/user-${user.id}.${fileExt}` , userProfilePic.files[0],{
            upsert: true 
          });
          if(error){
            console.log(error);
          }else{
            console.log("upload data:" , profileUrl);

            // Getting Profile URL
            const {data : {pulicUrl}} = client.storage.from('profilepic').getPublicUrl(`Avatars/user-${user.id}.${fileExt}`)
            console.log(pulicUrl);
          }
        }
      } catch (error){
        console.log("Signup Error:" , error);
        if(error.message.includes("invalid format")){
          alert("Please enter valid format")
        }
      }
    }else{
      if(email){
        alert("Please enter password")
      }else{
        alert("please enter email")
      }
    }
  });


// Fetch Profile Picture and User Details

// creating function SHOW DETAILS

const showDetails = async (profilepic , email , fullName) => {
  // Nested destructuring 
  const {data: { user: {id: userId , email: userEmail} } , error} = await client.auth.getUser()
  if(email){
    email.value = userEmail
  }
  if(userId){
    const{data: [{fullName: dbName , profilepic: pulicUrl}] , error} = await client.from('users_profile').select()
    .eq('user_id' , userId)

    console.log(fullName , profilepic);
    if(pulicUrl){
      const avatar = document.getElementById("avatar")
      if(avatar){
        avatar.src = pulicUrl
      }
      if(profilepic){
        profilepic.src = pulicUrl
        fullName.value = dbName
      }
    }else{
      console.log(error);
    }
  }else{
    console.log(error);
  }
}
// Page direction when user details show
if(window.location.pathname == '/post.html'){
  showDetails()
}

if(window.location.pathname == '/profile.html'){
  const profilepic = document.getElementById("profilepic")
  const email = document.getElementById("email")
  const full_name = document.getElementById("full_name")
  console.log(profilepic , email , full_name);
  showDetails(profilepic , email , full_name)
}