import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";

// Turn into a modal for use on ItemDetails page
const UPCScanner = () => {
    const [data, setData] = useState("No result");

    return (
        <div style={{ width: "100%", maxWidth: "500px", margin: "auto" }}>
            <h2>Scan a Barcode</h2>
            <BarcodeScanner
                width={500}
                height={500}
                onUpdate={(err, result) => {
                    if (result) setData(result.text);
                }}
            />
            <p>{data}</p>
        </div>
    );
};

export default UPCScanner;