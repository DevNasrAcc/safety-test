import axios from "axios";

export const getGradesBySchool = (schoolCode) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/Safety/GetGradesBySchool/${schoolCode}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getViolationByGrade = (filterString, startDate, endDate) => {
  let addToString = "";
  if (filterString === "0") {
    addToString = `${filterString}`;
  } else {
    addToString = `and ${filterString}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api/Safety/GetViolationsByGrade/${addToString}/${startDate}/${endDate}`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
