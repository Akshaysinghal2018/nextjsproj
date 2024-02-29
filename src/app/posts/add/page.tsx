"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { redirect } from "next/navigation";

const Page = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const formData = watch();
  const router = useRouter()
  React.useEffect(() => {
    localStorage.getItem("user") === null && redirect("/")
  }, [])
  const formSubmit = async (data:any) => {
    try {
      const slug = new Date().getTime().toString();
      const blogId: string = slug;
      const path = `/uploads/${slug}.png`;
      const reference = ref(storage, path);

      const promise = uploadBytes(reference, data.image[0], {
        cacheControl: 'max-age=31536000',
        customMetadata: {
          blogId,
        },
      }).then(snapshot => {
        return getDownloadURL(snapshot.ref)
      })
        .then(async (downloadURL) => {
          const createdAt = new Date().getDate();
          await setDoc(doc(db, "blogs", `blogs-${slug}`), { ...data, slug, image: downloadURL, date: createdAt });
          // console.log('Download URL', downloadURL)
        });

      toast.promise(promise, {
        success: `post created succesfully`,
        error: `Error :(`
      });
      // toast.success("post created succesfully");
      router.push('/', { scroll: false })
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap content-center flex">
        <form className="lg:w-1/2 md:w-full sm:w-full lg:ml-auto lg:mr-auto p-5 text-gray border-2 bg-white" onSubmit={handleSubmit(formSubmit)}>
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Add Post
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Feel free to use
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              title
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              id="title"
              name="title"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              sub title
            </label>
            <input
              {...register("sub-title", { required: true })}
              type="text"
              id="sub-title"
              name="sub-title"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              excerpt
            </label>
            <input
              {...register("excerpt", { required: true })}
              type="text"
              id="excerpt"
              name="excerpt"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          {/* <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              slug
            </label>
            <input
              {...register("slug", { required: true })}            
              type="text"
              id="slug"
              name="slug"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div> */}
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Thumbnail
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              id="image"
              name="image"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              content
            </label>
            <textarea
              {...register("content", { required: true })}
              id="content"
              name="content"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Create Post
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Created Post admins.
          </p>
        </form>
      </div>
    </section>
  );
};

export default Page;
