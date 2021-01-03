const server = process.env.NEXT_PUBLIC_SERVER_URL;

const HEADERS = {
  'Content-Type': 'application/json',
};
const Api = {
  get: async (url) => {
    const response = await fetch(`${server}/${url}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: HEADERS,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const result = await response.json();
    return result;
  },
  delete: async (url) => {
    const response = await fetch(`${server}/${url}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'same-origin',
      headers: HEADERS,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    const result = await response.json();
    return result;
  },
  post: async (url, data) => {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    const response = await fetch(`${server}/${url}`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: HEADERS,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },
  update: async (url, data) => {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    const response = await fetch(`${server}/${url}`, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'same-origin',
      headers: HEADERS,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },
};

export default Api;
