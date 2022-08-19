import axios from "axios";

export const getDashboardNumbers = (filterString, startDate, endDate) => {
  let addToString = "";
  if (filterString === "0") {
    addToString = `${filterString}`;
  } else {
    addToString = `and ${filterString}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api/Safety/GetDashboardNumbers/${addToString}/${startDate}/${endDate}`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
