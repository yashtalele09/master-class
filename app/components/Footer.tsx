import { HexagonIcon } from "lucide-react";
import { BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

const NAV = {
  Product: ["Features", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers"],
  Legal: ["Privacy", "Terms", "Refund policy"],
};

type FooterProps = {
  data: {
    company_name: string;
    tagline: string;
  };
};

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="border-t bg-black border-gray-200">
      {/* Main */}
      <div className="px-8 py-10 flex items-start justify-between flex-wrap gap-8">
        {/* Brand */}
        <div className="max-w-[260px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
              <HexagonIcon className="text-white" />
            </div>
            <span className="text-[15px] font-medium text-white">
              {data.company_name}
            </span>
          </div>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-5">
            {data.tagline}
          </p>
          <div className="flex gap-2">
            {[BsTwitter, LiaLinkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-[30px] h-[30px] rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        <div className="flex gap-12 flex-wrap">
          {Object.entries(NAV).map(([section, links]) => (
            <div key={section}>
              <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-3">
                {section}
              </p>
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[13px] text-gray-500 hover:text-gray-600 transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 px-8 py-4 flex items-center justify-between flex-wrap gap-3">
        <p className="text-[12px] text-gray-400">
          © {new Date().getFullYear()} {data.company_name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a href="#" className="text-[12px] text-gray-400 hover:text-gray-600">
            Sitemap
          </a>
          <a href="#" className="text-[12px] text-gray-400 hover:text-gray-600">
            Accessibility
          </a>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[12px] text-gray-400">
              All systems normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
