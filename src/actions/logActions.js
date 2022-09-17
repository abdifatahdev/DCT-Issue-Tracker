import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS
} from "./types";

// without thunk onject is returned
// Thunk return an function that we have to dispatch
// async call

// export const getLogs = () => {
//   return async dispatch => {
//     setLoading();

//     const res = await fetch("./logs");
//     const data = await res.json();

//     dispatch({
//       type: GET_LOGS,
//       payload: data
//     });
//   };
// };

// Get logs from server
export const getLogs = () => async dispatch => {
  try {
    setLoading();

    const res = await fetch("https://it-logger-api.herokuapp.com/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Add new log
export const addLog = log => async dispatch => {
  try {
    setLoading();

    const res = await fetch("https://it-logger-api.herokuapp.com/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Delete log from server
export const deleteLog = id => async dispatch => {
  try {
    setLoading();

    await fetch(`https://it-logger-api.herokuapp.com/logs/${id}`, {
      method: "DELETE"
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Update log on server
export const updateLog = log => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`https://it-logger-api.herokuapp.com/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Set current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

// Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Set loading to True
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

// Search server logs
export const searchLogs = text => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`https://it-logger-api.herokuapp.com/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};