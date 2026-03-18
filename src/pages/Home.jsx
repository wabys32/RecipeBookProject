export default function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">

                {/* LEFT SIDE - All text */}
                <div className="flex-1 text-center lg:text-left">
                    <h1 className="text-6xl font-bold mb-6">Welcome to Recipe Book!</h1>
                    <p className="text-2xl text-gray-600 dark:text-gray-400 mb-10">
                        Your personal collection of delicious recipes
                    </p>

                    <p className="text-orange-600 dark:text-orange-400 text-xl font-medium">
                        "This recipe book is bloody brilliant!" — Gordon Ramsay
                    </p>
                </div>

                {/* RIGHT SIDE - One Gordon Ramsay image (128×128 px) */}
                <div className="flex-shrink-0">
                    <img
                        src="/Images/GordonRamsay2.png"
                        alt="Gordon Ramsay"
                        className="w-128 h-128 object-cover rounded-3xl"
                    />
                </div>

            </div>
        </div>
    )
}