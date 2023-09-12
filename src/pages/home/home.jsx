import React, { useState, memo } from "react";
import "./home.css";
import QRCode from "qrcode";

export const Home = memo(() => {
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState({});

  const generateQRCode = async (url, id) => {
    const qrUrl = url.split("?lp").join(`?lp${id}`);
    console.log(qrUrl);
    if (url) {
      try {
        // QR kodu oluştur
        const dataUrl = await QRCode.toDataURL(qrUrl);
        setQRCodeDataUrl((prevDataUrl) => ({
          ...prevDataUrl,
          [id]: dataUrl,
        }));
      } catch (error) {
        console.error("QR kodu oluşturma hatası:", error);
      }
    }
  };

  const goback = (id) => {
    setQRCodeDataUrl((prevDataUrl) => ({
      ...prevDataUrl,
      [id]: null,
    }));
  };

  return (
    <div className="qr_box">
      <h1>QR kodlar</h1>
      {qrData.map((item) => (
        <div
          className={
            qrCodeDataUrl[item.id] && !item.active
              ? "qr_item qr_on"
              : item.active
              ? "qr_item busy_table"
              : "qr_item"
          }
          key={item.id}
        >
          {qrCodeDataUrl[item.id] && (
            <p onClick={() => goback(item.id)}>
              {item.active ? (
                "Stoll band"
              ) : (
                <>
                  ◄ <span>orqaga</span>
                </>
              )}
            </p>
          )}
          <h3>
            {item.id} - {item.name}
          </h3>
          {!qrCodeDataUrl[item.id] && (
            <i onClick={() => generateQRCode(item.url, item.id)}></i>
          )}
          {qrCodeDataUrl[item.id] && !item.active && (
            <img src={qrCodeDataUrl[item.id]} alt="QR Kodu" />
          )}
        </div>
      ))}
    </div>
  );
});

const qrData = [
  {
    id: 1,
    name: "Stoll",
    url: "https://foodify.uz/?lp=stoll1&1234",
  },
  {
    id: 2,
    name: "Stoll",
    url: "https://foodify.uz/?lp=stoll2&1234",
  },
  {
    id: 3,
    name: "Stoll",
    url: "https://foodify.uz/?lp=stoll3&1234",
    active: true,
  },
  {
    id: 4,
    name: "Stoll",
    url: "https://foodify.uz/?lp=stoll4&1234",
  },
  {
    id: 5,
    name: "Stoll",
    url: "https://foodify.uz/?lp=stoll5&1234",
  },
  {
    id: 6,
    name: "Stoll",
    url: "https://foodify.uz/?lp=stoll6&1234",
  },
  {
    id: 7,
    name: "Stoll",
    url: "https://foodify.uz/?lp=stoll7&1234",
  },
  {
    id: 8,
    name: "Stoll",
    url: "https://foodify.uz/?lp=stoll8&1234",
  },
];
