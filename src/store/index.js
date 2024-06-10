import { configureStore } from "@reduxjs/toolkit";
import subjectReducer from "./features/subject/subjectSlice";
import testReducer from "./features/test/testSlice";

const store = configureStore({
  reducer: {
    subject: subjectReducer,
    test: testReducer,
  },
});

export default store;
