import React, { useEffect, useState } from "react";
import authservice from "../appwrite/auth";
import "../App.css";
import service from "../appwrite/config";
import { Input, Button } from ".././componets/index.js";
import { useForm } from "react-hook-form";

function Profile() {
  const [userdata, setuserdata] = useState(null);
  const [fileId, setfileId] = useState(null);

  useEffect(() => {
    const filedata = JSON.parse(window.localStorage.getItem("file"));
    if (filedata !== null) {
      setfileId(filedata);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("file", JSON.stringify(fileId));
  }, [fileId]);

  const { register, handleSubmit } = useForm();

  const submit = async (data) => {
    const file = await service.uploadFile(data.image[0]);
    if (file) {
      setfileId(file.$id);
    }
  };

  const updateprofile = async () => {
    const deletefile = await service.deletefile(fileId);
    if (deletefile) {
      setfileId(null);
    }
  };

  useEffect(() => {
    const infopromise = authservice.getCurrentUser();
    infopromise.then(
      function (res) {
        setuserdata(res);
      },
      function (err) {
        console.log(err);
      }
    );
  });

  return (
    <div className="profileflex h-screen flex items-center justify-evenly">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="w-80 h-80 rounded-full bg-gray-100">
          {fileId ? (
            <img
              src={service.getfilepreview(fileId)}
              className="w-80 h-80 rounded-full bg-gray-100 p-0"
              alt=""
            />
          ) : (
            <div className="mt-20">
              <form onSubmit={handleSubmit(submit)}>
                <Input
                  label="Profile Photo"
                  type="file"
                  className="mb-4"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("image")}
                />
                <Button type="submit">ADD</Button>
              </form>
            </div>
          )}
        </div>
        {fileId && (
          <div className="flex gap-4">
            <Button onClick={updateprofile}>Update</Button>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <div>
          {userdata ? (
            <div className="font-custom1">
              <span className="profileinfo1 text-2xl">
                <span className="profileinfo2 text-blue-900 text-3xl">n</span>
                ame: {userdata.name}
              </span>
              <br />
              <span className="text-2xl">
                <span className="text-blue-900 text-3xl">e</span>mail:{" "}
                {userdata.email}
              </span>
            </div>
          ) : (
            "loading"
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
