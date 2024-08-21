import React, { useCallback } from "react";
import { Button, Input, RTE } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import service from "../../appwrite/config";
import { useSelector } from "react-redux";
import "../../App.css";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userdata = useSelector((state) => state.auth.userdata);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;

      if (file) {
        service.deletefile(post.featuredimage);
      }

      const dbpost = await service.updatepost(post.$id, {
        ...data,
        featuredimage: file ? file.$id : undefined,
      });

      if (dbpost) {
        navigate(`/post/${dbpost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredimage = fileId;
        const dbpost = await service.createpost({
          ...data,
          userId: userdata.$id,
        });

        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(submit)} className="addpost flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
          className="content"
        />
      </div>
      <div className="content1 w-1/3 px-1">
        <Input
          label="FeaturedImage:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getfilepreview(post.featuredimage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <label>
          Status:
          <select className="mb-4" {...register("status", { required: true })}>
            <option value="text">active</option>
            <option value="text">inactive</option>
          </select>
        </label>
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-52 hover:bg-red-600 border-2 border-black rounded-xl "
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
