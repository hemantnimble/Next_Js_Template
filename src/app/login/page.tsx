"use client"
import Link from "next/link"
import { useForm } from "react-hook-form";
import { ReactNode } from 'react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { login, getUserInfo } from "@/redux/features/user-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";

function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const userData = useAppSelector((state) => state.userReducer.loggedIn)

  async function onSubmit(values: any) {
    try {
      const response = await dispatch(login(values))
      await dispatch(getUserInfo())
      if (response.payload.success) {
        reset()
        router.push('/profile/user')
        toast.success("Logged In successfully")
      } else {
        toast.error(response.payload.message)
      }
    }
    catch (error: any) {
      console.log(error)
      const err = error as { response?: { data?: { error?: string } } };
      const errorMessage = err.response?.data?.error || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  }

  return (
    <>
      <section>
        <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
          <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center" />
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Login to your account
            </h2>
            <Link href="/signup">
              <p className="mt-2 text-center text-sm text-gray-600">
                Dont have an account? Sign Up here
              </p>
            </Link>
            <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input  {...register('email', { required: "email Required...!", pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Invalid e-mail" } })} placeholder="UserName" type="text" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" />
                    {errors.email && <p className='text-sm text-red-600'>{errors.email.message as ReactNode}</p>}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input {...register('password', { required: "Eenter password" })} placeholder="Password" type="password" className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" />
                    {errors.password && <p className='text-sm text-red-600'>{errors.password.message as ReactNode}</p>}

                  </div>
                </div>
                <div>
                  <button className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80" type="submit">
                    Log In
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none" type="button">
                <span className="mr-2 inline-block">
                  <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-500">
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                  </svg>
                </span>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default SignUp