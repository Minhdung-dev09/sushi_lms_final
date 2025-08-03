import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

function PaypalPaymentReturnPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        const response = await captureAndFinalizePaymentService(
          paymentId,
          payerId,
          orderId
        );

        if (response?.success) {
          toast({
            title: "Thanh toán thành công!",
            description: "Bạn sẽ được chuyển đến khoá học của mình.",
            status: "success",
          });
          sessionStorage.removeItem("currentOrderId");
          setTimeout(() => {
            window.location.href = "/student-courses";
          }, 1500);
        } else {
          toast({
            title: "Thanh toán thất bại!",
            description: response?.message || "Vui lòng thử lại hoặc liên hệ hỗ trợ.",
            status: "error",
          });
        }
      }

      capturePayment();
    }
  }, [payerId, paymentId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loader2 className="animate-spin text-yellow-400" />
      <p className="text-gray-500">Đang xử lý thanh toán... Vui lòng đợi</p>
    </div>
  );
}

export default PaypalPaymentReturnPage;
