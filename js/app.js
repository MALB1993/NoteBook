import Form from "./Classes/Form.js";
import Lang from "./Classes/Lang.js";
import Ui from "./Classes/Ui.js";

const createItemButton = document.getElementById("create-item");

document.addEventListener("DOMContentLoaded", () => {


    const htmlElement = document.querySelector("html");
    localStorage.getItem("lang") === "fa" ? htmlElement.setAttribute("dir", "rtl") : htmlElement.setAttribute("dir", "ltr");

    const htmlTagAttribute = document.querySelector("html").getAttribute("lang");
    Lang.language(htmlTagAttribute);

    setInterval( () => {
        fetch("./js/lang/language.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network Error" + response.statusText);
            }
            return response.json();
        })
        .then(data => {

            if (localStorage.getItem("lang") === "fa") {
                document.querySelector("header .navbar-brand").textContent = data.fa.navbar_title;
                document.querySelector("header #create-note").lastChild.textContent = data.fa.create_new_note;
                
                document.querySelector("table #author").textContent = data.fa.table.author;
                document.querySelector("table #title").textContent = data.fa.table.title;
                document.querySelector("table #body").textContent = data.fa.table.body;
                document.querySelector("table #management").textContent = data.fa.table.management;
                
                document.querySelector("form #f-author").textContent = data.fa.form.author;
                document.querySelector("form #f-title").textContent = data.fa.form.title;
                document.querySelector("form #f-body").textContent = data.fa.form.body;
                document.querySelector("#cancel-btn").textContent = data.fa.form.cancel;
                document.querySelector("#create-item").textContent = data.fa.form.create_note;
                
            } else {
                document.querySelector("header .navbar-brand").textContent = data.en.navbar_title;
                document.querySelector("header #create-note").lastChild.textContent = data.en.create_new_note;
                
                document.querySelector("table #author").textContent = data.en.table.author;
                document.querySelector("table #title").textContent = data.en.table.title;
                document.querySelector("table #body").textContent = data.en.table.body;
                document.querySelector("table #management").textContent = data.en.table.management;

                document.querySelector("form #f-author").textContent = data.en.form.author;
                document.querySelector("form #f-title").textContent = data.en.form.title;
                document.querySelector("form #f-body").textContent = data.en.form.body;
                document.querySelector("#cancel-btn").textContent = data.en.form.cancel;
                document.querySelector("#create-item").textContent = data.en.form.create_note;
            }
        });
    },100);


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


    const themeToggle = document.getElementById("theme-toggle");
    const body = document.querySelector("body");
    let theme = localStorage.getItem('theme');
    localStorage.getItem("theme") === null ?? setItem("theme", theme);
    body.setAttribute("data-bs-theme", theme);

    themeToggle.addEventListener('click', (evt) => {
        if (theme === "light") {
            theme = "dark";
        } else {
            theme = "light";
        }
        body.setAttribute("data-bs-theme", theme);
        localStorage.setItem('theme', theme);

        evt.preventDefault();
    });



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

    Ui.showMessage("create new item successfully !", 'success');

    // Adding the delete functionality to the new item
    ui.deleteItem();

    // Clearing the form input values
    form.removeInputValue();
});
