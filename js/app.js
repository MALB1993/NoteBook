import Form from "./Classes/Form.js";
import Ui from "./Classes/Ui.js";

const createItemButton = document.getElementById("create-item");

document.addEventListener("DOMContentLoaded", () => {
    const postsString = localStorage.getItem('posts');
    const ui = new Ui();
    if (postsString) {
        document.getElementById("content").classList.add("d-block");
        const posts = JSON.parse(postsString);
        posts.forEach(element => {
            ui.createItem(element.author, element.title, element.body);
        });
    } else {
        document.getElementById("content").classList.add("d-none");
    }
    ui.deleteItem();
});

// Adding an event listener to the create item button
createItemButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    // Creating a Form object
    const form = new Form();

    // Getting input values from the form
    const { author, title, body } = form.getInputValue();

    // Checking if posts are already stored in localStorage
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Adding the new post to the posts array
    const post = {
        author: author,
        title: title,
        body: body
    };

    posts.push(post);

    // Storing the posts array in localStorage
    localStorage.setItem("posts", JSON.stringify(posts));

    // Creating a Ui object to add the new item to the list
    const ui = new Ui();
    ui.createItem(author, title, body);
    
    // Adding the delete functionality to the new item
    ui.deleteItem();

    // Clearing the form input values
    form.removeInputValue();
});
