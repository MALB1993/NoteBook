export default class Ui {

    // Method to create and append a new item to the list
    createItem(author, title, body) {
        const list = document.getElementById('list'); // Get the list element
        const row = document.createElement('tr'); // Create a new table row element
        // Set the inner HTML of the row with the item details and a trash icon
        row.innerHTML = `<td>${author}</td> <td>${title}</td> <td class="text-start">${body}</td> <td><i class="fa-solid fa-trash text-danger"></i></td>`;
        list.appendChild(row); // Append the row to the list
    }

    // Method to delete an item from the UI and localStorage
    deleteItem() {
        const trashIcons = document.querySelectorAll(".fa-trash"); // Select all trash icons

        // Iterate over each trash icon and add a click event listener
        trashIcons.forEach(trashIcon => {
            trashIcon.addEventListener("click", (evt) => {
                const row = trashIcon.closest("tr"); // Find the closest table row element to the trash icon
                row.remove(); // Remove the row from the UI
                
                // Extract item details from the row
                const author = row.querySelector("td:first-child").textContent;
                const title = row.querySelector("td:nth-child(2)").textContent;
                const body = row.querySelector("td:nth-child(3)").textContent;
                
                // Get the current posts from localStorage
                let posts = JSON.parse(localStorage.getItem("posts")) || [];
                
                // Find the index of the item to be deleted in the posts array
                const index = posts.findIndex(post => post.author === author && post.title === title && post.body === body);
                if (index !== -1) {
                    posts.splice(index, 1); // Remove the item from the array
                    localStorage.setItem("posts", JSON.stringify(posts)); // Update localStorage with the new array
                }
            });
        });
    }
}
