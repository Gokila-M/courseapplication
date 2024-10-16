const baseUrl = "http://192.168.190.148:5000/api";

/*************************************************************************************** USER API ********************************************************/

// User Registration
export const createUser = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}/user/createUser`, requestOptions);
  return await handleResponse(response);
};

// User Login
export const loginUser = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}/user/loginuser`, requestOptions);
  return await handleResponse(response);
};

// Get All Users
export const getAllUsers = async () => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const response = await fetch(`${baseUrl}getallUsers`, requestOptions);
  return await handleResponse(response);
};

/*************************************************************************************** COURSE API ********************************************************/

// Create Course
export const createCourse = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}createCourse`, requestOptions);
  return await handleResponse(response);
};

// Get All Courses
export const getAllCourses = async () => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const response = await fetch(`${baseUrl}getAllCourses`, requestOptions);
  return await handleResponse(response);
};

// Get Course By ID
export const getCourseById = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const response = await fetch(`${baseUrl}getCousreById/${id}`, requestOptions);
  return await handleResponse(response);
};

// Update Course
export const updateCourseById = async (id, body) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}updateCourseById/${id}`, requestOptions);
  return await handleResponse(response);
};

// Delete Course
export const deleteCourseById = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const response = await fetch(`${baseUrl}deleteCourseById/${id}`, requestOptions);
  return await handleResponse(response);
};

/*************************************************************************************** DISCUSSION API ********************************************************/

// Create Discussion
export const createDiscussion = async (body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}createDiscussion`, requestOptions);
  return await handleResponse(response);
};

// Get All Discussions for a Course
export const getAllDiscussions = async (courseId) => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const response = await fetch(`${baseUrl}getalldiscussion/${courseId}`, requestOptions);
  return await handleResponse(response);
};

// Get Discussion By ID
export const getDiscussionById = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const response = await fetch(`${baseUrl}discussionById/${id}`, requestOptions);
  return await handleResponse(response);
};

// Update Discussion
export const updateDiscussionById = async (id, body) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}updatediscussion/${id}`, requestOptions);
  return await handleResponse(response);
};

// Delete Discussion
export const deleteDiscussionById = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const response = await fetch(`${baseUrl}deletediscussion/${id}`, requestOptions);
  return await handleResponse(response);
};

// Add Comment to Discussion
export const addComment = async (id, body) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(`${baseUrl}${id}/addcomment`, requestOptions);
  return await handleResponse(response);
};

// Like or Unlike Discussion
export const likeOrUnlikeDiscussion = async (id) => {
  const requestOptions = {
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const response = await fetch(`${baseUrl}${id}/likeorunlike`, requestOptions);
  return await handleResponse(response);
};

/*************************************************************************************** Utility Function ********************************************************/

// Utility function to handle the response
const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    return { data, ok: false };
  }
  const data = await response.json();
  return { data, ok: true };
};
