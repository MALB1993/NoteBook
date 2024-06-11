
export default class Lang {

    static language(dir) {
        const htmlElement = document.querySelector("html");
        const langItem = document.getElementById("lang-item");

        langItem.addEventListener("click", (evt) => {

            if (evt.target.firstChild.data.toLowerCase() === "en") {
                localStorage.setItem("lang", "en");
                document.getElementById("navbar-list").classList.remove("ms-auto");
                document.getElementById("navbar-list").classList.add("me-auto");
                
                
            } else {
                localStorage.setItem("lang", "fa");
                document.getElementById("navbar-list").classList.add("ms-auto");
                document.getElementById("navbar-list").classList.remove("me-auto");
            }

            const localLang = localStorage.getItem("lang");

            switch (localLang) {
                case "fa":
                    htmlElement.setAttribute("dir", "rtl");
                    break;
                case "en":
                    htmlElement.setAttribute("dir", "ltr");
                    break;
                default:
                    console.error("Lang not found !");
                    break;
            }



            evt.preventDefault();
        });
    }
}
