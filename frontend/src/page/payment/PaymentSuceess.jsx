import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../../store/thunk/PaymentThunk";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      toast.error("Payment session not found");
      navigate("/");
      return;
    }

    const verify = async () => {
      const result = await dispatch(verifyPayment(sessionId));

      if (verifyPayment.fulfilled.match(result)) {
        toast.success("Booking confirmed");
        navigate("/my-booking");
      }
    };

    verify();
  }, [dispatch, navigate, searchParams]);

  return <h1 style={{ textAlign: "center" }}>Verifying payment...</h1>;
};

export default PaymentSuccess;