import React, { useState, memo } from "react";
import "./home.css";
import QRCode from "qrcode";
import {
  useAddTableMutation,
  useGetTablesQuery,
  useUpdateTableByIdMutation,
  useDeleteTableByIdMutation,
} from "../../service/table.service";

export const Home = memo(() => {
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState({});
  const [addQRCode, setAddQRCode] = useState(false);
  const [url, setUrl] = useState("");
  const { data = [] } = useGetTablesQuery();
  const [addTable] = useAddTableMutation();
  const [updateTableById] = useUpdateTableByIdMutation();
  const [deleteTableById] = useDeleteTableByIdMutation();

  const generateQRCode = async (url, id) => {
    const key = Math.floor(Math.random() * 100000 + 1);
    const createURl = url.split("?lp").join(`?lp${key}`).split("&");
    const qrUrl = `${createURl[0]}&${createURl[1]}&${key}`;
    if (url) {
      console.log(qrUrl);
      try {
        // QR kodu oluştur
        const dataUrl = await QRCode.toDataURL(qrUrl);
        setQRCodeDataUrl((prevDataUrl) => ({
          ...prevDataUrl,
          [id]: dataUrl,
        }));
      } catch (error) {
        console.error("QR kodu oluşturma hatasi:", error);
      }
    }
  };

  const goback = (id) => {
    setQRCodeDataUrl((prevDataUrl) => ({
      ...prevDataUrl,
      [id]: null,
    }));
  };

  const addQRCodeItem = async (e) => {
    e.preventDefault();
    const { name, url } = e.target;
    const qrdata = {
      name: name.value,
      url: url.value,
    };
    const { data } = await addTable(qrdata);
    if (!data) return alert("Xatolik yuz berdi");
    setAddQRCode(false);
  };

  const createUrl = (value) => {
    const url = value.toLowerCase().split(" ").join("");
    setUrl(`https://foodify.uz/?lp=${url}&1234`);
  };

  const updateTable = async (tData) => {
    const { data } = await updateTableById(tData);
    if (!data) return alert("Xatolik yuz berdi");
  };

  const deleteTable = async (name) => {
    const prompt = window.confirm("Stoll o'chirilsinmi?");
    if (prompt) {
      const { data } = await deleteTableById(name);
      if (!data) return alert("Xatolik yuz berdi");
    }
  };

  return (
    <div className="qr_box">
      <h1>
        LAGMAN <br />
        HOUSE
      </h1>
      {data?.data?.map((item) => (
        <div className="qr_item_box" key={item?.name}>
          <div className="action_box">
            <div className="action">
              <span
                className={item.status === 0 ? "action1 active" : "action1"}
                onClick={() => updateTable({ name: item?.name, status: 1 })}
              >
                Bo'sh
              </span>
              <span
                className={item.status === 1 ? "action2 active" : "action2"}
                onClick={() => updateTable({ name: item?.name, status: 0 })}
              >
                Band
              </span>
            </div>
            <button className="delete" onClick={() => deleteTable(item?.name)}>
              X
            </button>
          </div>
          <div
            className={
              qrCodeDataUrl[item?.name] && item.status === 0
                ? "qr_item qr_on"
                : item.status === 1
                ? "qr_item busy_table"
                : "qr_item"
            }
          >
            {qrCodeDataUrl[item?.name] && (
              <p onClick={() => goback(item?.name)}>
                {item.status === 1 ? "Stoll band" : <span>↶</span>}
              </p>
            )}
            <h3 style={{ textTransform: "capitalize" }}>{item.name}</h3>
            {!qrCodeDataUrl[item?.name] && (
              <i onClick={() => generateQRCode(item.url, item?.name)}></i>
            )}
            {qrCodeDataUrl[item?.name] && item.status === 0 && (
              <img src={qrCodeDataUrl[item?.name]} alt="QR Kodu" />
            )}
          </div>
        </div>
      ))}
      <div className="qr_item_box">
        <form className="add_qr qr_item" onSubmit={addQRCodeItem}>
          {!addQRCode ? (
            <span onClick={() => setAddQRCode(true)}>+</span>
          ) : (
            <>
              <input
                type="text"
                required
                name="name"
                autoComplete="off"
                placeholder="Stoll yoki xona nominiyozing"
                onChange={(e) => createUrl(e.target.value)}
                autoFocus
              />
              <input type="hidden" name="url" value={url} />
              <button>Qo'shish</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
});
