import { useState } from "react";
import QrBarcodeScanner from "react-qr-barcode-scanner";

const UPCScanner = () => {
    const [scanned, setScanned] = useState("No result");

    return (
        <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
            <h2>Scan a QR or Barcode</h2>
            <QrBarcodeScanner
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
            <p>{scanned}</p>
        </div>
    );
};

export default UPCScanner;