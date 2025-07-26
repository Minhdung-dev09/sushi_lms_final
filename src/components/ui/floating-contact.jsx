import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  MessageOutlined,
  FacebookOutlined,
  InstagramOutlined,
  CloseOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const socialLinks = [
    {
      name: "Zalo",
      icon: <MessageOutlined className="text-xl" />,
      color: "bg-blue-500 hover:bg-blue-600",
      link: "https://zalo.me/0868298662",
    },
    {
      name: "Facebook",
      icon: <FacebookOutlined className="text-xl" />,
      color: "bg-blue-600 hover:bg-blue-700",
      link: "https://www.facebook.com/info.minhdung09.pro/",
    },
    {
      name: "Instagram",
      icon: <InstagramOutlined className="text-xl" />,
      color:
        "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      link: "https://instagram.com/minhdung03_",
    },
  ];

  // Auto-hide tooltip after 3 seconds
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  // Show tooltip on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSocialClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Social Media Buttons */}
      {isOpen && (
        <div className="mb-4 space-y-3">
          {socialLinks.map((social, index) => (
            <div
              key={social.name}
              className="animate-in slide-in-from-bottom-2 duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Button
                size="lg"
                className={`w-14 h-14 rounded-full shadow-lg ${social.color} text-white border-0 hover:scale-110 transition-all duration-200`}
                onClick={() => handleSocialClick(social.link)}
                title={social.name}
              >
                {social.icon}
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main Contact Button */}
      <Button
        size="lg"
        className={`w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600 rotate-45"
            : "bg-pink-500  hover:bg-pink-600"
        } text-white border-0 hover:scale-110`}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        title={isOpen ? "Đóng" : "Liên hệ"}
      >
        {isOpen ? (
          <CloseOutlined className="text-xl" />
        ) : (
          <MessageCircle className="text-xl" />
        )}
        <PhoneOutlined />
      </Button>

      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap animate-in slide-in-from-right-2 duration-200">
          Liên hệ với chúng tôi
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      )}
    </div>
  );
}

export default FloatingContact;
