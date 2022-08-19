import axios from "axios";

export const getStudentsBySchoolGrade = (schoolCode, grade) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/Safety/GetStudentsBySchoolGrade/${schoolCode}/${grade}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};

export const getViolationByStudents = (filterString, startDate, endDate) => {
  let addToString = "";
  if (filterString === "0") {
    addToString = `${filterString}`;
  } else {
    addToString = `and ${filterString}`;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(
        `/api/Safety/GetViolationsByStudents/${addToString}/${startDate}/${endDate}`
      )
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
