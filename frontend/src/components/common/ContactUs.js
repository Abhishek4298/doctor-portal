import './style.css';
import React, { useState } from 'react';

const ContactUs = () => {
    const [details, setDetails] = useState({ name: "", email: "", msg: "" })

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        alert(JSON.stringify(details));
    }
    return (
        <>
            <div className='container'>
                <div className="contact-container">
                    <div className="left-col">
                        <img className="logo" src="https://www.indonesia.travel/content/dam/indtravelrevamp/en/logo.png" />
                    </div>
                    <div className="right-col">
                        <h1>Contact us</h1>
                        <p className='mt-3 text-justify'><strong>Planning to visit Indonesia soon?</strong><br /> Get insider tips on where to go, things to do and find best deals for your<br /> next adventure.</p>

                        <form onSubmit={submitHandler}>
                            <label className='font-weight-bold' htmlFor="name">Full name</label>
                            <input type="text"
                                id="name"
                                name="name"
                                value={details.name}
                                placeholder="Your Full Name"
                                onChange={onChange}
                                required />
                            <label className='font-weight-bold' htmlFor="email">Email Address</label>
                            <input
                                value={details.email}
                                onChange={onChange}
                                type="email" id="email" name="email" placeholder="Your Email Address" required />
                            <label className='font-weight-bold' htmlFor="message">Message</label>
                            <textarea
                                value={details.msg}
                                onChange={onChange}
                                name="msg"
                                rows="6" placeholder="Your Message" id="message"
                                required />
                            <button type="submit" className="buttonSubmit" id="submit" name="submit">Send</button>
                        </form>
                        <div id="error"></div>
                        <div id="success-msg"></div>
                    </div>
                </div>
            </div>
        </>);
}

export default ContactUs;