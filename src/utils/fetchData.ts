type fetchOptions = {
  method: string;
  headers: {
    'x-rapidapi-key': string;
    'x-rapidapi-host': string;
  };
};

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
  },
};

export const fetchData = async (url: string, options: fetchOptions) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
