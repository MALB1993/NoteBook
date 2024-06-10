export default class Form {
    
    // Method to get the input values from the form
    getInputValue() {
        const author = document.getElementById("author").value; // Get the value of the 'author' input field
        const title  = document.getElementById("title").value;  // Get the value of the 'title' input field
        const body   = document.getElementById("body").value;   // Get the value of the 'body' input field

        return {
            author, title, body // Return the values as an object
        }
    }

    // Method to clear the input values from the form
    removeInputValue() {
        const authorValue = document.getElementById("author").value = ""; // Clear the 'author' input field
        const titleValue  = document.getElementById("title").value = "";  // Clear the 'title' input field
        const bodyValue   = document.getElementById("body").value = "";   // Clear the 'body' input field

        return {
            authorValue, titleValue, bodyValue // Return the cleared values as an object (optional)
        }
    }
}
