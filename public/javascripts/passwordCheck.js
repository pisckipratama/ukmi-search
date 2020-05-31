// Function to check Whether both passwords 
// is same or not. 
function checkPassword(form) {
  console.log('abus');
  password1 = form.newPass.value;
  password2 = form.confirmPass.value;

  if (password1 != password2) {
    alert("\nPassword did not match: Please try again...")
    return false;
  } else {
    return true;
  }
};