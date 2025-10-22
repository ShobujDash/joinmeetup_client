import {
  Ban,
  CircleDollarSign,
  MapPin,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import UserProfile from "../../adminComponents/UserProfile";
import CommentForm from "../comments/CommentForm";
import JoinEventButton from "./JoinEventButton";
import ReleventEvent from "./ReleventEvent";
import ZoomLInkClient from "./ZoomLInkClient";

const EventDetails = ({ event }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
        {/* Main Content */}
        <div className="w-full md:w-2/3">
          {/* Banner */}
          {event?.banner && (
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${event?.banner}`}
              alt={event?.eName}
              className="w-full h-auto rounded-md mb-6 object-cover max-h-96 mx-auto"
            />
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ">
            {event?.eName}
          </h1>
          <div className="flex gap-6 items-center overflow-x-auto no-scrollbar py-2">
            {/* Total Seat */}
            <p className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2 text-sm font-medium px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-black transition duration-300 shrink-0 text-center">
              <Users className="w-4 h-4" />
              <span className="flex items-center gap-1">
                {/* mobile এ শুধু 'Total', sm+ এ 'Total Seat' */}
                <span className="sm:inline hidden">Total Seat</span>
                <span className="sm:hidden inline">Total</span>
                <span className="font-semibold">{event?.totalTickets}</span>
              </span>
            </p>

            {/* Seat Booked */}
            <p className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2 text-sm font-medium px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-black transition duration-300 shrink-0 text-center">
              <Users className="w-4 h-4" />
              <span className="flex items-center gap-1">
                {/* mobile এ শুধু 'Booked', sm+ এ 'Seat Booked' */}
                <span className="sm:inline hidden">Seat Booked</span>
                <span className="sm:hidden inline">Booked</span>
                <span className="font-semibold">{event?.totalMember}</span>
              </span>
            </p>

            {/* Online / Offline */}
            <p className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2 text-sm font-medium px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-black transition duration-300 shrink-0 text-center">
              {event?.isOnline ? (
                <Video className="w-4 h-4 text-white" />
              ) : (
                <MapPin className="w-4 h-4 text-red-600" />
              )}
              <span className="font-semibold">
                {event?.isOnline ? "Online" : "Offline"}
              </span>
            </p>

            {/* Refund Policy */}
            <p className="flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2 text-sm font-medium px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-black transition duration-300 shrink-0 text-center">
              {event?.refindPolicy === "no-refund" && (
                <Ban className="w-4 h-4 text-red-300" />
              )}
              {event?.refindPolicy === "partial-refund" && (
                <CircleDollarSign className="w-4 h-4 text-yellow-300" />
              )}
              {event?.refindPolicy === "full-refund" && (
                <Wallet className="w-4 h-4 text-green-300" />
              )}
              <span>
                {event?.refindPolicy
                  ?.split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </p>
          </div>

          {/* Date & Time + Join Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 my-2 text-gray-700 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex items-start justify-start p-2 bg-white rounded-md">
                <strong>Start time:</strong>&nbsp;
                {new Date(event?.eStDateAndTime).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
              <div className="flex items-start justify-start p-2 bg-white rounded-md">
                <strong>End time:</strong>&nbsp;
                {new Date(event?.eEndDateAndTime).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </div>
            </div>
            <JoinEventButton
              startTime={event?.eStDateAndTime}
              endTime={event?.eEndDateAndTime}
              eventId={event?.id}
              eventName={event?.eName}
              eventCreatorId={event?.creator?.id}
            />
          </div>

          {/* Created By */}
          <div className="text-black text-sm pl-2">
            <p>
              <strong> Hosted by:</strong>&nbsp;
              <strong>{event?.hostName}</strong> (
              <Link
                href={`mailto:${event?.creator?.email}`}
                className="underline"
              >
                {event?.creator?.email}
              </Link>
              )
            </p>
          </div>

          {/* Description */}
          <div className="bg-white p-2 md:p-4 rounded-2xl mb-2 mt-1">
            <p className="text-2xl font-bold md:text-3xl mb-3">
              Event Description:
            </p>
            <div
              className="prose max-w-none mx-auto mb-8"
              dangerouslySetInnerHTML={{ __html: event.eDes }}
            ></div>
          </div>

          {/* Other Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 text-gray-800">
            <div className="flex gap-2 bg-white rounded-md p-2 items-center">
              <h3 className="font-semibold mb-1">Event Address:</h3>
              <p>{event?.eAddress || "Online Event"}</p>
            </div>
            <div className="flex gap-2 bg-white rounded-md p-2 items-center">
              <h3 className="font-semibold mb-1">Facebook URL:</h3>
              <a
                href={event?.fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-words"
              >
                {event?.fbUrl}
              </a>
            </div>
            <div className="flex gap-2 bg-white rounded-md p-2 items-center">
              <h3 className="font-semibold mb-1">Refund Policy:</h3>
              <span>
                {event?.refindPolicy
                  ?.split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </div>
            <div className="flex gap-2 bg-white rounded-md p-2 px-2 items-center">
              <h3 className="font-semibold mb-1">Online Event:</h3>
              <p>{event?.isOnline ? "Yes" : "No"}</p>
            </div>
            <ZoomLInkClient
              isOnline={event?.isOnline}
              zoomLink={event?.zoomLink}
              eventId={event?.id}
            />
          </div>

          {event?.speakers && event.speakers.length > 0 && (
            <div className="prose max-w-none border-b border-gray-500 pb-2">
              <h2 className="text-xl font-bold !mb-2">Speakers:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.speakers.map((sp, index) => (
                  <div key={index} className="flex flex-col items-start gap-2">
                    {sp?.image && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${sp?.image}`}
                        alt={sp.name}
                        className="w-16 h-16 rounded-full object-cover self-start"
                      />
                    )}
                    <div className="text-center md:text-left">
                      <p className="font-semibold !m-0 !text-base">
                        {sp?.name}
                      </p>
                      <p className="text-sm text-gray-600 !mt-0">
                        {sp?.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <section className="border-t pt-2">
            <CommentForm eventId={event?.id} />
          </section>
        </div>

        {/* Profile Sidebar */}
        <div className="hidden md:block w-full md:w-1/3">
          <UserProfile creator={event?.creator} />
          <ReleventEvent
            creatorId={event?.creator?.id}
            creatorName={event?.creator?.name}
            eventId={event?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
