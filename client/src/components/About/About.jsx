import './About.css';
import React from 'react';
import { Link } from "react-router-dom";

const About = () => {
    return (
    <div className='about'>
        <Link to='/home' className="BackBtnCreate">Back</Link>
        <div className="about-container">
            <h1 className='title'>About Furry Friends</h1>
            <p className='paragraphs'>
            Furry Friends is a platform dedicated to showcasing various dog breeds. Our mission is to provide
            comprehensive information about different breeds, allowing users to explore and learn more about their
            favorite four-legged companions.
            </p>
            <h2 className='title2'>Features</h2>
            <ul className='unsortedList'>
                <li className='listedList'>Display and filter dog breeds alphabetically, by weight (from highest to lowest), temperament, and origin.</li>
                <li lassName='listedList'>Search for specific dog breeds using the search bar.</li>
                <li lassName='listedList'>Create new dog breeds by following the instructions provided in the form.</li>
            </ul>
            <h2 className='title2'>How to Use</h2>
            <p className='paragraphs'>
            On the homepage, you will find a collection of dog breed cards that can be filtered based on your preferences.
            Use the filter options to sort the breeds or enter a breed name in the search bar to find a specific one.
            </p>
            <p className='paragraphs'>
            If you want to add a new dog breed to our collection, go to the "Create Breed" section and follow the instructions
            provided in the form. Fill in the required information and submit the form to create a new breed entry.
            </p>
            <h2 className='title2'>Enjoy Exploring!</h2>
            <p className='paragraphs'>
            We hope you enjoy using Furry Friends to discover and learn more about the wonderful world of dog breeds.
            If you have any questions or feedback, please don't hesitate to contact us. Happy browsing!
            </p>
        </div>
    </div>
  );
};

export default About;