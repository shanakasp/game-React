import { Facebook, Instagram } from "lucide-react"; // Importing SVGs from Lucide React
import linkgif from "../images/copyrightfrance.gif";
const Footer = () => {
  return (
    <footer className="bg-[#DCE9FD] dark:bg-[#4A4B4A] text-black dark:text-white py-6 mt-auto px-4">
      <div className="container mx-auto flex justify-between items-center text-sm">
        {/* Left Side: Legal Texts */}
        <div className="text-xs">
          <p>Mentions légales</p>
          <p>Politique de cookies</p>
          <p>Politique de confidentialité</p>
          <p>Condition générale de vente (CGV)</p>
        </div>

        {/* Right Side: Social Icons and URL */}
        <div className="flex flex-col items-center space-y-3">
          {/* Social Icons */}
          <div className="flex space-x-3">
            <a
              href="https://www.facebook.com/GoalC2/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#3662C1] dark:bg-gray-800"
            >
              <Facebook className="h-6 w-6 text-white dark:text-white" />
            </a>
            <a
              href="https://www.instagram.com/goalc2/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#3662C1] dark:bg-gray-800"
            >
              <Instagram className="h-6 w-6 text-white dark:text-white" />
            </a>
          </div>

          {/* URL GIF */}
          <p className="mt-2">
            <a
              href="https://www.copyrightfrance.com/phtml/copyright.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkgif}
                alt="Copyright France"
                className="h-3.5 w-auto"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
