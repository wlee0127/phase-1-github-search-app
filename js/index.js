const form = document.getElementById("github-form");
const input = document.getElementById("search");
const ul = document.getElementById("user-list");


form.addEventListener("submit", function(event) {
    event.preventDefault()
    let inputValue = input.value;
    console.log(inputValue);
    fetch(`https://api.github.com/search/users?q=${inputValue}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        let li1 = document.createElement("li");
        li1.textContent = data.items[0].login;
        li1.id = "li1";
        let img = document.createElement("img");
        img.src = data.items[0].avatar_url;
        let li2 = document.createElement("li");
        li2.id = "li2";
        li2.innerHTML = data.items[0].html_url;
        ul.append(li1,img,li2);  
        return li2; 
    })
    .then(
        function() {
            const elementURL = document.getElementById("li2");
            elementURL.addEventListener("click", function() {
                const targetURL = elementURL.innerHTML;
                window.location.href = targetURL;
        } 
    )
    })
    .then(
        function() {
            const elementUser = document.getElementById("li1");
            const userValue = elementUser.textContent;
            elementUser.addEventListener("click", function() {
                fetch(`https://api.github.com/users/${userValue}/repos`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    for(i=0; i<=data.length-1; i++) {
                        let repoli = document.createElement("li");
                        repoli.textContent = data[i].name;
                        ul.appendChild(repoli);
                    }
                }

                )
            })
        }
    )


})