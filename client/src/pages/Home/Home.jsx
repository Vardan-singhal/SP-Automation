import React from "react";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import ChooseUs from "./ChooseUs";
import Blog from "./Blog";
import Faq from "./Faq";
import Testimonial from "./Testimonial";



const Home = () => {
    return(
        <div>
            <Hero/>
            <AboutUs/>
            <ChooseUs/>
            <Faq/>
            <Blog/>
            <Testimonial/>
            
        </div>
    );
};
export default Home;