import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import styles from "../styles/app.module.css";
import qrcode from "../assets/qr-code.png";
import clear from "../assets/clear.png";
import download from "../assets/download.png";

function QrCodeCard() {
  const [url, setUrl] = useState();
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setUrl(e.target.value);
      setError(false);
    } else {
      setUrl();
      setShowCode(false);
    }
  };

  const handleClear = ()=>{
    setUrl('');
    setShowCode(false);
  }

  const handleClick = () => {
    if (!url) {
      setError(true);
      setShowCode(false);
    } else {
      setShowCode(true);
      setError(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const downloadQRCode = () => {
    const qrCodeUrl = document
      .getElementById("qrCode")
      .toDataURL()
      .replace("image/png", "image/octet-stream");
    let a = document.createElement("a");
    a.href = qrCodeUrl;
    a.download = "qrCode.png";
    document.body.appendChild(a);
    a.click();
  };
  return (
    <>
      <div className={styles.code}>
        {!showCode && (
          <div className={styles.headingContainer}>
            <p>Your QR</p>
            <h1>Generator</h1>
          </div>
        )}

{showCode && (<div className={styles.canvasContainer}>
          
            <QRCodeCanvas
              id="qrCode"
              className={styles.myQR}
              size={256}
              value={url}
            />
          
        </div>)}

        <div className={styles.linkContainer}>
          <input
            type="url"
            value={url}
            placeholder="Enter your url here..."
            onChange={handleChange}
            onKeyUp={handleKeyPress}
          />
          
          
          {!showCode && <button onClick={handleClick} className={styles.button}>
            <img src={qrcode} height={20} width={20} alt="qr-code" /> Generate
          </button>}


          {showCode && (<div className={styles.btn} >
          
          <button onClick={handleClear} className={styles.button} id={styles.clear}>
            <img src={clear} height={20} width={20} alt="clear" /> Clear
          </button>

          <button className={styles.downloadBtn} onClick={downloadQRCode} >
            <img src={download} alt="download" />
            Download
          </button>
        
          </div>)}
          

          {error && <p>Please provide a url!</p>}
        </div>

        
      </div>
    </>
  );
}

export default QrCodeCard;
