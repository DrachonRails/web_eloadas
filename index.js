document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav ul li a");
    const mainContent = document.getElementById("main_content");

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault(); // Az alapértelmezett link viselkedés megakadályozása

            const url = link.getAttribute("href"); // A link cél URL-je

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Hiba történt: ${response.status} ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(html => {
                    mainContent.innerHTML = html; // Az oldal tartalmának betöltése a main_content div-be
                    navLinks.forEach(nav => nav.classList.remove("active")); // Az aktív osztály eltávolítása
                    link.classList.add("active"); // Az aktuális link aktívvá tétele
                })
                .catch(error => {
                    mainContent.innerHTML = `<p>Hiba történt az oldal betöltése során: ${error.message}</p>`;
                    console.error("Hiba:", error);
                });
        });
    });
});