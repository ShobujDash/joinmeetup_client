import FilterSidebar from "@/components/mainComponents/events/FilterSidebar";

export const metadata = {
  title: "JoinMeetUpBD all events",
  description: "All Kind of Events here",
};

export default function ProfileLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto flex gap-2 sm:px-2 min-h-screen bg-gradient-to-br from-slate-100 to-white">
      {/* Sidebar */}
      <div className="hidden w-1/6 sm:block sm:border-r">
        <FilterSidebar />
      </div>

      <div className="p-4 w-5/6 sm:p-2">{children}</div>
    </div>
  );
}
