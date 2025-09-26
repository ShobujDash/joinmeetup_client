"use client";

import { Button } from "@/components/ui/button";
import {
  createFormBuilderAPI,
  getFormBuilderAPI,
  updateFormBuilderAPI,
} from "@/service/projectService/formBuilder.service";
import $ from "jquery";
import { useRouter } from "next/navigation";
import { Component, createRef, useEffect, useState } from "react";
import { toast } from "sonner";

// Safe jQuery init (only in browser)
if (typeof window !== "undefined") {
  window.$ = $;
  window.jQuery = $;
  require("jquery-ui-sortable");
  require("formBuilder");
}

// --------------------------------------------
// FormBuilder CLASS Component (safe setup)
// --------------------------------------------
class FormBuilder extends Component {
  fb = createRef();
  initialized = false;

  componentDidMount() {
    if (this.initialized) return;
    this.initialized = true;

    const formBuilder = $(this.fb.current).formBuilder({
      formData: [],
    });

    if (typeof window !== "undefined") {
      window.formBuilderInstance = formBuilder;
    }

    // Optional: set body margin
    document.body.style.margin = "0px";
  }

  render() {
    return <div id="fb-editor" ref={this.fb} />;
  }
}

// --------------------------------------------
// Main Functional Component
// --------------------------------------------
export default function FormBuilderComponent({
  ticketId,
  eventId,
  isEditMode,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!eventId || !ticketId) return;

    let retries = 0;
    const maxRetries = 20;

    const fetchFormData = async () => {
      try {
        const res = await getFormBuilderAPI({ eventId, ticketId });
        const savedData = res?.data?.formData;

        const interval = setInterval(() => {
          if (typeof window !== "undefined" && window.formBuilderInstance) {
            try {
              const jsonData =
                typeof savedData === "string"
                  ? JSON.parse(savedData)
                  : savedData || [];

              window.formBuilderInstance.actions.setData(jsonData);
              clearInterval(interval);
            } catch (err) {
              console.error("Error setting form data:", err);
              clearInterval(interval);
            }
          }

          if (++retries >= maxRetries) {
            clearInterval(interval);
            console.warn("❗ FormBuilder not ready in time.");
          }
        }, 200);
      } catch (error) {
        console.error("❌ Failed to load form data", error);
        toast.error("Failed to load form builder data.");
      }
    };

    fetchFormData();
  }, [eventId, ticketId, isEditMode]);

  const handleAddAttendee = async () => {
    if (typeof window === "undefined" || !window.formBuilderInstance) {
      toast.warning("FormBuilder is not ready.");
      return;
    }

    const formDataJSON = window.formBuilderInstance.actions.getData("json");

    const payload = {
      eventId,
      ticketId,
      formData: JSON.parse(formDataJSON),
    };

    try {
      setLoading(true);
      const res = isEditMode
        ? await updateFormBuilderAPI(payload)
        : await createFormBuilderAPI(payload);
      
      if (res?.success) {
        toast.success(isEditMode ? "✅ Form updated!" : "✅ Form saved!");
        router.push('/dashboard/events')
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error("❌ Error saving form:", error);
      toast.error("Failed to save form data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormBuilder />

      <div className="mt-2 w-full flex justify-center items-center">
        <Button
          onClick={handleAddAttendee}
          className="bg-blue-600 hover:bg-blue-700 duration-300"
          disabled={loading}
        >
          {/* {loading
            ? isEditMode
              ? "Updating..."
              : "Saving..."
            : isEditMode
            ? "Update Attendee"
            : "Add Attendee"} */}
            Save Info
        </Button>
      </div>
    </>
  );
}
