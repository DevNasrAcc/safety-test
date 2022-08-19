import React from "react";
import { useSelector } from "react-redux";

import Multiselect from "multiselect-react-dropdown";

import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Dropdown from "../../../assets/images/down.svg";

const useStyles = makeStyles({
  box: {
    paddingLeft: "43px",
    paddingRight: "43px",

    "@media only screen and (max-width: 1440px)": {
      "& .export": {
        marginLeft: 10,
      },
    },

    "@media only screen and (max-width: 1366px)": {
      padding: "0px 18px !important",
    },

    "@media only screen and (max-width: 828px)": {
      padding: "0px 10px 0px 20px",
    },
  },

  searchDiv: {
    width: "100%",

    "& .operatorInput": {
      width: "100%",
      marginBottom: "6px",

      "& .parentInpDiv": {
        height: "100%",
        width: "100%",

        "& > :nth-child(1)": {
          height: "100%",
          width: "100%",

          "& .multiSelectContainer": {
            height: "100%",
            background: "#FFFFFF",

            "& .searchWrapper": {
              background: "#F5F8FF",
              border: "1.30769px solid #E1E1E1",
              borderRadius: "7.69879px",
              padding: "16px 0px 16px 17px",

              "& .chip": {
                whiteSpace: "break-spaces",
                fontFamily: "MontserratRegular",
              },

              "& .icon_down_dir": {
                "&::before": {
                  display: "none",
                },
              },

              "& input": {
                background: "#F5F8FF",
                lineHeight: "11px",
                fontSize: 13,
                color: "#000000",
                fontFamily: "MontserratMedium",
                width: "100%",

                "&::placeholder": {
                  color: "#000000",
                },
              },

              "@media only screen and (max-width: 1830px)": {
                padding: "10px 0px 10px 14px",

                "& input": {
                  marginTop: 0,
                },
              },

              "@media only screen and (max-width: 1600px)": {
                padding: "8px 0px 8px 10px",
              },

              "@media only screen and (max-width: 1366px)": {
                padding: "5px 0px 5px 10px",

                "& input": {
                  fontSize: 11,
                },

                "& ul": {
                  maxHeight: "200px !important",
                },
              },
            },

            "& li": {
              fontFamily: "MontserratMedium",

              "@media only screen and (max-width: 1366px)": {
                fontSize: 11,
              },
            },

            "@media only screen and (max-width: 1366px)": {
              "& ul": {
                maxHeight: "190px !important",
              },
            },
          },
        },
      },

      "@media only screen and (max-width: 1600px)": {
        marginBottom: "5px",
      },
    },
  },
});

