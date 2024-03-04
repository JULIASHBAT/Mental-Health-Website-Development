let UserIslogedIn =false;
let user=null;
const loginsignuptitle =document.getElementById("login-signuptitle");
const adminActions=document.getElementById("adminActions");
const userActions=document.getElementById("userActions");
const HomePage=document.getElementById("HomePage");
const dropdownbut=document.getElementById("dropdown");
const menu=document.getElementById("menu")
const doctorsList=[];

const pages = {
    "home": "white",
    "self-help": "lightblue",
    "about": "lightgreen",
    "Sign-up": "lightred",
    "Log-In":"red",
    "dashboard":"redlight",
    "doctors":"green",
    "customers":"yellow",
    "users":"blue",
    "stress-mangtools":"red",
    "pro-helpcontact":"blue",
    "support-groups":"yellow",
    "vip-groups":"red"
};

const pagesHTML = {
    "home": "home.html",
    "self-help":"selfhelp.html",
    "about": "about.html", 
    "sign-up": "sign-up.html",
    "log-in":"log-in.html",
    "dashboard":"Dashboard.html",
    "doctors":"doctors.html",
    "customers":"customers.html",
    "users":"usersadmin.html",
    "stress-mangtools":"stressTools.html",
    "pro-helpcontact":"proContact.html",
    "support-groups":"supportGroups.html",
    "vip-groups":"Vipgroups.html"
};

const showPage = (page => {
    // Check if the page has an associated HTML file and load it
    if (pagesHTML[page]) {
        loadExternalHTML(pagesHTML[page]);
        if(menu.classList.contains('hidden')){}
        else menu.classList.add('hidden')
    } else {
        console.log("No HTML file found for ", page);
    }
});

function confirmLogout() {

    if (confirm("Are you sure you want to log out?")) {
        adminActions.classList.add('hidden')
        userActions.classList.add('hidden')
        loginsignuptitle.classList.remove('hidden')
        HomePage.classList.remove('hidden')
        dropdownbut.classList.add("hidden")
        UserIslogedIn=false;//the user is logged out!
        showPage("log-in")
        alert("Logging out...");
        
    } else {}


}


function loadExternalHTML(pageUrl) {
    fetch(pageUrl)
        .then(response => response.text())
        .then(html => {
            const container = document.getElementById('htmlpages');
            container.innerHTML = html;
            // After loading the HTML, check if it's the usersadmin.html page and then call renderUserTable
            if (pageUrl.includes("usersadmin.html")) {
                renderUserTable(usersArray);
            }
            if(pageUrl.includes("customers.html")){
                console.log(user.id);
                fetchUserDetailsById(user.id);
            }
            if(pageUrl.includes("proContact.html")){
                for(let i=0;i<doctorsList.length;i++){
                    if(user.location!=doctorsList[i].location )
                    doctorsList.pop(doctorsList[i]);
                }
                console.log(doctorsList)
                renderDoctorsTable(doctorsList);
            }

            // After loading the HTML, attach a listener for the login form
            const loginForm = container.querySelector('#loginForm');
            if (loginForm) { attachLoginFormListener(loginForm); }

            // After loading the HTML, attach a listener for the signup form
            const signupForm = container.querySelector('#signUpForm');
            if (signupForm) { attachSignupFormListener(signupForm); }
        })
        .catch(error => console.error('Error loading the HTML file:', error));
}

//******loading the external data********/
/**************************************/
let usersArray = []; //users array to save the external data insade it!

fetch('https://raw.githubusercontent.com/Mohameed7993/Usersfakedata_json/master/users.json')
  .then(response => response.json())
  .then(data => {usersArray = data;
// Assign the fetched data to the array

for(let i=0;i<usersArray.length;i++){
    if((usersArray[i].role>5) && (usersArray[i].role<10)){
     doctorsList.push(usersArray[i]);}
}
    console.log("Users data loaded successfully");
    console.log(data)
    console.log(doctorsList)
  })
  .catch(error => console.error('Failed to fetch data:', error));



/********start*****************customer more details!*****************************/

function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        return 'morning';
    } else if (hour >= 12 && hour < 17) {
        return 'afternoon';
    } else {
        return 'evening';
    }
}

