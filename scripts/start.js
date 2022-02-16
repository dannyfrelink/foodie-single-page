import { fetchWithBarcode } from './script.js';

// Landing part
const startScanButton = document.querySelector('#start_scan');
const header = document.querySelector('header');

// Scanner part
const main = document.querySelector('main');
const section = document.querySelector('section');
const videoDiv = document.querySelector('#video')

startScanButton.addEventListener('click', startDetecting);

async function startDetecting() {
    header.style.display = "none";
    main.classList.add('infaden')

    const barcodeDetector = new BarcodeDetector();
    let itemsFound = [];
    const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
    });

    let barcodeValue;

    const video = document.createElement('video');
    video.srcObject = mediaStream;
    video.autoplay = true;

    videoDiv.append(video)

    const render = () => {
        barcodeDetector
            .detect(video)
            .then((barcodes) => {
                barcodes.forEach((barcode) => {
                    if (!itemsFound.includes(barcode.rawValue)) {
                        itemsFound.push(barcode.rawValue);
                        barcodeValue = barcode.rawValue;
                        fetchWithBarcode(barcodeValue);

                        barcodeDetector.release();
                        header.style.display = "flex";
                        section.style.display = 'none';
                    }
                });
            })
            .catch(console.error);
    }

    const renderLoop = () => {
        requestAnimationFrame(renderLoop);
        render();
    }
    renderLoop();
}

export { header, section, videoDiv }