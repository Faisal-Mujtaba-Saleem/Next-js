import { signInAction } from "@/app/actions/authAction"

export default function SignIn() {

    return (
        <div className="container w-full h-full mx-auto py-20 flex flex-col bg-background/100">
            <div className="flex h-full items-center justify-center">
                <div className="w-full max-w-md p-8 border border-violet-100 shadow-lg dark:shadow-md dark:shadow-violet-400 rounded-lg">
                    <main>
                        <h2 className="text-3xl font-bold text-center">Sign In</h2>
                        <div className="flex items-center justify-center mt-6 space-x-4">
                            <form
                                action={signInAction}
                            >
                                <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg shadow-lg">
                                    <button
                                        type="submit"
                                        name="provider"
                                        value="github"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Sign in with GitHub
                                    </button>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
} 