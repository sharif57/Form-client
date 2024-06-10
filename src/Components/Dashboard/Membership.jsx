// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckOutForm from "./CheckOutForm";


// const stripePromise = loadStripe('pk_test_51PLdGEI1V2N8WTtNgAru9p0zIeKYGQ0Zym7fAM7IPCDmBXexmlIbFCoSTodjSiTcjeQn2DkQVUs7fWr5q86Uz4XU00Y2cJsHO2')
// const Membership = () => {
//     return (
//         <div>
//             <div className="pt-14 text-center">
//                 <h1 className="text-3xl font-bold">membership</h1>
//             </div>

//             <div>
//                 <Elements stripe={stripePromise}>
//                     <CheckOutForm></CheckOutForm>
//                 </Elements>
//             </div>
//         </div>

        
// };

// export default Membership;

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

// Load Stripe outside of a component’s render to avoid recreating the Stripe object on every render.
const stripePromise = loadStripe('pk_test_51PLdGEI1V2N8WTtNgAru9p0zIeKYGQ0Zym7fAM7IPCDmBXexmlIbFCoSTodjSiTcjeQn2DkQVUs7fWr5q86Uz4XU00Y2cJsHO2');

const Membership = () => {
    return (
        <div>
            {/* Title Section */}
            <div className="pt-14 text-center">
                <h1 className="text-3xl font-bold">Membership</h1>
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
