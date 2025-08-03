function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-100 py-10 mt-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Thông tin website */}
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="text-2xl flex items-center gap-2 font-bold mb-2 text-yellow-400">
            <img src="/logo.svg" alt="Sushi Learning" className="h-8 w-8" />
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Sushi Learning</span>
          </div>
          <div className="text-sm text-gray-400 mb-2">
            Nền tảng học tập hiện đại, uy tín, kết nối tri thức cho mọi người.
          </div>
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Sushi Learning. All rights reserved.
          </div>
        </div>
        {/* Thông tin liên hệ */}
        <div className="flex-1 flex flex-col items-center md:items-end gap-2">
          <div className="text-lg font-semibold mb-2 text-yellow-300">
            Liên hệ
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Facebook:</span>
            <a
              href="https://facebook.com/info.minhdung09.pro/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              facebook.com/sushilearning
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">SĐT:</span>
            <a href="tel:0868298662" className="hover:underline">
              0868298662
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium">Địa chỉ:</span>
            <span>Bắc Từ Liêm - Hà Nội</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
