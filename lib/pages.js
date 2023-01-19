import { getAxiosInstance } from "../src/pages/api";

export const getPageContent = async (route) => {
  try {
    const api = await getAxiosInstance();
    const res = await api.get(`/${route}`);
    const data = res.data;

    return data;
  } catch (error) {
    return {
      data: {
        status: "Not Found",
        err: JSON.stringify(error),
      },
    };
  }
};

export const getLayout = async (route) => {
  const api = await getAxiosInstance();
  let res = await api.get(route);
  const data = res.data;

  return data;
};

// export const postContent = async (url, obj) => {
//   let formData = new FormData();
//   Object.keys(obj).map((key) => {
//     formData.append(key, obj[key]);
//   });

//   const api = await getAxiosInstance();
//   try {
//     const res = await api.post(`/${url}`, formData);
//     const data = res.data;
//     return data;
//   } catch (error) {
//     return {
//       data: {
//         status: "Not Found",
//         err: JSON.stringify(error),
//       },
//     };
//   }
// };
