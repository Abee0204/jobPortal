import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";


const LandingPage = () => {
  return (
    <section className="min-h-screen rounded-[32px] bg-[#F7C57A]">
      <div className="min-h-[calc(100vh-2rem)] rounded-3xl bg-[#F7C57A] px-6 pt-36 pb-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center text-center">

          {/* Logo */}
          <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-md">
            <img src="src\assets\img\heroSectionImg.svg" alt="icon" />
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-black leading-tight text-[#120A2A] md:text-7xl">
            AI Talent Wanted!
            <br />
            Work with the Best
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg text-gray-700 md:text-xl">
            Push the boundaries of AI alongside industry leaders.
            Contact our team and make a real impact.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <NavLink to={"/register"}>
            <Button
              size="lg"
              className="rounded-full bg-[#140B2D] px-8 py-6 text-white hover:bg-[#26154d]"
            >
              Get Started
            </Button>
            </NavLink>

            <NavLink to={"/jobs"}>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-[#140B2D] px-8 py-6 text-[#140B2D] hover:bg-[#140B2D] hover:text-white"
            >
              Discover Careers
            </Button>
            </NavLink>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandingPage;