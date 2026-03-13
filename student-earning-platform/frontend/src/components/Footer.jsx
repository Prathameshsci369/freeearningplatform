import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              © 2026 EarnStudent. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-primary text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-primary text-sm">Terms of Service</Link>
            <Link to="/contact" className="text-gray-500 hover:text-primary text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;