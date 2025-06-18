import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-10 px-4 mt-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
       
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p>Email: contact@gardeninglife.com</p>
          <p>Phone: +880-123-456-7890</p>
          <p>Address: Chattogram, Bangladesh</p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 text-green-200">
            <a href="https://facebook.com" target="blank" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="blank" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="blank" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="https://envelope.com" target="blank" className="hover:text-white">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

    
      <div className="mt-8 text-sm text-center text-green-300">
        © {new Date().getFullYear()} Gardening Life. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
