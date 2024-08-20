
export default function NotFound() {
    return (
        <div className="w-full h-[calc(100dvh-60px)] bg-gray-800 flex items-center justify-center page_404 py-5">
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <div className="w-full text-center">
                        <div
                            className="four_zero_four_bg h-96 bg-center bg-no-repeat"
                            style={{
                                backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')"
                            }}
                        >
                            <h1 className="text-center text-8xl text-black font-medium">404</h1>
                        </div>

                        <div className="contant_box_404 mt-5 text-white">
                            <h3 className="text-4xl">
                                Lagta hai aap kho gaye hain
                            </h3>

                            <p className="text-lg">Aap jo page dhoondh rahe hain wo available nahi hai!</p>

                            <a href="/" className="link_404 text-white py-2 px-4 bg-green-600 mt-5 inline-block rounded-md font-medium">Ghar Jao</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
