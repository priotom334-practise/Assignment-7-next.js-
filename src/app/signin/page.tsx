"use client";

import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

const SignInPage = () => {

    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        console.log(user);

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/",
        });

        if (data) {
            toast.success("Sign In successfull!");
            console.log(data);
        }

        if (error) {
            toast.error("Something went error!");
            console.log(error);
        }
    };

    const handleSocialSignIn = async (provider: "google" | "github") => {
        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (result?.error) {
                const message = (result.error as { message?: string })?.message || "Social login failed";

                if (message.includes("account_not_linked") || message.includes("already linked") || message.includes("already exists")) {
                    toast.error("এই ইমেইলটি আগে থেকেই অন্য লগইন পদ্ধতিতে ব্যবহৃত হয়েছে। অনুগ্রহ করে ইমেইল/পাসওয়ার্ড দিয়ে লগইন করুন।");
                    return;
                }

                toast.error("সোশ্যাল লগইন করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
                return;
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unknown error";

            if (message.includes("account_not_linked") || message.includes("already linked") || message.includes("already exists")) {
                toast.error("এই ইমেইলটি আগে থেকেই অন্য লগইন পদ্ধতিতে ব্যবহৃত হয়েছে। অনুগ্রহ করে ইমেইল/পাসওয়ার্ড দিয়ে লগইন করুন।");
                return;
            }

            toast.error("সোশ্যাল লগইন করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
        }
    };

    const handleGoogleSignIn = async () => {
        await handleSocialSignIn("google");
    };

    const handleGithubSignIn = async () => {
        await handleSocialSignIn("github");
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-[#f3f3f3] px-4 py-10">
            <div className="w-full max-w-lg rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-center text-2xl font-bold text-[#111827]">সাইন ইন</h1>
                <p className="mt-2 mb-5 text-center text-xs text-[#6b7280]">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>

                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#374151]">
                            ইমেইল
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="আপনার ইমেইল"
                            className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
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
                            placeholder="আপনার পাসওয়ার্ড"
                            className="w-full rounded-md border border-[#d1d5db] bg-white px-3 py-3 text-base text-[#111827] outline-none transition focus:border-[#22c55e] focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#2bc06a] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#22a65a]"
                    >
                        সাইন ইন
                    </button>
                </form>

                <div className="mt-5 flex items-center justify-center gap-3 text-xs text-[#6b7280]">
                    <span className="h-px flex-1 bg-[#e5e7eb]" />
                    <span>অথবা</span>
                    <span className="h-px flex-1 bg-[#e5e7eb]" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-md border border-[#d1d5db] bg-white px-3 py-2.5 text-sm font-medium text-[#374151] transition hover:border-[#c6d2c8]"
                    >
                        <span className="font-bold text-[#ea4335]">G</span>
                        <span>Google</span>
                    </button>

                    <button
                        onClick={handleGithubSignIn}
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-md border border-[#d1d5db] bg-white px-3 py-2.5 text-sm font-medium text-[#374151] transition hover:border-[#c6d2c8]"
                    >
                        <span className="text-base font-bold text-[#111827]">◌</span>
                        <span>GitHub</span>
                    </button>
                </div>

                <p className="mt-5 text-center text-sm text-[#6b7280]">
                    নতুন ব্যবহারকারী?{' '}
                    <a href="/signup" className="font-semibold text-[#16a34a] hover:underline">
                        সাইন আপ করুন
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;