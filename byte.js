
function submitForm() {
    var isFormValid = validateForm1();

    if (isFormValid) {
        printChildInformation();
        storeChildName();
    }
    return isFormValid;
}

function validateForm1() {
    const name = document.getElementById('fullname').value;
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone_number').value;
    const email = document.getElementById('email').value;
    if (!name) {
        alert('Please fill the name');
        return false;
    }else if (!dob) {
        alert('Please fill date of birth');
        return false;
    }
    else if (!email) {
        alert('Please fill the email');
        return false;
    }
    else if (!phone) {
        alert('Please fill the phone number');
        return false;
    } 
    
   

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        alert('Invalid email format');
        return false;
    }

    if (isNameStartsWithNumber(name)) {
        alert('Name should not start with a number');
        return false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert('Phone number should be 10 digits long');
        return false;
    }

    const dobDate = new Date(dob);
    const currentDate = new Date();
    const cutOffYear = new Date(currentDate.getFullYear() - 6, currentDate.getMonth(), currentDate.getDate());

    if (dobDate > cutOffYear) {
        alert('DOB should not be after 2017 (it means children younger than 6 years old are not accepted)');
        return false;
    }

    alert('Form submitted successfully');
    storeData(name);
    return true;
}

function isNameStartsWithNumber(name) {
    const firstCharacter = name.charAt(0);
    return !isNaN(firstCharacter);
}

function storeData(name) {
    var storedChildNames = getStoredChildNames();
    storedChildNames.push(name);
    localStorage.setItem('childNames', JSON.stringify(storedChildNames)); // Update local storage
    updateParentLocalStorage(name); // Update parent's local storage data
}


function updateParentLocalStorage(childName) {
    // Retrieve parent's children from local storage
    const parentChildren = localStorage.getItem('parentChildren')
      ? JSON.parse(localStorage.getItem('parentChildren'))
      : [];

    // Add the new child to the parent's children list
    parentChildren.push(childName);

    // Update parent's local storage with the modified children list
    localStorage.setItem('parentChildren', JSON.stringify(parentChildren));
}

function getStoredChildNames() {
    var storedChildNames = localStorage.getItem('childNames');
    return storedChildNames ? JSON.parse(storedChildNames) : [];
}
function printChildInformation() {
    // Get form elements
    var childName = document.getElementById("fullname").value;
    var childdob = document.getElementById("dob").value;
    var childGender = document.querySelector('input[name="gender"]:checked').value;
    var childEmail = document.getElementById("email").value;
    var childPhoneNumber = document.getElementById("phone_number").value;
    var childPhoto = document.getElementById("photo").files[0];

    // Create a new window for printing
    var printWindow = window.open('', '_blank');

    var content = '<div style="border: 1px solid #000; padding: 10px;">';

    // Display photo if available
    if (childPhoto) {
        var reader = new FileReader();
        reader.onload = function (e) {
            content += ' <img id="childPhoto" src="' + e.target.result + '" alt="Child Photo" style="max-width: 200px;"></p>';
            printRemainingInfo();
        };
        reader.readAsDataURL(childPhoto);
    } else {
        printRemainingInfo();
    }

    function printRemainingInfo() {
        // Print the rest of the information
        content += '<p><strong>Name:</strong> ' + childName + '</p>';
        content += '<p><strong>DOB:</strong> ' + childdob + '</p>';
        content += '<p><strong>Gender:</strong> ' + childGender + '</p>';
        content += '<p><strong>Phone Number:</strong> ' + childPhoneNumber + '</p>';
        content += '<p><strong>Email:</strong> ' + childEmail + '</p>';
        content += '</div>';

        // Set the content and print the window
        printWindow.document.body.innerHTML = content;

        // Check if the photo has finished loading
        var childPhotoElement = printWindow.document.getElementById('childPhoto');
        if (childPhotoElement && !childPhotoElement.complete) {
            childPhotoElement.onload = function () {
                printWindow.print();
                printWindow.close();
                resetFormAfterPrint(); // Call the function to reset the form
            };
        } else {
            printWindow.print();
            printWindow.close();
            resetFormAfterPrint(); // Call the function to reset the form
        }
    }
}
function resetFormAfterPrint() {
    // Reset the form
    document.getElementById("form").reset();

var messageContainer = document.createElement("div");
messageContainer.innerHTML = "<p>Form submitted successfully. Please click the button below to go back.</p>";

var backButton = document.createElement("button");
backButton.textContent = "Go Back";
backButton.onclick = function () {
    window.history.back();
};

messageContainer.appendChild(backButton);
document.body.appendChild(messageContainer);
}



