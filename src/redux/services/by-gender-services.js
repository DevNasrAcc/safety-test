import axios from "axios";

export const getViolationsByGender = (filterString, startDate, endDate) => {
  let addToString = "";
  if (filterString === "0") {
    addToString = `${filterString}`;
  } else {
    addToString = `and ${filterString}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api/Safety/GetViolationsByCategoryGender/${addToString}/${startDate}/${endDate}`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
