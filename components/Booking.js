import $ from "jquery";

import { useSelector, useDispatch } from "react-redux";

import { Notification } from "./notifications/DangerNotification";
import { addBooking } from "../redux/slices/bookSlice";

import { AuthenticateUser } from "../redux/slices/registerSlice";

import { checkRoomAvailability } from "../redux/slices/roomSlice";

function Booking() {
  const dispatch = useDispatch();

  const saveUser = (e) => {
    e.preventDefault();

    let student_id = $("#student_id").val();
    let name = $("#name").val();
    let gender = $("#gender").val();
    let level = $("#level").val();
    let prgram = $("#program").val();

    let phone = $("#phone").val();
    let block = $("#houseblock").val();
    let room_type = $("#room_type").val();
    let message = $("#message").val();

    var occupants = $("#room_type").children(":selected").attr("id");
    let obj = {
      student_id: student_id,
      name: name,
      gender: gender,
      level: level,
      program: prgram,
      phone: phone,
      block: block,
      type: room_type,
      message: message,
      occupants: occupants,
    };
    console.log("obj", obj);

    dispatch(addBooking(obj))
      .then((response) => {
        console.log("addBooking", response);

        if (response.msg === "You have already booked") {
          $("#saveForm")[0].reset();
        }
        if (response.msg === "Sorry room is full") {
        }

        if (response.msg === "You have successfully booked a room") {
          $("#saveForm")[0].reset();
        }
      })
      .catch((error) => {
        console.log("Server not found", error);
      });
  };

  const authicateUser = (e) => {
    e.preventDefault();

    let student_id = $("#student_id_auth").val();
    let token = $("#token").val();

    let obj = {
      student_id: student_id,
      token: token,
    };

    dispatch(AuthenticateUser(obj))
      .then((response) => {
        console.log("saved service Data.", response);
        const { student_id, name, gender, level, phone, program } = response;

        $("#student_id").val(student_id);
        $("#name").val(name);
        $("#gender").val(gender);
        $("#level").val(level);
        $("#program").val(program);
        $("#phone").val(phone);
      })
      .catch((error) => {
        console.log("Server not found", error);
      });
  };

  const changeRoomType = (e) => {
    let block = $("#houseblock").val();
    let type = e.target.value;

    var occupants = $("#room_type").children(":selected").attr("id");

    console.log("type", type, "occupants", occupants);

    let obj = {
      block: block,
      type: type,
      occupants: occupants,
    };

    console.log("obj", obj);

    if (block !== "") {
      dispatch(checkRoomAvailability(obj))
        .then((response) => {
          console.log("checkRoomAvailability", response);

          if ((response.msg = "Room available")) {
            $("#availability").html(response.msg);
            $("#availability").css("color", "green");
          } else {
            $("#availability").html(response.msg);
            $("#availability").css("color", "red");
          }
        })
        .catch((error) => {
          console.log("Server not found", error);
        });
    }
  };

  return (
    <div className="container">
      <form onSubmit={authicateUser} id="authenticationForm">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Student Id</label>
              <div className="controls">
                <input
                  type="text"
                  name="student_id_auth"
                  id="student_id_auth"
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
            <div className="form-group">
              <label>Token</label>
              <div className="controls">
                <input
                  type="text"
                  name="token"
                  id="token"
                  className="form-control"
                  data-validation-required-message="This field is required"
                  placeholder="Enter Token here"
                  aria-invalid="false"
                  required
                />
                <div className="help-block"></div>
              </div>
            </div>
          </div>

          <button
            style={{ width: "100%" }}
            className="btn btn-info"
            type="submit"
          >
            Authenticate
          </button>
        </div>
      </form>

      <hr className="col-md-12" />

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

          <div className="col-md-6">
            <label>Block</label>
            <fieldset className="form-group">
              <select className="form-select" id="houseblock" required>
                <option value="">Select block</option>

                <option value="MAIN">Main</option>
                <option value="ANNEX A">Annex A</option>
                <option value="ANNEX B">Annex B</option>
              </select>
            </fieldset>
          </div>

          <div className="col-md-6">
            <label>Type</label>
            <fieldset className="form-group">
              <select
                className="form-select"
                id="room_type"
                onChange={changeRoomType}
                required
              >
                <option value="">Select room type</option>
                <option value="ANY">Any</option>
                <option value="4 IN A ROOM" id="8">
                  4 IN A ROOM
                </option>
                <option value="3 IN A ROOM" id="3">
                  3 IN A ROOM
                </option>
                <option value="2 IN A ROOM" id="15">
                  2 IN A ROOM
                </option>
                <option value="SINGLE (BALCONY WITH KITCHENETTE)" id="5">
                  SINGLE (BALCONY WITH KITCHENETTE)
                </option>
                <option
                  value="SINGLE MEDIUM (BALCONY &amp; SHARED KITCHEN)"
                  id="8"
                >
                  SINGLE MEDIUM (BALCONY &amp; SHARED KITCHEN)
                </option>
                <option
                  value="SINGLE MEDIUM (BALCONY WITH KITCHENETTE)"
                  id="12"
                >
                  SINGLE MEDIUM (BALCONY WITH KITCHENETTE)
                </option>
                <option value="SINGLE MEDIUM (NO BALCONY)" id="13">
                  SINGLE MEDIUM (NO BALCONY)
                </option>
                <option value="SINGLE SMALL (NO BALCONY)" id="2">
                  SINGLE SMALL (NO BALCONY)
                </option>
                <option value="3 IN A ROOM (EXTRA INNER ROOM)" id="30">
                  3 IN A ROOM (EXTRA INNER ROOM)
                </option>
              </select>
            </fieldset>
          </div>

          <div id="availability" className="col-md-12"></div>

          <div className="col-md-12">
            <label>Message</label>
            <fieldset className="form-group">
              <textarea
                className="form-control"
                maxLength="500"
                placeholder="500 Characaters"
                style={{ height: 100 }}
                id="message"
              />
            </fieldset>
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

export default Booking;
