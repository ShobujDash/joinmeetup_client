import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// Calendar24.jsx
export default function Calendar24({ eventdate, value, onChange, ticket }) {
  // No internal state for date/time
  const date = value ? new Date(value) : undefined;

  return (
    <div className="flex gap-4 my-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date">{eventdate}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button>{date ? date.toLocaleDateString() : "Select date"}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                const newDate = new Date(selectedDate);
                const oldDate = date || new Date();
                newDate.setHours(
                  oldDate.getHours(),
                  oldDate.getMinutes(),
                  oldDate.getSeconds()
                );
                onChange(newDate.toISOString());
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {!ticket && (
        <div className="flex flex-col gap-3">
          <Label>& Time</Label>
          <Input
            type="time"
            step="1"
            value={date ? date.toTimeString().split(" ")[0] : "10:30:00"}
            onChange={(e) => {
              const newDate = date ? new Date(date) : new Date();
              const [hours, minutes, seconds] = e.target.value.split(":");
              newDate.setHours(hours, minutes, seconds || 0);
              onChange(newDate.toISOString());
            }}
          />
        </div>
      )}
    </div>
  );
}
