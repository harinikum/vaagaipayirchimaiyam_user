import profile from "../assets/images/profile/profile.png";

import cPurchase from "../assets/images/profile/c-purchased.png";
import cppPurchase from "../assets/images/profile/cpp-purchased.png";
import javaPurchase from "../assets/images/profile/java-purchased.png";
import pythonPurchase from "../assets/images/profile/python-purchased.png";
import nonPurchaseC from "../assets/images/profile/nonpurchaseC.PNG";
import nonPurchaseCpp from "../assets/images/profile/nonpurchaseCpp.PNG";
import nonPurchaseJava from "../assets/images/profile/nonpurchaseJava.PNG";
import nonPurchasePython from "../assets/images/profile/nonpurchasePython.PNG";

import cDisable from "../assets/images/profile/Cdisable.png";
import cActive from "../assets/images/profile/Cactive.png";
import cppDisable from "../assets/images/profile/C++disable.png";
import cppActive from "../assets/images/profile/c++active.png";
import javaDisable from "../assets/images/profile/javadisable.png";
import javaActive from "../assets/images/profile/javaactive.png";
import pythonDisable from "../assets/images/profile/pythondisable.png";
import pythonActive from "../assets/images/profile/pythonactive.png";

import cprogram from "../assets/images/logo/c.png";
import cplus from "../assets/images/logo/cpp.jpg";
import java from "../assets/images/logo/java.png";
import python from "../assets/images/logo/python.png";
import nonactiveC from "../assets/images/logo/nonactiveC.PNG";
import nonactiveCpp from "../assets/images/logo/nonactiveCpp.PNG";
import nonactiveJava from "../assets/images/logo/nonactiveJava.PNG";
import nonactivePython from "../assets/images/logo/nonactivePython.PNG";

import { debounce } from "lodash-es";
import moment from "moment";
import { PATH } from "../constants/routeConstants";

export const ImageURL =
  "http://localhsot/b2gLocal/controllers/api/student/upload/";

export const getLocalStorage = (keyName) => {
  return window.localStorage.getItem(keyName);
};

export const setlocalStorage = (keyName, value) => {
  window.localStorage.setItem(keyName, value);
};

export const removeLocalStorage = (keyName) => {
  window.localStorage.removeItem(keyName);
};

export const convertUserObj = (val) => {
  console.log("val", val);
  const calculateExpiryDays = (endDate) => {
    const currentDate = moment();
    const lastDate = moment(endDate);
    const remainingDays = lastDate.diff(currentDate, "days");
    return remainingDays;
  };

  const calculateTotalDays = (start, end) => {
    const startDate = moment(start);
    const endDate = moment(end);
    const totalDays = endDate.diff(startDate, "days");

    return totalDays;
  };

  const valProgress = (startDate, endDate) => {
    const days =
      calculateExpiryDays(endDate) / calculateTotalDays(startDate, endDate);
    const percentage = days * 100;
    return percentage;
  };

  return {
    email: val.gmail,
    profile: val.profile ? `${ImageURL}${val.profile}` : profile,
    profileName: val.profile,
    name: val.name,
    userName: val.name,
    rank: val.over_all_score,
    linkedin: val.linkedin_link,
    github: val.github_link,
    following: val.no_of_following,
    followers: val.no_of_followers,
    bio: val.bio,
    education: val.college_name,
    graduation: val.pass_out,
    jobSetting: val.jobSetting,
    currentStatus: val.current_status,
    mobile: val.mobile,
    viewProfile: false,
    userType: val.account_type,
    followStatus: false,
    purchasedCourse: [
      {
        img:
          valProgress(val.c_enrollment, val.c_expiry) > 0
            ? cPurchase
            : nonPurchaseC,
        title: "C",
        content: calculateExpiryDays(val.c_expiry),
        progress: valProgress(val.c_enrollment, val.c_expiry),
      },
      {
        img:
          valProgress(val.cpp_enrollment, val.cpp_expiry) > 0
            ? cppPurchase
            : nonPurchaseCpp,
        title: "C++",
        content: calculateExpiryDays(val.cpp_expiry),
        progress: valProgress(val.cpp_enrollment, val.cpp_expiry),
      },
      {
        img:
          valProgress(val.java_enrollment, val.java_expiry) > 0
            ? javaPurchase
            : nonPurchaseJava,
        title: "Java",
        content: calculateExpiryDays(val.java_expiry),
        progress: valProgress(val.java_enrollment, val.java_expiry),
      },
      {
        img:
          valProgress(val.python_enrollment, val.python_expiry) > 0
            ? pythonPurchase
            : nonPurchasePython,
        title: "Python",
        content: calculateExpiryDays(val.python_expiry),
        progress: valProgress(val.python_enrollment, val.python_expiry),
      },
    ],
    learnData: [
      {
        courseTitle: "C",
        lang: "C",
        activeImg: cActive,
        disableImg: cDisable,
        learnCount: val.exercise_c,
      },
      {
        courseTitle: "C++",
        lang: "C++",
        activeImg: cppActive,
        disableImg: cppDisable,
        learnCount: val.exercise_cpp,
      },
      {
        courseTitle: "Java",
        lang: "Java",
        activeImg: javaActive,
        disableImg: javaDisable,
        learnCount: val.exercise_java,
      },
      {
        courseTitle: "Python",
        lang: "Python",
        activeImg: pythonActive,
        disableImg: pythonDisable,
        learnCount: val.exercise_python,
      },
    ],
    medalCardData: [
      {
        img: val.practice_c > 0 ? cprogram : nonactiveC,
        courseTitle: "C",
        practiceCount: val.practice_c,
        path: PATH.PREPARE,
      },
      {
        img: val.practice_cpp > 0 ? cplus : nonactiveCpp,
        courseTitle: "C++",
        practiceCount: val.practice_cpp,
        path: PATH.PREPARE,
      },
      {
        img: val.practice_java > 0 ? java : nonactiveJava,
        courseTitle: "Java",
        practiceCount: val.practice_java,
        path: PATH.PREPARE,
      },
      {
        img: val.practice_python > 0 ? python : nonactivePython,
        courseTitle: "Python",
        practiceCount: val.practice_python,
        path: PATH.PREPARE,
      },
    ],
  };
};

export const debouncedFunc = (func) =>
  debounce(() => {
    func();
  }, 300);

export const calculateTimeDifference = (timestamp) => {
  const currentTime = moment();
  const targetTime = moment(timestamp);
  const diffInMinutes = currentTime.diff(targetTime, "minutes");
  const diffInHours = currentTime.diff(targetTime, "hours");
  const diffInDays = currentTime.diff(targetTime, "days");
  const diffInWeeks = currentTime.diff(targetTime, "weeks");
  const diffInYears = currentTime.diff(targetTime, "years");

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInWeeks < 52) {
    return `${diffInWeeks} weeks ago`;
  } else {
    return `${diffInYears} years ago`;
  }
};
