import { UploadCloud, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function SpeakersForm({
  eventData,
  speakerCategories,
  selectedCategory,
  onSpeakersChange,
}) {
  const [speakers, setSpeakers] = useState([
    { name: "", image: null, preview: "", details: "" },
  ]);

  useEffect(() => {
    if (eventData?.speakers && Array.isArray(eventData.speakers)) {
      setSpeakers(
        eventData.speakers.map((sp) => ({
          name: sp.name || "",
          details: sp.details || "",
          preview: sp.image
            ? `${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${sp.image}`
            : "",
          image: null,
        }))
      );
    }
  }, [eventData]);

  useEffect(() => {
    onSpeakersChange(speakers);
  }, [speakers, onSpeakersChange]);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedSpeakers = [...speakers];
      updatedSpeakers[index].image = file;
      updatedSpeakers[index].preview = URL.createObjectURL(file);
      setSpeakers(updatedSpeakers);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedSpeakers = [...speakers];
    updatedSpeakers[index][field] = value;
    setSpeakers(updatedSpeakers);
  };

  const addSpeaker = () => {
    setSpeakers([
      ...speakers,
      { name: "", image: null, preview: "", details: "" },
    ]);
  };

  const removeSpeaker = (index) => {
    if (speakers.length > 1) {
      const updatedSpeakers = speakers.filter((_, i) => i !== index);
      setSpeakers(updatedSpeakers);
    }
  };

  return (
    <>
      {speakerCategories.includes(selectedCategory) && (
        <div className="mb-6 border p-4 rounded-md shadow-sm bg-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Speaker Information</h3>
            <button
              type="button"
              onClick={addSpeaker}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              + Add Speaker
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="mb-6 border p-4 rounded-md shadow-sm bg-white relative"
              >
                {speakers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpeaker(index)}
                    className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-500 rounded text-white"
                  >
                    <X size={20} />
                  </button>
                )}

                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Speaker Name*
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="Enter speaker name"
                    value={speaker.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </div>

                <div className="mb-4 flex flex-col md:flex-row gap-2">
                  <label className="block mb-2 font-medium">
                    Speaker Image*
                  </label>
                  <div
                    className="w-[200px] h-[210px] border-dashed border-2 rounded p-4 text-center cursor-pointer flex flex-col justify-center items-center"
                    onClick={() =>
                      document
                        .getElementById(`speakerImageInput-${index}`)
                        .click()
                    }
                  >
                    {speaker.preview ? (
                      <img
                        src={speaker.preview}
                        alt="Speaker Preview"
                        className="w-[200px] h-[200px] object-cover rounded"
                      />
                    ) : (
                      <>
                        <UploadCloud className="w-8 h-8 text-gray-400" />
                        <span>Click to upload speaker image</span>
                        <span className="text-sm text-gray-500">
                          Recommended: 400x400px (png/jpeg)
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      id={`speakerImageInput-${index}`}
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    Speaker Details*
                  </label>
                  <textarea
                    className="w-full border rounded p-2 min-h-[100px]"
                    placeholder="Enter speaker details"
                    value={speaker.details}
                    onChange={(e) =>
                      handleInputChange(index, "details", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
