import { EXPORT_DETAIL } from "next/dist/shared/lib/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { AiOutlineRight } from "react-icons/ai";
import Style from "./customBreadcrumbs.module.scss";

// const Breadcrumbs = ({ props }) => {
//   const { link } = props;

//   console.log(link, "breadcrumbs=======");
//   const router = useRouter();
//   console.log(router.asPath);
//   return (
//     <Breadcrumb>
//       <Link
//         style={
//           router.pathname === "/"
//             ? { color: "black", opacity: 0.5, textDecoration: "none" }
//             : { textDecoration: "none" }
//         }
//         href={"/"}
//       >
//         Home
//       </Link>
//       <span className="text-black-50 px-1">/</span>
//       <Link
//         style={
//           // router.query.slug[0] === `${link.text}`
//           //   ? { color: "black", opacity: 0.5, textDecoration: "none" }
//           { textDecoration: "none" }
//         }
//         href={`${link.url}`}
//       >
//         {link.text}
//       </Link>
//     </Breadcrumb>
//   );
// };

// export default Breadcrumbs;

const CustomBreadcrumb = ({ props }) => {
  const router = useRouter();

  const { levels, link, title } = props;
  return (
    <>
      <Breadcrumb className={Style.custom_breadcrumb}>
        
        {levels?.map((level, index) => {
          return (
            <React.Fragment key={index}>
              {levels?.length === index + 1 ? (
                <Breadcrumb.Item>
                  <AiOutlineRight size={10} /> <span>{level?.title}</span>
                </Breadcrumb.Item>
              ) : (
                <Link
                  style={
                    'gallery' === `${level?.title}`
                      ? { color: "black", opacity: 0.5, textDecoration: "none" }
                      : { textDecoration: "none" }
                  }
                  href={link.url}
                >
                  <AiOutlineRight size={10} /> <span>{level?.title}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default CustomBreadcrumb;
