const xhr = new XMLHttpRequest();

// set up the event listener before triggering the request
xhr.addEventListener("load", () => {
    console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev");
xhr.send();