import { Facebook, Instagram } from "lucide-react"; // Importing SVGs from Lucide React

const Footer = () => {
  return (
    <footer className="bg-[#DCE9FD] dark:bg-[#4A4B4A] text-black dark:text-white py-6">
      <div className="container text-sm mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Left Side: Legal Texts */}
        <div className=" text-xs">
          <p>Mentions légales</p>
          <p>Politique de cookies</p>
          <p>Politique de confidentialité</p>
          <p>Condition générale de vente (CGV)</p>
        </div>

        {/* Right Side: Social Icons and URL */}
        <div className="mt-4 md:mt-0 text-right">
          {/* Social Icons */}
          <div className="flex justify-end space-x-3">
            <div className="p-2 rounded-full bg-[#3662C1] dark:bg-gray-800">
              <Facebook className="h-6 w-6 text-white dark:text-white" />
            </div>
            <div className="p-2 rounded-full bg-[#3662C1] dark:bg-gray-800">
              <Instagram className="h-6 w-6 text-white dark:text-white" />
            </div>
          </div>

          {/* URL Text */}
          <p className="mt-2  text-gray-700 dark:text-gray-300">
            <a
              href="https://copyrightfrance.com"
              className="text-[8px] font-bold  underline bg-yellow-400 text-[#3662C1]"
            >
              copyrightFRANCE.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