function fetchUserDetailsById(userId) {
    // Replace 'your_api_endpoint' with the actual API endpoint
    fetch('https://raw.githubusercontent.com/Mohameed7993/Usersfakedata_json/master/usersinform.json')
        .then(response => response.json())
        .then(data => {
            // Find the user with the specified ID in the data array
            const custlogin = data.find(user => user.id === userId);

            // Check if the user is found
            if (custlogin) {
                // Update the HTML with the user details
                document.getElementById('greeting').textContent = `Good ${getTimeOfDay()}, ${user.fullname}!`;
                document.getElementById('mentalStatus').textContent = `Mental Status: ${custlogin.mental_state}`;
                document.getElementById('anxietyLevel').textContent = `Anxiety Level: ${custlogin.anxiety}`;
                document.getElementById('summary').textContent = `Summary: ${custlogin.summary}`;
            } else {
                // If user is not found, display an error message
                document.getElementById('mentalStatus').textContent = 'User not found';
                document.getElementById('anxietyLevel').textContent = '';
                document.getElementById('summary').textContent = '';
            }
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
            document.getElementById('mentalStatus').textContent = 'Failed to fetch user details';
            document.getElementById('anxietyLevel').textContent = '';
            document.getElementById('summary').textContent = '';
        });
}

/********end*****************customer more details!*****************************/


/********start********doctortable render in the userpage!******************/
function renderDoctorsTable(doctorsData) {
    console.log(user.fullname)
    const doctorsTableBody = document.querySelector('tbody');
    // Clear existing rows
    doctorsTableBody.innerHTML = '';

    // Render each doctor as a table row
    doctorsData.forEach(doctor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 border-b border-gray-300">${doctor.fullname}</td>
            <td class="px-6 py-4 border-b border-gray-300">${doctor.clinicName}</td>
            <td class="px-6 py-4 border-b border-gray-300">${doctor.email}</td>
            <td class="px-6 py-4 border-b border-gray-300">${doctor.phone}</td>
            <td class="px-6 py-4 border-b border-gray-300"></td>
        `;

        doctorsTableBody.appendChild(row);
    });
}
/********end********doctortable render in the userpage!******************/


/********start********Userdable render in the adminpage!******************/
  function renderUserTable(users) {
    const tbody = document.querySelector('tbody');
    // Clear existing rows
    tbody.innerHTML = '';
    console.log(users);
    // Populate the table with user data
    users.forEach(users => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div class="flex items-center">
                <div>
                    <div class="text-sm leading-5 text-gray-800">${users.id}</div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div class="text-sm leading-5 text-blue-900">${users.fullname}</div>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">${users.name}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">${users.email}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">${users.age}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">${users.phone}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">${users.location}</td>
        <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">${users.status}</td>
        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
            <button class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View Details</button>
        </td>
    `;
    
        tbody.appendChild(row);
    });
  }
/********end********Userdable render in the adminpage!******************/

  ////start/////////////////singup attach lisner!////////////////////////
  function attachSignupFormListener(formElement) {
    const SignupButton=document.getElementById('regis-button');
    SignupButton.disabled = true; //disabeld the submit button at the bigging

    //according to the input feilds if they empity or not the submit button will work
    function updateButtonStatessignup() {
        //selecting by id!
        const username = formElement.querySelector('#username').value;
        const password = formElement.querySelector('#password').value;
        const fullname = formElement.querySelector('#fullname').value;
        const email = formElement.querySelector('#email').value;
        const phonenumber = formElement.querySelector('#phonenumber').value;
        const confirmPassword = formElement.querySelector('#confirm-password').value;
        SignupButton.disabled = !username || !password ||!fullname ||!email || !phonenumber || !confirmPassword;
    }

    //lisiner to read the change at each moment **signup**
    formElement.querySelector('#username').addEventListener('input', updateButtonStatessignup);
    formElement.querySelector('#password').addEventListener('input', updateButtonStatessignup);
    formElement.querySelector('#fullname').addEventListener('input', updateButtonStatessignup);
    formElement.querySelector('#email').addEventListener('input', updateButtonStatessignup);
    formElement.querySelector('#phonenumber').addEventListener('input', updateButtonStatessignup);
    formElement.querySelector('#confirm-password').addEventListener('input', updateButtonStatessignup);

   //function used that what is happening when the user click on submit!**Signup**
   formElement.addEventListener('submit', function(event) {
    const password = formElement.querySelector('#password').value;
    const confirmPassword = formElement.querySelector('#confirm-password').value;
    if(password!=confirmPassword)
    alert("the password is not the same!");
    else 
    alert("sign up successful!!!\n***** you can't login into you account now! ****\n -----COMING SOON!!-----");
    updateButtonStatessignup();
});
}
////end/////////////////singup attach lisner!////////////////////////