const TypeFilters = (props) => {
  const {
    operatorLoading,
    schoolLoading,
    filtersLoading,
    gradesLoading,
    studentsLoading,
    setOperatorId,
    setSchoolCode,
    setGrade,
    setOpeArr,
    setSchArr,
    setGradeArr,
    setStudentArr,
    setCateArr,
    operArr,
    schArr,
    gradeArr,
    studentArr,
    cateArr,
  } = props;

  const operatorNames = useSelector((state) => state.operator.allOperators);
  const schoolNames = useSelector((state) => state.school.allSchools);
  const student = useSelector((state) => state.student.studentsByGrade);
  const grade = useSelector((state) => state.grade.gradesBySchool);

  const filterCategory = [
    {
      id: 0,
      category: "Low",
    },
    {
      id: 1,
      category: "Mild",
    },
    {
      id: 2,
      category: "Critical",
    },
  ];

  const classes = useStyles();
  const panel = useSelector((state) => state.leftState.leftState);

  // OPERATOR
  const selectOperator = (operator) => {
    setOperatorId(operator.operatorId);

    setOpeArr((opeArr) => [...opeArr, `Operator='${operator?.operatorName}'`]);
  };
  //
  const filterOperator = (item) => {
    let removeId = operArr.split(" or ");

    removeId = removeId.filter(
      (id) => id !== `Operator='${item?.operatorName}'`
    );
    setOpeArr(removeId);
  };

  // SCHOOL
  const selectSchool = (school) => {
    setSchoolCode(school.code);
    setSchArr((schArr) => [...schArr, `SchoolName='${school?.name}'`]);
  };
  //
  const filterSchool = (item) => {
    let removeId = schArr.split(" or ");

    removeId = removeId.filter((id) => id !== `SchoolName='${item.name}'`);
    setSchArr(removeId);
  };

  // GRADE
  const selectGrade = (grade) => {
    setGrade(grade?.grade);
    setGradeArr((gradeArr) => [...gradeArr, `Grade='${grade?.grade}'`]);
  };
  //
  const filterGrade = (item) => {
    let removeId = gradeArr.split(" or ");
    removeId = removeId.filter((id) => id !== `Grade='${item.grade}'`);
    setGradeArr(removeId);
  };

  // STUDENT
  const selectStudent = (student) => {
    setStudentArr((studentArr) => [
      ...studentArr,
      `StudentName='${student?.en_FullName}'`,
    ]);
  };
  //
  const filterStudent = (item) => {
    let removeId = studentArr.split(" or ");
    removeId = removeId.filter(
      (id) => id !== `StudentName='${item.en_FullName}'`
    );
    setStudentArr(removeId);
  };

  // CATEGORY
  const selectCategory = (category) => {
    setCateArr((opeArr) => [...opeArr, `Category='${category?.category}'`]);
  };
  //
  const filterCateg = (item) => {
    let removeId = cateArr.split(" or ");
    removeId = removeId.filter((id) => id !== `Category='${item.category}'`);
    setCateArr(removeId);
  };

  // ON SELECT
  const onSelectOperator = (_, selectedItem) => {
    selectOperator(selectedItem);
  };

  const onSelectSchool = (_, selectedItem) => {
    selectSchool(selectedItem);
  };

  const onSelectGrade = (_, selectedItem) => {
    selectGrade(selectedItem);
  };

  const onSelectStudent = (_, selectedItem) => {
    selectStudent(selectedItem);
  };

  const onSelectCategory = (_, selectedItem) => {
    selectCategory(selectedItem);
  };

  // ON REMOVE
  const onRemoveOperator = (_, removedItem) => {
    filterOperator(removedItem);
  };

  const onRemoveSchool = (_, removedItem) => {
    filterSchool(removedItem);
  };

  const onRemoveGrade = (_, removedItem) => {
    filterGrade(removedItem);
  };

  const onRemoveStudent = (_, removedItem) => {
    filterStudent(removedItem);
  };

  const onRemoveCategory = (_, removedItem) => {
    filterCateg(removedItem);
  };

  const arrow = <img alt="" src={Dropdown} />;

  return (
    <Box
      className={classes.box}
      sx={{
        "@media only screen and (max-width: 1830px)": {
          padding: panel ? "0px 38px" : "0px 43px",
        },

        "@media only screen and (max-width: 1600px)": {
          padding: panel ? "0px 28px" : "0px 38px",
        },
      }}
    >
      <div className={classes.searchDiv}>
        <div className="operatorInput">
          <div className="parentInpDiv">
            <Multiselect
              options={operatorNames}
              onSelect={onSelectOperator}
              onRemove={onRemoveOperator}
              displayValue="operatorName"
              placeholder="Operator Name"
              closeOnSelect
              hidePlaceholder={true}
              closeIcon="circle2"
              showArrow
              customArrow={arrow}
              loading={operatorLoading}
            />
          </div>
        </div>

        <div className="operatorInput">
          <div className="parentInpDiv">
            <Multiselect
              options={schoolNames}
              onSelect={onSelectSchool}
              onRemove={onRemoveSchool}
              displayValue="name"
              placeholder="School Name"
              closeOnSelect
              hidePlaceholder={true}
              closeIcon="circle2"
              showArrow
              customArrow={arrow}
              loading={schoolLoading}
            />
          </div>
        </div>

        <div className="operatorInput">
          <div className="parentInpDiv">
            <Multiselect
              options={grade}
              onSelect={onSelectGrade}
              onRemove={onRemoveGrade}
              displayValue="grade"
              placeholder="Grade"
              closeOnSelect
              hidePlaceholder={true}
              closeIcon="circle2"
              showArrow
              customArrow={arrow}
              loading={gradesLoading}
            />
          </div>
        </div>

        <div className="operatorInput">
          <div className="parentInpDiv">
            <Multiselect
              options={student}
              onSelect={onSelectStudent}
              onRemove={onRemoveStudent}
              displayValue="en_FullName"
              placeholder="User Name"
              closeOnSelect
              hidePlaceholder={true}
              closeIcon="circle2"
              showArrow
              customArrow={arrow}
              loading={studentsLoading}
            />
          </div>
        </div>

        <div className="operatorInput">
          <div className="parentInpDiv">
            <Multiselect
              options={filterCategory}
              onSelect={onSelectCategory}
              onRemove={onRemoveCategory}
              displayValue="category"
              placeholder="Category"
              closeOnSelect
              hidePlaceholder={true}
              closeIcon="circle2"
              showArrow
              customArrow={arrow}
              loading={filtersLoading}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TypeFilters;
