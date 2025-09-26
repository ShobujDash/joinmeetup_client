import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, Search } from "lucide-react";
import React from "react";

export function SearchBox({ eventOptions, setFilteredEventId }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || "Filter By EventId"}
          <Search className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search eventId..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Event ID found.</CommandEmpty>
            <CommandGroup>
              {eventOptions.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.id}
                  onSelect={(currentValue) => {
                    const selected = currentValue === value ? "" : currentValue;
                    setValue(option.name); // show short event name
                    setFilteredEventId(selected); // filter by id
                    setOpen(false);
                  }}
                >
                  {option.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
