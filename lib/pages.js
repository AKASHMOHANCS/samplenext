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

export const fetchUsers = async (url) => {
  const api = await getAxiosInstance();
  let res = await api.get(`/${url}?_page=1&_limit=6`);

  const userDetails = res.data;

  const data = { userDetails, status: false, current_page: 1, total_pages: 13 };

  return data;
};

export const deleteUser = async (url, userId) => {
  const api = await getAxiosInstance();

  try {
    const res = await api.delete(`/${url}/${userId}`);

    const response = res.data;

    const data = { response, status: true };
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
export const updateUser = async (url, obj, userId) => {
  const api = await getAxiosInstance();

  try {
    const res = await api.put(`/${url}/${userId}`, obj);

    const response = res.data;

    const data = { response, status: true };
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

export const postContent = async (url, obj) => {
  let formData = new FormData();
  Object.keys(obj).map((key) => {
    formData.append(key, obj[key]);
  });

  const api = await getAxiosInstance();
  try {
    const res = await api.get(`/${url}`, formData);
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

export const getUser = async (url, obj) => {
  const api = await getAxiosInstance();

  try {
    const res = await api.get(
      `/${url}?signUp_email=${obj.signIn_email}&signUp_password=${obj.signIn_password}`
    );
    const response = res.data;

    return { data: response };
  } catch (error) {
    return {
      data: {
        status: "Not Found",
        err: JSON.stringify(error),
      },
    };
  }
};

export const createUser = async (url, obj) => {
  console.log(obj, "obj");
  let formData = new FormData();

  Object.keys(obj).map((key) => {
    formData.append(key, obj[key]);
  });
  // for (const pair of formData.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }

  const api = await getAxiosInstance();
  try {
    const res = await api.post(`/${url}`, obj);
    const response = res.data;
    const data = { response, status: true };
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

export const getPaginateData = async (url, page, per_pages) => {
  const api = await getAxiosInstance();

  let res = await api.get(`/${url}?_page=${page}&_limit=${per_pages}`);

  const userDetails = res.data;

  const data = {
    userDetails,
    status: true,
    current_page: page,
    total_pages: 13,
  };

  return data;
};

export const addNewsLetter = async (url, obj) => {
  let formData = new FormData();

  Object.keys(obj).map((key) => {
    formData.append(key, obj[key]);
  });
  // for (const pair of formData.entries()) {
  //   console.log(`${pair[0]}, ${pair[1]}`);
  // }

  const api = await getAxiosInstance();
  try {
    const res = await api.get(
      `/${url}?${"newsletter_email=" + obj.newsletter_email}`
    );
    const response = res.data;
    if (response.length === 0) {
      const res2 = await api.post(`/${url}`, obj);
      const response2 = res2.data;

      return {
        data: {
          status: true,
        },
      };
    }
    else return {
      data: {
        status: false,
      },
    };
  } catch (error) {
    return {
      data: {
        status: "Not Found",
        err: JSON.stringify(error),
      },
    };
  }
};
