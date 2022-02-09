import { TrashIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";

import $ from "jquery";
import { EyeIcon } from "@heroicons/react/outline";

import { message, Image, Modal } from "antd";
import { useDispatch } from "react-redux";
import { saveRestaurantQRData } from "../../redux/slices/globalSlice";

function generateqr() {
  const [looperLengthNew, setlooperLengthNew] = useState(1);
  const [LineUI, setLineUI] = useState([]);

  const dispatch = useDispatch();

  const [isModalVisibleImage, setisModalVisibleImage] = useState(false);

  const [imageAttachments, setimageAttachments] = useState([]);
  const [imagePreviews, setimagePreviews] = useState([]);

  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [coverImage, setCoverImage] = useState("");

  function saveData(e) {
    e.preventDefault();

    let allimages;
    let coverImageDt = false;
    let arraylength = looperLengthNew;

    let dataArray = [];
    dataArray.length = 0;

    if (coverImageDt === "") {
      allimages = [...imageAttachments];
    } else {
      allimages = [coverImage, ...imageAttachments];
      coverImageDt = true;
    }

    console.log("allimages", allimages);
    let formdata = new FormData();
    formdata.set("menu_name", $("#menu_name").val());
    formdata.set("hasCoverImage", coverImageDt);

    // for (let image in allimages) {
    //   formdata.append("files", image);
    // }

    for (let index = 0; index < allimages.length; index++) {
      formdata.append("files", allimages[index]);
    }

    for (var i = 0; i <= arraylength; i++) {
      let item_name = $("#item_name" + i).val();
      let description = $("#description" + i).val();
      let price = $("#price" + i).val();

      var obj = {
        item_name: item_name,
        description: description,
        price: price,
      };

      dataArray.push(obj);

      if (arraylength - 1 === i) {
        formdata.set("items", JSON.stringify(dataArray));
        dispatch(saveRestaurantQRData(formdata));
      }
    }
  }

  function handleCoverImage(e) {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      let reader = new FileReader();
      reader.onload = (event) => {
        setCoverImagePreview(reader.result);
        setCoverImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("only Images are supported here");
    }
  }

  function handleImage(e, index) {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      // formdata.append("imagefiles", file);

      let reader = new FileReader();

      console.log("files 1", file);

      reader.onload = (event) => {
        console.log("indexer", indexer);
        let indexer = imageAttachments.findIndex((r, i) => i === index);

        if (indexer >= 0) {
          imageAttachments[index] = file;
          imagePreviews[index] = reader.result;

          $("#imagepreview" + index).attr("src", reader.result);

          setimageAttachments(imageAttachments);
          setimagePreviews(imagePreviews);
          console.log("#imagepreview" + index);
        } else {
          let concatedImgat = imageAttachments.concat(file);
          let concatedImgpv = imagePreviews.concat(reader.result);

          $("#imagepreview" + index).attr("src", reader.result);
          console.log("#imagepreview" + index);
          setimageAttachments(concatedImgat);
          setimagePreviews(concatedImgpv);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("only Images are supported here");
    }
  }

  function viewImage(index) {
    let imageUrl = $("#imagepreview" + index).attr("src");

    setTimeout(() => {
      $("#tagImage").attr("src", imageUrl);
    }, 200);

    handleShowImageView();
  }

  function addLineMain(e) {
    e.preventDefault();
    let index = looperLengthNew;

    console.log("index for add", index);

    console.log("addLineMain index", index);

    let item_name = "item_name" + index;
    let description = "description" + index;
    let price = "price" + index;
    let image = "image" + index;
    let imagepreview = "imagepreview" + index;

    let area = "col-md-12" + "cD" + index;

    let selected = "insider" + index;

    let mms = (
      <div className="row" id={area} key={selected}>
        <div className="col-md-3">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700  mb-1">
              Item Name
            </label>

            <input
              type="text"
              required
              id={item_name}
              className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
            />
            <div></div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
              style={{ height: "36px" }}
              type="text"
              id={description}
            />
          </div>
        </div>

        <div className="col-md-2">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Price ¢
            </label>
            <input
              type="number"
              min="0"
              step={0.01}
              defaultValue="0"
              required
              id={price}
              className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
            />
          </div>
        </div>

        {
          //   <div className="col-md-2">
          //   <div className="form-group">
          //     <label className="block text-sm font-medium text-gray-700">
          //       Image
          //     </label>
          //     <img src="/assets/img/pic_image.png" id={imagepreview} />
          //     <input
          //       type="file"
          //       required
          //       id={image}
          //       className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
          //       onChange={(e) => handleImage(e, index)}
          //     />
          //   </div>
          // </div>
        }

        <div className="col-md-2">
          <div className="flex items-center">
            <div style={{ marginTop: 10 }}>
              <label className="border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <img
                  src="/assets/img/pic_image3.png"
                  id={imagepreview}
                  alt=""
                  className="img responsive center-block "
                  style={{
                    border: "2px solid #f5f5f5",
                    marginTop: "-11%%",
                    width: 58,
                    height: 56,
                  }}
                />

                <input
                  required
                  onChange={(e) => handleImage(e, index)}
                  type="file"
                  className="opacity-0"
                  style={{ display: "none" }}
                />
              </label>
            </div>

            <span className="ml-2">
              <EyeIcon width={20} onClick={() => viewImage(index)} />
            </span>
          </div>
        </div>

        <div className="col-md-1">
          <button
            value={index}
            className="form-control height mt-4 btn btn-danger text-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => remove5(e, index)}
          >
            <TrashIcon className="w-5 h-5 mr-auto ml-auto" />
          </button>
        </div>
      </div>
    );

    const documents = LineUI.concat(mms);

    setlooperLengthNew(looperLengthNew + 1);
    setLineUI(documents);
  }

  function remove5(e, index) {
    e.preventDefault();
    console.log("Line ui", LineUI.length);
    console.log("remove5", index);

    if (LineUI.length >= 0) {
      if (index < 1) {
        message.warning("This field cannot be erased", 2);
      } else {
        let leftAllinput = LineUI.splice(index, 1);
        console.log("leftAllinput 5", LineUI);

        let id = "#col-md-12cD" + index;
        console.log("id", id);
        // alert(id)
        $(id).remove();

        imageAttachments.splice(index, 1);

        setimageAttachments(imageAttachments);

        if (index > 1) {
          setlooperLengthNew(looperLengthNew - 1);
        } else {
        }
      }
    } else {
      message.warning("This field cannot be erased", 2);
    }
  }

  function handleCancelImageView() {
    setisModalVisibleImage(false);
  }

  function handleShowImageView() {
    setisModalVisibleImage(true);
  }

  let $imagePreview = null;
  if (coverImagePreview) {
    $imagePreview = (
      <img
        src={coverImagePreview}
        alt=""
        className="object-cover m-0 "
        style={{
          border: "2px solid #f5f5f5",

          // width: 200,
          height: 120,
        }}
      />
    );
  } else {
    $imagePreview = (
      <div className="flex flex-col items-center justify-center pt-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
          Select cover photo
        </p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="shadow overflow-hidden sm:rounded-md p-3 bg-white">
        <nav
          className="flex py-2 px-5 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="mr-2 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </a>
            </li>

            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500">
                  Generate QR
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <hr />

        <form onSubmit={saveData}>
          <div className="row mb-3 p-3">
            <div className="col-md-12">
              <div className="d-flex justify-end mt-2">
                {" "}
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-lg">
                  Create QR
                </button>
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-700">
                  Menu Name
                </label>
                <input
                  type="text"
                  id="menu_name"
                  required
                  className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="col-md-12  mt-2">
              <div className="">
                <div className="">
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Image
                  </label>
                  <div className="flex items-center  w-full">
                    <label className="overflow-hidden flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                      {$imagePreview}
                      <input
                        type="file"
                        className="opacity-0"
                        onChange={handleCoverImage}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12cD1  mt-3">
              <div className="row" style={{ padding: 0, alignItems: "center" }}>
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700  mb-1">
                      Item Name
                    </label>

                    <input
                      type="text"
                      required
                      id="item_name0"
                      className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                    />
                    <div></div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      required
                      className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                      style={{ height: "36px" }}
                      type="text"
                      id="description0"
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700">
                      Price ¢
                    </label>
                    <input
                      type="number"
                      min="0"
                      step={0.01}
                      defaultValue="0"
                      required
                      id="price0"
                      className="form-control mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-solid border-1 border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="flex items-center">
                    <div style={{ marginTop: 10 }}>
                      <label className="border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <img
                          src="/assets/img/pic_image3.png"
                          id="imagepreview0"
                          alt=""
                          className="img responsive center-block "
                          style={{
                            border: "2px solid #f5f5f5",
                            marginTop: "-11%%",
                            width: 58,
                            height: 56,
                          }}
                        />

                        <input
                          onChange={(e) => handleImage(e, 0)}
                          type="file"
                          className="opacity-0"
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>

                    <span className="ml-2">
                      <EyeIcon width={20} onClick={() => viewImage(0)} />
                    </span>
                  </div>
                </div>

                <div className="col-md-1">
                  <button
                    value="0"
                    className="form-control height mt-4 btn btn-danger text-center border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={(e) => remove5(e, 0)}
                  >
                    <TrashIcon className="w-5 h-5 mr-auto ml-auto" />
                  </button>
                </div>
              </div>

              {LineUI}
            </div>

            <div className="col-md-12 mt-2">
              <div className="d-flex justify-start mt-2">
                {" "}
                <button
                  className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-black bg-gray-100 border border-transparent active:bg-gray-100 hover:bg-gray-100 focus:ring focus:ring-purple-300"
                  style={{ padding: 5 }}
                  onClick={(e) => {
                    addLineMain(e);
                  }}
                >
                  + Add Item
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Modal
        title="View Image"
        visible={isModalVisibleImage}
        onOk={handleShowImageView}
        onCancel={handleCancelImageView}
        maskClosable={false}
        width="80%"
        footer={null}
      >
        <img src="" id="tagImage" className="w-full h-full" />
      </Modal>
    </div>
  );
}

export default generateqr;
