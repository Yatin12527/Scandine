import React from "react";
import QRCode from "react-qr-code";
import { MdClose, MdDownload, MdShare } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toPng } from "html-to-image";

interface QRCodeModalProps {
  url: string;
  menuTitle: string;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  url,
  menuTitle,
  onClose,
}) => {
  const downloadQRCode = async () => {
    const node = document.getElementById("qr-modal-content");
    if (!node) return;

    try {
      const dataUrl = await toPng(node, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `${menuTitle.replace(/\s+/g, "_")}_QR.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const shareQRCode = async () => {
    const node = document.getElementById("qr-modal-content");
    if (!node) return;

    try {
      const dataUrl = await toPng(node, { cacheBust: true });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File(
        [blob],
        `${menuTitle.replace(/\s+/g, "_")}_QR.png`,
        {
          type: "image/png",
        }
      );

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: `${menuTitle} - Menu`,
          text: "Check out our menu!",
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `${menuTitle} - Menu`,
          text: "Check out our menu!",
          url,
        });
      } else {
        downloadQRCode();
      }
    } catch (err) {
      console.error("Share failed:", err);
      downloadQRCode();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-auto shadow-2xl">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src="/logo2.png"
              alt="Scan Dine Logo"
              className="w-20 h-16 object-contain"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Scan Dine
              </h2>
              <p className="text-sm sm:text-md text-gray-500">
                QR Menu in seconds
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            aria-label="Close modal"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center mb-8 bg-white">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl shadow-inner mb-4">
            <div
              id="qr-modal-content"
              className="bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="flex flex-col items-center">
                <QRCode
                  id="qr-code"
                  size={200}
                  value={url}
                  viewBox="0 0 256 256"
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                  }}
                  fgColor="#1F2937"
                  bgColor="#FFFFFF"
                />
                <p className="text-xs text-gray-500 mt-2">
                  powered by scandine
                </p>
              </div>
            </div>
          </div>

          {/* Menu Title */}
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 via-red-600 to-gray-800 bg-clip-text text-transparent mb-2">
            {menuTitle}
          </h3>
          <p className="text-sm text-gray-500 text-center">
            Scan this QR code to view the menu
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={downloadQRCode}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
          >
            <MdDownload size={20} />
            Download QR Code
          </button>

          <button
            onClick={shareQRCode}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
          >
            <MdShare size={20} />
            Share Menu Link
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
          >
            <RiArrowGoBackFill size={20} />
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
