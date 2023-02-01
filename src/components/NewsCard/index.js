import Image from "next/image";
import Link from "next/link";
import Style from "./NewsCard.module.scss";
import { GrLinkNext } from "react-icons/gr";

const NewsCard = ({ props }) => {
  return (
    <div className={Style.news_card}>
      <div className={Style.news_card_info}>
        {props?.category && (
          <span className={Style.badge}>{props?.category}</span>
        )}
        <h4>{props?.title}</h4>
        <p>{props?.description}</p>
        <Link href={props?.link}>
          Read more
          <span>
            <GrLinkNext size={14} className="ms-1" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
