import { Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import Link from "next/link"
import { siteData } from "@/data/site-data"
import Image from "next/image";
export function Footer() {
  return (
    <footer id="contact" className="bg-black text-white py-20 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="sm:col-span-2">
            <div className="flex items-center space-x-3 mb-4 md:mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Image src={"/fav.png"} alt="logo" width={90} height={90} />
            </div>
              <div>
                <span className="text-xl md:text-2xl font-bold text-white">{siteData.company.name}</span>
                <div className="text-xs md:text-sm text-gray-400">{siteData.company.tagline}</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 md:mb-8 max-w-md leading-relaxed text-sm md:text-base">{siteData.company.description}</p>
            <div className="flex space-x-3 md:space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg">
                <Linkedin className="h-4 md:h-5 w-4 md:w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg">
                <Instagram className="h-4 md:h-5 w-4 md:w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-lg">
                <Mail className="h-4 md:h-5 w-4 md:w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3">
              {siteData.navigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white">Contact</h3>
            <ul className="space-y-2 md:space-y-3 text-gray-300">
              <li className="flex items-center text-sm md:text-base">
                <Mail className="h-3 md:h-4 w-3 md:w-4 mr-2 md:mr-3 text-gray-400 flex-shrink-0" />
                <span className="break-all">{siteData.company.email}</span>
              </li>
              <li className="flex items-center text-sm md:text-base">
                <Phone className="h-3 md:h-4 w-3 md:w-4 mr-2 md:mr-3 text-gray-400 flex-shrink-0" />
                <span>{siteData.company.phone}</span>
              </li>
              <li className="flex items-center text-sm md:text-base">
                <MapPin className="h-3 md:h-4 w-3 md:w-4 mr-2 md:mr-3 text-gray-400 flex-shrink-0" />
                <span>{siteData.company.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 md:mt-16 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
              &copy; {new Date().getFullYear()} {siteData.company.name}. All rights reserved.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
