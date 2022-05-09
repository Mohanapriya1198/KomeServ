import { UserAction } from "./UserSlice";
import api from "../../utils/api.config";

export const FetchUserList = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.get("/user-list/?role=customer");
      return res.data;
    };

    try {
      dispatch(
        UserAction.getData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        UserAction.getData({
          status: false,
          data: resData,
        })
      );
    } catch (error) {
      dispatch(
        UserAction.getData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const FetchUserDetails = (id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.get(`/user-list/?role=customer`);
      return res.data;
    };

    try {
      dispatch(
        UserAction.getDetails({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        UserAction.getDetails({
          status: false,
          data: resData,
        })
      );
    } catch (error) {
      dispatch(
        UserAction.getDetails({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const AddUser = (data) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.post("/user/", data);
      return res.data;
    };

    try {
      dispatch(
        UserAction.addData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        UserAction.addData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        UserAction.addData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const AddSubUser = (data, id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.post("/category/?category_id=" + id, data);
      return res.data;
    };

    try {
      dispatch(
        UserAction.addData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        UserAction.addData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        UserAction.addData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const UpdateUser = (data) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.put("/list/", data);
      return res.data;
    };

    try {
      dispatch(
        UserAction.updateData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        UserAction.updateData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        UserAction.updateData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const UpdateSubUser = (data, id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.put("/category/?category_id=" + id, data);
      return res.data;
    };

    try {
      dispatch(
        UserAction.updateData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        UserAction.updateData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        UserAction.updateData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const DeleteUser = (formData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.delete("/user/", {
        data: formData,
      });
      return res.data;
    };

    try {
      dispatch(
        UserAction.deleteData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        UserAction.deleteData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        UserAction.deleteData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const DeleteSubUser = (formdata) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.delete("/user/", { data: formdata });
      return res.data;
    };

    try {
      dispatch(
        UserAction.deleteData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        UserAction.deleteData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        UserAction.deleteData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};
