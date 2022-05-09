import { CategoryAction } from "./CategorySlice";
import api from "../../utils/api.config";

export const FetchCategoryList = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.get("/category/");
      return res.data;
    };

    try {
      dispatch(
        CategoryAction.getData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        CategoryAction.getData({
          status: false,
          data: resData,
        })
      );
    } catch (error) {
      dispatch(
        CategoryAction.getData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const FetchCategoryDetails = (id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.get(`/api/leads/find/${id}`);
      return res.data;
    };

    try {
      dispatch(
        CategoryAction.getDetails({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        CategoryAction.getDetails({
          status: false,
          data: resData,
        })
      );
    } catch (error) {
      dispatch(
        CategoryAction.getDetails({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const AddCategory = (data) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.post("/category/", data);
      return res.data;
    };

    try {
      dispatch(
        CategoryAction.addData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        CategoryAction.addData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        CategoryAction.addData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const AddSubCategory = (data, id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.post("/category/?category_id=" + id, data);
      return res.data;
    };

    try {
      dispatch(
        CategoryAction.addData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        CategoryAction.addData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        CategoryAction.addData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const UpdateCategory = (data) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.put("/category/", data);
      return res.data;
    };

    try {
      dispatch(
        CategoryAction.updateData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        CategoryAction.updateData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        CategoryAction.updateData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const UpdateSubCategory = (data, id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.put("/category/?category_id=" + id, data);
      return res.data;
    };

    try {
      dispatch(
        CategoryAction.updateData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        CategoryAction.updateData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        CategoryAction.updateData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const DeleteCategory = (formData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.delete("/category/?category=" + true, {
        data: formData,
      });
      return res.data;
    };

    try {
      dispatch(
        CategoryAction.deleteData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        CategoryAction.deleteData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        CategoryAction.deleteData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};

export const DeleteSubCategory = (formdata) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const res = await api.delete("/category/", { data: formdata });
      return res.data;
    };

    try {
      dispatch(
        CategoryAction.deleteData({
          status: true,
        })
      );
      const resData = await sendRequest();
      dispatch(
        CategoryAction.deleteData({
          status: false,
        })
      );
    } catch (error) {
      dispatch(
        CategoryAction.deleteData({
          status: false,
          error: error.response?.data,
        })
      );
    }
  };
};
