import axios from "axios";

export const getAllSchools = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/Safety/GetAllSchools")
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getSchoolsByOperator = (operatorId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/Safety/GetSchoolsByOperator/${operatorId}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getViolationBySchool = (filterString, startDate, endDate) => {
  let addToString = "";
  if (filterString === "0") {
    addToString = `${filterString}`;
  } else {
    addToString = `and ${filterString}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api/Safety/GetViolationsBySchool/${addToString}/${startDate}/${endDate}`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
