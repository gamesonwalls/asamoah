import $ from "jquery";

import { useSelector, useDispatch } from "react-redux";

import { Notification } from "./notifications/DangerNotification";
import { registerUser } from "../redux/slices/registerSlice";

function Registration() {
  const dispatch = useDispatch();

  const saveUser = (e) => {
    e.preventDefault();

    let student_id = $("#student_id").val();
    let name = $("#name").val();
    let gender = $("#gender").val();
    let level = $("#level").val();
    let prgram = $("#program").val();

    let phone = $("#phone").val();

    let obj = {
      student_id: student_id,
      name: name,
      gender: gender,
      level: level,
      program: prgram,
      phone: phone,
    };
    console.log("obj", obj);

    dispatch(registerUser(obj));
  };

  return (
    <div className="container">
      <form onSubmit={saveUser} id="saveForm">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Student Id</label>
              <div className="controls">
                <input
                  type="text"
                  name="text"
                  id="student_id"
                  className="form-control"
                  data-validation-required-message="This field is required"
                  placeholder="First Name"
                  aria-invalid="false"
                  required
                />
                <div className="help-block"></div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>NAME</label>
              <div className="controls">
                <input
                  type="text"
                  name="text"
                  id="name"
                  className="form-control"
                  data-validation-required-message="This field is required"
                  placeholder="First Name"
                  aria-invalid="false"
                  required
                />
                <div className="help-block"></div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <label>GENDER</label>
            <fieldset className="form-group">
              <select className="form-select" id="gender" required>
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </fieldset>
          </div>

          <div className="col-md-6">
            <label>LEVEL</label>
            <fieldset className="form-group">
              <select className="form-select" id="level" required>
                <option value=""></option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
              </select>
            </fieldset>
          </div>

          <div className="col-md-6">
            <label>PROGRAM</label>
            <fieldset className="form-group">
              <select className="form-select" id="program" required>
                <option value="">Select Program</option>
                <option value="College of Health Sciences">
                  College of Health Sciences
                </option>
                <option value="College of Basic and Applied Sciences">
                  College of Basic and Applied Sciences
                </option>
                <option value="College of Humanities">
                  College of Humanities
                </option>
                <option value="College of Education">
                  College of Education
                </option>
                <option value="MSc">MSc</option>
                <option value="MPhil">MPhil</option>
                <option value="MA">MA</option>
                <option value="PhD">PhD</option>
                <option value="DIPLOMA">Diploma</option>
                <option value="CERTIFICATE">Certificate</option>
                <option value="OTHER">Other</option>
              </select>
            </fieldset>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Phone Number</label>
              <div className="controls">
                <input
                  type="text"
                  name="text"
                  id="phone"
                  className="form-control"
                  data-validation-required-message="This field is required"
                  placeholder="First Name"
                  aria-invalid="false"
                  required
                />
                <div className="help-block"></div>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <button
              style={{ width: "100%" }}
              className="btn btn-success"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Registration;
