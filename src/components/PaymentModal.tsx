import React, { useState } from "react";

interface PaymentModalProps {
  onClose: () => void;
  onConfirm: (file: File) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, onConfirm }) => {
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);
  const [previewSlip, setPreviewSlip] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setError("Invalid file type. Please upload PNG or JPG/JPEG.");
        setPaymentSlip(null);
        setPreviewSlip(null);
        return;
      }
      setPaymentSlip(file);
      setPreviewSlip(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleConfirm = () => {
    if (paymentSlip) onConfirm(paymentSlip);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
      <div className="relative bg-white w-full max-w-lg rounded-xl p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-gray-800 transition"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-center text-blue-900 font-bold text-2xl mb-5">
          Bank Payment Details
        </h2>

        {/* Bank Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center mb-6 gap-4">
          <div className="w-full md:w-1/4 flex justify-center">
            {/* Placeholder for bank logo */}
            <div className="w-20 h-20 bg-blue-50 flex items-center justify-center rounded-full">
              <span className="text-3xl text-blue-900 font-bold">🏦</span>
            </div>
          </div>
          <div className="text-gray-700 text-sm md:text-base space-y-1 md:ml-4">
            <p><b>Bank Name:</b> People's Bank</p>
            <p><b>Account Name:</b> Travel Lanka Pvt Ltd</p>
            <p><b>Account Number:</b> 123-456-789</p>
            <p><b>Branch:</b> Colombo Main Branch</p>
            <p><b>SWIFT Code:</b> PSBLKLXXXX</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-4 text-gray-600 text-sm">
          <p>Please upload a clear photo of your bank payment slip. Make sure the following is visible:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Bank name and logo</li>
            <li>Account number and account holder name</li>
            <li>Transaction date and amount</li>
          </ul>
        </div>

        {/* Upload Section */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">Upload Payment Slip</label>
          <label
            htmlFor="slip-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-blue-900 rounded-lg p-6 bg-blue-50 hover:bg-blue-100 cursor-pointer transition w-full h-56"
          >
            {!previewSlip ? (
              <>
                <span className="text-5xl text-blue-900">📎</span>
                <span className="mt-2 text-blue-900 font-medium text-center">
                  Click to upload or drag and drop
                </span>
                <span className="text-gray-500 text-xs mt-1">
                  PNG, JPG, JPEG only
                </span>
              </>
            ) : (
              <img
                src={previewSlip}
                alt="Payment Slip Preview"
                className="w-full h-full object-contain rounded-md"
              />
            )}
            <input
              id="slip-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!paymentSlip || !!error}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            paymentSlip && !error
              ? "bg-blue-900 text-white hover:bg-blue-800"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
