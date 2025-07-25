import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
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
    <Card>
      <CardHeader>
        <CardTitle>Processing payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalPaymentReturnPage;