////start/////////////////login attach lisner!////////////////////////
function attachLoginFormListener(formElement) {
    
    const submitButton = document.getElementById('submitButton'); 
    submitButton.disabled = true; //disabeld the submit button at the bigging

    //according to the input feilds if they empity or not the submit button will work!
    function updateButtonStatesubmitlogin() {
        //selecting by id!
        const username = formElement.querySelector('#username').value;
        const password = formElement.querySelector('#password').value;
        submitButton.disabled = !username || !password;
    }
    //lisiner to read the change at each moment **Login**
    formElement.querySelector('#username').addEventListener('input', updateButtonStatesubmitlogin);
    formElement.querySelector('#password').addEventListener('input', updateButtonStatesubmitlogin);

    //function used that what is happening when the user click on submit!**login**
    formElement.addEventListener('submit', function(event) {
        UserIslogedIn=true; //the user is logged in!
        event.preventDefault();
        const username = formElement.querySelector('#username').value;
        const password = formElement.querySelector('#password').value;
        // Find the user by username in the usersArray
         user = usersArray.find(user => user.name === username && user.password === password); 
        
        /* ********* master:role=10    **********
        ************ doctors:role=6-9  ********** 
        ************ custmers:role=1-5 ***********/
        if (user) {
            loginsignuptitle.classList.add('hidden')
            console.log("Role:", user.role);
            //master
            if(user.role>9){
                showPage("dashboard")
                adminActions.classList.remove('hidden')
                HomePage.classList.add('hidden')

            alert("Login successful!\nwelcome: Master ");
            }
            //doctor
            else if(user.role>5){
                showPage("doctors")
            alert("Login successful!\nwelcome: doctor ");
            }
            //custmer
            else if(user.role>0){
                userActions.classList.remove('hidden')
                showPage("customers")
            alert("Login successful!\nwelcome: custmer ");
            }
        } else {
            console.log(user)
            console.log("User not found or password incorrect");
            alert("User not found or password incorrect.");
        }
    });
    updateButtonStatesubmitlogin();
}
////end/////////////////login attach lisner!////////////////////////


document.addEventListener("DOMContentLoaded", function() {

   

    // manged the dark and the light mode!
    document.getElementById("btnThemeMode").addEventListener("click", function() {
        document.documentElement.classList.toggle("dark");
        var icon = document.getElementById("btnThemeMode").querySelector("i");
        if (document.documentElement.classList.contains("dark")) {
            icon.className = "fas fa-moon"; // dark mode icon
        } else {
            icon.className = "fas fa-sun"; //light mode icon
        }
    });

    document.getElementById("dropdownDefaultButton").addEventListener("click",function(){
        if(UserIslogedIn){
         
        if(dropdownbut.classList.contains("hidden")){
            dropdownbut.classList.remove("hidden");
        }else {dropdownbut.classList.add("hidden");}
    }
    else{
        showPage("log-in")
    }
    })


    document.getElementById("menuBtn").addEventListener("click", function() {
        var menu = document.getElementById("menu");
        if (menu.classList.contains("hidden")) {
            menu.classList.remove("hidden");
        } else {
            menu.classList.add("hidden");
        }
    });

    document.querySelector("#logintitle1").addEventListener('click',function(){
        showPage("log-in")
    })

    document.querySelector("#signuptitle1").addEventListener('click',function(){
        showPage("sign-up")
    })
    
    document.querySelectorAll("a").forEach(function(el) {
        
        el.addEventListener("click", function() {
            const pageName = el.innerText.toLowerCase();
                if(UserIslogedIn){
                    if(pageName==='home'){
                        if(user.role>5)
                            showPage("doctors");
                        else if(user.role>0)
                            showPage("customers")
                    } else  showPage(pageName)
                }  else {
                    if(pageName==='home')
                       window.location.reload()
                    else {
                        console.log(pageName)
                        showPage(pageName);}
                }
    });
    });
    

    const logoutLink = document.getElementById("logoutLink");
    if (logoutLink) {
        logoutLink.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default action of the link
            confirmLogout(); // Call the confirmLogout function
        });
    }

    // Optionally load a default page on DOMContentLoaded
    // showPage('home'); // Uncomment this line if you want to load the 'home' page by default
});



