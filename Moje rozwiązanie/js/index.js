// Zadanie 1: Wybierz niezbędne elementy DOM
// Przykład: Musisz uzyskać odniesienia do elementów takich jak input pliku, przycisk, img i canvas.
// Wskazówka: Użyj document.getElementById lub podobnych metod, aby uzyskać elementy po ich ID.

function getElement(selector){
    element = document.querySelector(selector);
    if (element) return element;
    return null;
}

let fileInput = getElement("#imageUpload");
let convertButton = getElement("#convertGrayscale");
let uploadedImage = getElement("#uploadedImage");
let canvas =  getElement("#grayscaleImage");
let ctx = canvas.getContext("2d");



// Zadanie 2: Dodaj nasłuchiwacz zdarzeń dla przesyłania obrazu
// Kiedy użytkownik wybierze obraz, wyświetl go w elemencie <img>.
// Wskazówka: Możesz użyć API FileReader, aby odczytać plik jako URL danych.

fileInput.addEventListener("change", function(event){
    file = event.target.files[0];
    if (file){
        let reader = new FileReader();

        reader.onload = function(event){
            uploadedImage.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }else {
        alert("Please upload a file");
    }
})

// Zadanie 3: Dodaj nasłuchiwacz zdarzeń do przycisku „Konwertuj na odcienie szarości”
// Po kliknięciu, skonwertuj wyświetlany obraz na odcienie szarości i pokaż go w elemencie <canvas>.
// Wskazówka: Musisz użyć elementu canvas i jego kontekstu (2D) oraz zmodyfikować dane pikseli.

// Zadanie 4: Narysuj przesłany obraz na canvasie
// Wskazówka: Użyj drawImage() w kontekście canvasa, aby narysować obraz. Upewnij się, że rozmiar canvasa odpowiada rozmiarowi obrazu.

// Zadanie 5: Skonwertuj obraz na odcienie szarości poprzez manipulowanie danymi pikseli
// Wskazówka: Użyj getImageData() do pobrania danych pikseli, zastosuj formułę dla odcieni szarości, a następnie użyj putImageData(), aby zaktualizować canvas.

convertButton.addEventListener("click", function(){
    if (!uploadedImage.src) {
        alert("Please upload a file");
        return;
    }

    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;

    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i+=4) {
        let r = pixels[i];
        let g = pixels[i+1];
        let b = pixels[i+2];

        let gray = 0.3 * r + 0.59 * g + 0.11 * b;

        pixels[i] = gray
        pixels[i+1] = gray
        pixels[i+2] = gray
    }

    ctx.putImageData(imageData, 0, 0);

})

// Zadanie opcjonalne: Zastanów się, co się stanie, jeśli nie zostanie przesłany żaden obraz, a przycisk odcieni szarości zostanie kliknięty.
// Wskazówka: Możesz sprawdzić, czy obraz został przesłany, zanim zastosujesz filtr odcieni szarości.