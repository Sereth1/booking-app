import { Carouzela } from "@/components/common/Carouzela";
import IntroHeader from "@/components/common/IntroHeader";
import BookingForm from "@/components/forms/bookingForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (

    <div className="p-10">
      <ToastContainer />
      <IntroHeader />
      <Carouzela />
      <div className="text-center text-4xl">Just a simple booking app using Next.js and SQL for the database.</div>
      <div className="text-center text-2xl">With email message verification and user-friendly features for streamlined bookings.</div>
      <BookingForm />

      <ToastContainer /></div>

  );
}
