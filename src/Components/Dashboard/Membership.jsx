

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useEffect } from "react";

const stripePromise = loadStripe('pk_test_51PLdGEI1V2N8WTtNgAru9p0zIeKYGQ0Zym7fAM7IPCDmBXexmlIbFCoSTodjSiTcjeQn2DkQVUs7fWr5q86Uz4XU00Y2cJsHO2');

const Membership = () => {
    useEffect(() => {
        document.title = 'Membership'
    }, [])
    return (
        <div>
            {/* Title Section */}
            <div className="pt-24 text-center">
                <h1 className="text-3xl font-bold">Membership pay $99 </h1>
            </div>

            {/* Stripe Elements Wrapper */}
            <div className="pt-10">
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Membership;
