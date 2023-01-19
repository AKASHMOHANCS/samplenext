import Style from "./NotFound.module.scss";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className={`${Style.jg_notfound} `}>
      <div className="container">
        <div className={`text-center ${Style.content}`}>
          <h2>404</h2>
          <h4>Oops..! Page not found</h4>
          <p>We couldn’t find the page you’re looking for</p>
          <Link href="/">
            <button className="btn btn-primary btn-lg rounded-pill">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
