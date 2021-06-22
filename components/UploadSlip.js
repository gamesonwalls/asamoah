import React, { useState } from "react";
import { useDispatch } from "react-redux";
import allFormdataInput from "../helpers/formHelper";
import $ from "jquery";
import { uploadPaymentSlip } from "../redux/slices/bookSlice";
import { VerifyUser } from "../redux/slices/registerSlice";

// let formdata = allFormdataInput();

export default function UploadSlip() {
  const dispatch = useDispatch();

  const [imagePreviewUrl, setimagePreviewUrl] = useState("");
  const [image, setImage] = useState(null);

  function handleImageChange(e) {
    e.preventDefault();

    let file = e.target.files[0];
    console.log("files", file);

    // formdata.append("slipImage", file);
    setImage(file);
    let reader = new FileReader();

    reader.onload = (event) => {
      setimagePreviewUrl({ file: reader.result, type: file.type });
    };

    reader.readAsDataURL(file);
  }

  const verifyUserCredential = (e) => {
    e.preventDefault();

    let student_id = $("#student_id").val();
    let obj = {
      student_id: student_id,
    };

    dispatch(VerifyUser(obj))
      .then((response) => {
        console.log("saved service Data.", response);
        // const { student_id } = response;

        // $("#student_id").val(student_id);
        if (response.data.length === 0) {
        } else {
          $("#showVerifyUser").fadeOut(0);
          $("#showImageUpload").fadeIn(100);
        }
      })
      .catch((error) => {
        console.log("Server not found", error);
      });
  };

  const saveSlip = (e) => {
    e.preventDefault();

    let formdata = allFormdataInput();

    let student_id = $("#student_id").val();
    formdata.append("slipImage", image);
    formdata.set("student_id", student_id);

    console.log("image stored", image);

    dispatch(uploadPaymentSlip(formdata))
      .then((response) => {
        console.log("saved service Data.", response);
        // const { student_id } = response;
        if (response.msg === "Image is required") {
        }

        if (
          response.msg === "You have successfully uploaded your payment slip"
        ) {
          $("#showImageUpload").fadeOut(300);

          $("#showVerifyUser")[0].reset();
          $("#showVerifyUser").fadeIn(100);
        }
      })
      .catch((error) => {
        console.log("Server not found", error);
      });
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (
      <img
        src={imagePreviewUrl.file}
        className="rounded mr-75"
        alt="p1"
        height="64"
        width="64"
      />
    );
  } else {
    $imagePreview = (
      <div style={{ justifyContent: "center", textAlign: "center" }}>
        <i
          id="blah"
          className="bi bi-plus"
          height="64"
          width="64"
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: 20,
            fontSize: 48,
          }}
        >
          +
        </i>
      </div>
    );
  }
  return (
    <div className="container">
      <form onSubmit={verifyUserCredential} id="showVerifyUser">
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
                  placeholder="Your Id"
                  aria-invalid="false"
                  required
                />
                <div className="help-block"></div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <button className="btn btn-info" style={{ marginTop: "1.5em" }}>
              Verify
            </button>
          </div>
          <div className="col-md-4"></div>
        </div>
      </form>

      <div
        className="col-md-12"
        style={{ marginTop: 10, display: "none" }}
        id="showImageUpload"
      >
        <div className="row">
          <form onSubmit={saveSlip} id="imageUploadForm">
            <label className="col-md-12">
              Attachment Payment Slip(jpg/jpeg/png/giff)
            </label>
            <div className="col-md-4">
              <label
                htmlFor="select-filesCategory"
                className="btn btn-sm btn-light-primary "
              >
                <div>
                  <div
                    id="gallery"
                    style={{
                      minHeight: 93,
                      width: 100,
                      border: "2px dashed #5A8DEE",
                      backgroundColor: "#F2F4F4",
                    }}
                  >
                    {$imagePreview}
                  </div>
                  <p style={{}}> Click to Upload</p>

                  <input
                    id="select-filesCategory"
                    type="file"
                    onChange={handleImageChange}
                    hidden
                  />
                </div>
              </label>
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-6"></div>

            <div className="col-md-12">
              <button className="btn btn-success">Upload Slip</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
