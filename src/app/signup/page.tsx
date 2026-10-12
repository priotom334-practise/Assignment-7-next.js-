"use client";
import { authClient } from "@/app/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as
            { name: string; email: string; password: string; confirmPassword: string };

        if (user.password !== user.confirmPassword) {
            toast.error("পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড একই নয়।");
            return;
        }
        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        })

        if (data) {
            console.log(data);
            redirect("/");
        }

        if (error) {
            console.log(error);
        }
    }

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });

    };

    const handleGithubSignIn = async () => {
        await authClient.signIn.social({
            provider: "github",
        });
    }

    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-[#f5f5f5] px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-[#dfe7df] bg-white p-6 shadow-sm sm:p-8">
                <h1 className="mb-6 text-center text-2xl font-bold text-[#111827]">অ্যাকাউন্ট তৈরি</h1>

                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#374151]">
                            নাম
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="আপনার নাম"
                            className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#374151]">
                            ইমেইল
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="আপনার ইমেইল"
                            className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#374151]">
                            পাসওয়ার্ড
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="পাসওয়ার্ড লিখুন"
                            className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#374151]">
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="পাসওয়ার্ড আবার লিখুন"
                            className="w-full rounded-xl border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-xl bg-[#2bc06a] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#22a65a]"
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </form>

                <div className="mt-5 flex items-center justify-center gap-3 text-xs text-[#6b7280]">
                    <span className="h-px flex-1 bg-[#dfe7df]" />
                    <span>অথবা</span>
                    <span className="h-px flex-1 bg-[#dfe7df]" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#d1d5db] bg-white px-3 py-2.5 text-sm font-medium text-[#374151] transition hover:border-[#c6d2c8]"
                    >
                        <span>G</span>
                        <span>Google</span>
                    </button>
                    <button
                        onClick={handleGithubSignIn}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#d1d5db] bg-white px-3 py-2.5 text-sm font-medium text-[#374151] transition hover:border-[#c6d2c8]"
                    >
                        <span>◌</span>
                        <span>GitHub</span>
                    </button>
                </div>

                <p className="mt-5 text-center text-sm text-[#6b7280]">
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <a href="/signin" className="font-semibold text-[#16a34a] hover:underline">
                        লগইন করুন
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;