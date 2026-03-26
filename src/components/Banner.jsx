import heroImage from '../assets/hero.png';
import appStore from '../assets/app_store.png';
import playStore from '../assets/google.png';


const Banner = () => {


    return (
        <section className="bg-linear-to-b from-gray-50 to-purple-50/40 py-16 px-4 sm:px-8 lg:px-16">
            <div className=" mx-auto flex flex-col gap-5 items-center text-center">

                {/* Heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-gray-900 mb-5 animate-[fadeUp_0.5s_ease_both]">
                    We Build<br />
                    <span className="bg-linear-to-r from-violet-600 to-gray-900 bg-clip-text text-transparent">
                        Productive
                    </span>{' '}
                    Apps
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-gray-500 max-w-xl leading-relaxed mb-8 animate-[fadeUp_0.5s_0.1s_ease_both]">
                    At HERO.IO, we craft innovative apps designed to make everyday life simpler,
                    smarter, and more exciting. Our goal is to turn your ideas into digital
                    experiences that truly make an impact.
                </p>

                {/* Store buttons */}
                <div className=" flex gap-3 flex-wrap justify-center animate-[fadeUp_0.5s_0.2s_ease_both]">
                
                    <a href="https://play.google.com/store"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-xl"
                    >
                        <img src={playStore} alt="Google Play" className="w-5 h-5" />
                        Google Play
                    </a>

                    <a href="https://apps.apple.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-5 py-3 rounded-xl"
                    >
                        <img src={appStore} alt="App Store" className="w-5 h-5" />
                        App Store
                    </a>
                </div>


                <div className="animate-[fadeUp_0.5s_0.2s_ease_both] w-full max-w-sm lg:max-w-2xl mx-auto">
                    <img
                        src={heroImage}
                        alt="Hero app preview"
                        className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                </div>

            </div>
        </section>
    );
};

export default Banner;