"use client";
import React from "react";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Music,
  Store,
  Apple,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <h3 className="text-xl font-semibold mb-4 md:mb-0">
            Create your own Meetup group.
          </h3>
          <button className="border border-white px-5 py-2 rounded hover:bg-white hover:text-black transition">
            Get Started
          </button>
        </div>

        {/* Main Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Your Account */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Your Account</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#">Sign up</a>
              </li>
              <li>
                <a href="#">Log in</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Discover</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#">Groups</a>
              </li>
              <li>
                <a href="#">Calendar</a>
              </li>
              <li>
                <a href="#">Topics</a>
              </li>
              <li>
                <a href="#">Cities</a>
              </li>
              <li>
                <a href="#">Online Events</a>
              </li>
              <li>
                <a href="#">Local Guides</a>
              </li>
              <li>
                <a href="#">Make Friends</a>
              </li>
            </ul>
          </div>

          {/* Meetup */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Meetup</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Meetup Pro</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Apps</a>
              </li>
              <li>
                <a href="#">Podcast</a>
              </li>
            </ul>
          </div>

          {/* Follow Us + App Links */}
          <div className="space-y-4">
            {/* Social Media Icons */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Follow us</h4>
              <div className="flex space-x-4 text-2xl">
                <a href="#" aria-label="Facebook">
                  <Facebook className="w-6 h-6 hover:text-blue-500" />
                </a>
                <a href="#" aria-label="Twitter">
                  <Twitter className="w-6 h-6 hover:text-sky-400" />
                </a>
                <a href="#" aria-label="YouTube">
                  <Youtube className="w-6 h-6 hover:text-red-500" />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram className="w-6 h-6 hover:text-pink-500" />
                </a>
                <a href="#" aria-label="TikTok">
                  <Music className="w-6 h-6 hover:text-gray-300" />
                </a>
              </div>
            </div>

            {/* App Store Badges */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                <Store className="text-2xl" />
                <span className="text-sm font-medium">Google Play</span>
              </a>

              <a
                href="#"
                className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                <Apple className="text-2xl" />
                <span className="text-sm font-medium">App Store</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 pt-6 border-t border-gray-700">
          <p>© 2025 Meetup</p>
          <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Settings</a>
            <a href="#">Cookie Policy</a>
            <a href="#">License Attribution</a>
            <a href="#">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
