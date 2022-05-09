import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "../../../components/card/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import TableModal from "../../../components/modal/table/TableModal";
import { useDispatch } from "react-redux";
import "./ServicePerson.css";

const ServicePerson = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setformData] = useState({
    type: "",
  });
  const [modal, setModal] = useState(false);

  const validationSchema = Yup.object().shape({
    type: Yup.string().required(),
    servicePerson: Yup.string().when("type", {
      is: "individual",
      then: Yup.string().required(),
    }),
    startDate: Yup.string().required(),
    endDate: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const submitHandler = (data) => {
    console.log(data);
    setformData({ ...formData, ...data });
    setModal(true);
  };

  return modal === true ? (
    <TableModal state={modal} setState={setModal} formData={formData} />
  ) : (
    <Container className="report-servicePerson">
      <div className="title">
        <span>Service person report</span>
      </div>
      <Card width="768px" margin="0px auto">
        <form className="form">
          <div className="item">
            <label className="form-label">Select an option</label>
            <div className="radio">
              <input
                type="radio"
                id="all"
                name="all"
                value={formData.type === "all" ? formData.type : "all"}
                checked={formData.type === "all"}
                className={errors.type ? "error-radio" : "radio-input"}
                {...register("type", {
                  onChange: (e) => {
                    const { value } = e.target;

                    setformData({
                      ...formData,
                      type: value,
                    });
                  },
                })}
              />
              <label htmlFor="all" className="form-label" style={{ margin: 0 }}>
                All
              </label>
            </div>
            <div className="radio">
              <input
                type="radio"
                id="individual"
                name="individual"
                value={
                  formData.type === "individual" ? formData.type : "individual"
                }
                checked={formData.type === "individual"}
                className={errors.type ? "error-radio" : "radio-input"}
                {...register("type", {
                  onChange: (e) => {
                    const { value } = e.target;
                    setformData({
                      ...formData,
                      type: value,
                    });
                  },
                })}
              />
              <label
                htmlFor="individual"
                className="form-label"
                style={{ margin: 0 }}
              >
                Individual
              </label>
            </div>
          </div>
          {formData.type === "all" && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="item" style={{ marginRight: "24px" }}>
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  className={
                    errors.startDate ? "invalid-form-control" : "form-control"
                  }
                  name="startDate"
                  {...register("startDate")}
                />
              </div>
              <div className="item">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  className={
                    errors.endDate ? "invalid-form-control" : "form-control"
                  }
                  name="endDate"
                  {...register("endDate")}
                />
              </div>
            </div>
          )}

          {formData.type === "individual" && (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="item" style={{ marginRight: "24px" }}>
                <label className="form-label">Service Persosn Id</label>
                <input
                  type="text"
                  id="servicePerson"
                  className={
                    errors.servicePerson
                      ? "invalid-form-control"
                      : "form-control"
                  }
                  placeholder="Enter service person id"
                  name="servicePerson"
                  {...register("servicePerson")}
                />
              </div>
              <div className="item">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  className={
                    errors.startDate ? "invalid-form-control" : "form-control"
                  }
                  name="startDate"
                  {...register("startDate")}
                />
              </div>
              <div className="item" style={{ marginRight: "24px" }}>
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  className={
                    errors.endDate ? "invalid-form-control" : "form-control"
                  }
                  name="endDate"
                  {...register("endDate")}
                />
              </div>
            </div>
          )}
        </form>
        <div className="action">
          <button onClick={handleSubmit(submitHandler)} className="activeBtn">
            Submit
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default ServicePerson;
