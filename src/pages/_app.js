//import '@/styles/globals.css'
import { useEffect, useState } from "react";
import "../styles/common.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Assets from "@/components/Layouts/CommonLayout/assets";
import Image from "next/image";

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [preloaderShow, setPreloaderShow] = useState(1);

  useEffect(() => {
    if (localStorage.getItem("preloader") == 0) {
      setPreloaderShow(0);
      setLoading(false);
    } else {
      setLoading(true);
      setPreloaderShow(1);
      setTimeout(() => {
        setLoading(false);
        if (typeof window !== "undefined") {
          localStorage.setItem("preloader", 0);
          setPreloaderShow(0);
        }
      }, 2500);
    }
  }, []);
  return (
    <>
      {preloaderShow != "0" && (
        <div
          className={`${
            loading ? `is-loading` : ``
          } d-flex align-items-center justify-content-center preloader-wrp`}
        >
          <Image
            src={Assets.loader_gif}
            alt="loader"
            width={"100"}
            height={"100"}
          />
        </div>
      )}
      {preloaderShow == "0" && <Component {...pageProps} />}
    </>
  );
}

export default App;
