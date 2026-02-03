import { useState } from "react";
import { BarcodeScanner } from "react-qr-barcode-scanner";
import 'react-barcode-scanner/polyfill';

// Turn into a modal for use on ItemDetails page
const UPCScanner = () => {
    const [scanned, setScanned] = useState("No result");

    return (
        <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
            <BarcodeScanner />
            {/* <h2>Scan a Barcode</h2>
            <BarcodeScanner
                onUpdate={(err, result) => {
                    if (result) {
                        const code = result.text;
                        const format = result.format; // e.g. "UPC_A"

                        if (format.includes("UPC")) {
                            setScanned(`UPC code: ${code}`);
                        } else {
                            setScanned(`${format}: ${code}`);
                        }
                    }
                }}
                    constraints={{ facingMode: "environment" }} // use back camera
                    width={500}
                    height={500}
            />
            <p>{scanned}</p> */}
        </div>
    );
};

export default UPCScanner;