// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDeSv0CBeIsou0I25yGFvqzS552wzfc3uI",
  authDomain: "contact-form-f4486.firebaseapp.com",
  projectId: "contact-form-f4486",
  storageBucket: "contact-form-f4486.appspot.com",
  messagingSenderId: "90585941441",
  appId: "1:90585941441:web:caa9cee1e1eb10b5421b40"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact__form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let subject = document.querySelector(".subject").value;
  let message = document.querySelector(".message").value;
 

  saveContactInfo(name, email, subject, message);

  document.querySelector(".contact__form").reset();

  sendEmail(name, email, subject, message);
}

// Save infos to Firebase
function saveContactInfo(name, email, subject, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    subject:subject,
    message: message,
  });

  retrieveInfos();
}

// Retrive Data
function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);
}

function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for(let i = 0; i < keys.length; i++) {
    let infoData = keys[i]
    let name = info[infoData].name
    let email = info[infoData].email
    let subject = info[infoData].subject
    let message = info[infoData].message
    console.log(name, email, subject, message);
  }
}

retrieveInfos();

// Send Email Info
function sendEmail(name, email, subject, message) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "er.utkarshguptaa@gmail.com",
    Password: "juqohkmseumuuyxg",
    To: "er.utkarshguptaa@gmail.com",
    From: "er.utkarshguptaa@gmail.com",
    Subject: `${name} sent you a message`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Subject: ${subject} <br/> Message: ${message}`,
  }).then((message) => alert("Thanks for contacting me"));
}