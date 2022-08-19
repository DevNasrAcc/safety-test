import axios from "axios";

export const getAllOperators = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/Safety/GetAllOperators")
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getViolationByOperators = (filterString, startDate, endDate) => {
  let addToString = "";
  if (filterString === "0") {
    addToString = `${filterString}`;
  } else {
    addToString = `and ${filterString}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api/Safety/GetViolationsByOperators/${addToString}/${startDate}/${endDate}`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const filterCategories = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/Safety/GetFilterCategories")
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
