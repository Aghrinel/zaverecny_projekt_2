//API a filtrování pořadů dle hodnoty zvolené uživatelem

// Najde v HTML select, ze kterého se vybírá název seriálu
const selectSerial = document.querySelector('.movie-select') as HTMLSelectElement | null;

// Najde sekci, do které se budou vykreslovat nalezené seriály
const movieSelection = document.querySelector('.serials') as HTMLDivElement;

// Funkce vytvoří jeden blok s obrázkem seriálu
const addSerialToWebsite = (image:string) => {
    // Vytvoří nový div
    const div = document.createElement('div');

    // Přidá mu třídu serial-box
    div.classList.add('serial-box');

    // Vytvoří element img
    const img = document.createElement('img');

    // Nastaví zdroj obrázku
    img.src = image;

    // Vloží obrázek do divu
    div.append(img);

    // Vrátí hotový div s obrázkem
    return div;
};

// Funkce vykreslí všechny nalezené seriály na stránku
const renderSerials = (serials:any[]) => {
    // Nejdřív smaže předchozí obsah sekce
    movieSelection.textContent = '';

    // Projde všechny nalezené seriály
    serials.forEach((serial) => {
        // Ověří, že seriál existuje a má obrázek
        if (serial.show && serial.show.image) {
            // Vytvoří HTML prvek s obrázkem seriálu
            const serialProfile = addSerialToWebsite(serial.show.image.medium);

            // Přidá ho do sekce na stránce
            movieSelection.append(serialProfile);
        }
    });
};

// Funkce načte data z API podle vybrané hodnoty
const getAllSerial = (selectValue:string) => {
    // Pošle požadavek na API s hledaným výrazem

fetch(`https://api.tvmaze.com/search/shows?q=${selectValue}`)
    // Odpověď převede na JSON
    .then(response => response.json())
    .then(data => {
        // Přijatá data pošle do funkce pro vykreslení
        renderSerials(data);
    })
    .catch(() => {
        movieSelection.textContent = "Filmy se nepodařilo načíst. Zkus to prosím znovu.";
    });


};

// Přidá addEventListener na změnu hodnoty v selectu
selectSerial?.addEventListener('change', () => {
    // Vezme aktuální hodnotu ze selectu a převede ji na malá písmena
    const selectValue = selectSerial.value.toLowerCase();

    // Pokud hodnota není prázdná, zavolá fetch funkci
    if (selectValue !== '') {
        getAllSerial(selectValue);
    }
});

// Po načtení stránky automaticky zavolá hledání pro zvolenou hodnotu
if (selectSerial) {
    getAllSerial(selectSerial.value.toLowerCase());
}

