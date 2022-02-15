

export function fetchWithBarcode(barcodeValue) {
    // let barcode = '3366321051983';
    let barcode = barcodeValue;
    fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // console.log(data.product.abbreviated_product_name);
        })
        .catch((err) => {
            // if something goes wrong, the error is displayed in the console
            console.error(err);
        });
}