import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
const Footer = () => {
  return (
    <footer className="relative z-10 bg-gray-900 text-gray-300 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="text-3xl font-black text-white mb-4">ScanDine</div>
            <p className="text-gray-400 mb-6">
              Making restaurants smarter, one QR code at a time.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-orange-400 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-3">
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Features
              </li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Pricing
              </li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Demo
              </li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Updates
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                About Us
              </li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Careers
              </li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Blog
              </li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Press Kit
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-3">
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Help Center
              </li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Contact Us
              </li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Privacy Policy
              </li>
              <li className="hover:text-orange-400 cursor-pointer transition-colors">
                Terms of Service
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2025 ScanDine. All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>chhoker.yatinder123@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
