"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Info } from "lucide-react";

const FormBuilder = ({ onFormChange }) => {
  const [formElements, setFormElements] = useState([]);
  const [label, setLabel] = useState("");
  const [images, setImages] = useState({});
  const [formData, setFormData] = useState({});

  const handleAddElement = (type) => {
    if (!label.trim()) {
      alert("Please enter a label before adding.");
      return;
    }

    const id = Date.now();
    const newElement = { id, type, label };
    setFormElements([...formElements, newElement]);

    setFormData((prev) => ({
      ...prev,
      [label]: type === "checkbox" ? false : "",
    }));

    setLabel("");
  };

  const handleInputChange = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleCheckboxChange = (label) => {
    setFormData((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleImageChange = (e, element) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages((prev) => ({ ...prev, [element.id]: imageUrl }));

      setFormData((prev) => ({
        ...prev,
        [element.label]: file,
      }));
    }
  };

  useEffect(() => {
    onFormChange(formData);
  }, [formData]);

  const renderElement = (element) => {
    const value = formData[element.label] || "";

    return (
      <div className="space-y-2">
        <label className="font-medium text-gray-700">{element.label}</label>

        {element.type === "input" && (
          <Input
            placeholder={element.label}
            value={value}
            onChange={(e) => handleInputChange(element.label, e.target.value)}
          />
        )}

        {element.type === "textarea" && (
          <Textarea
            placeholder={element.label}
            value={value}
            onChange={(e) => handleInputChange(element.label, e.target.value)}
          />
        )}

        {element.type === "checkbox" && (
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleCheckboxChange(element.label)}
            />
            <span>{element.label}</span>
          </div>
        )}

        {element.type === "file" && (
          <div className="flex flex-col gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, element)}
            />
            {images[element.id] && (
              <img
                src={images[element.id]}
                alt="preview"
                className="w-full max-w-[150px] h-auto rounded-md border"
              />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap text-center justify-center">
          <Info className="text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-700">Add Group Info</h1>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="md:w-1/5 w-full bg-gray-100 p-4 rounded-md shadow-sm">
            <h2 className="font-semibold mb-4 text-center">Add Fields</h2>

            <Input
              placeholder="Enter field label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mb-4"
            />

            <div className="flex flex-col gap-2">
              <Button onClick={() => handleAddElement("input")}>Input</Button>
              <Button onClick={() => handleAddElement("textarea")}>
                Textarea
              </Button>
              <Button onClick={() => handleAddElement("checkbox")}>
                Checkbox
              </Button>
              <Button onClick={() => handleAddElement("file")}>
                Image Upload
              </Button>
            </div>
          </div>

          {/* Form Preview */}
          <div className="md:w-4/5 w-full space-y-4">
            <h2 className="text-lg font-semibold text-gray-600">
              Form Preview
            </h2>

            {formElements.length === 0 ? (
              <p className="text-gray-400">
                No fields added yet. Use the sidebar to add.
              </p>
            ) : (
              <>
                {formElements.map((element) => (
                  <div
                    key={element.id}
                    className="bg-white p-3 rounded-md border flex justify-between items-start gap-4"
                  >
                    {/* Render the actual form field */}
                    <div className="flex-1">{renderElement(element)}</div>

                    {/* Delete button */}
                    <button
                      onClick={() => {
                        setFormElements((prev) =>
                          prev.filter((el) => el.id !== element.id)
                        );
                        setFormData((prev) => {
                          const updated = { ...prev };
                          delete updated[element.label];
                          return updated;
                        });
                      }}
                      className="text-red-600 bg-red-100 font-bold px-2 rounded hover:bg-red-200 duration-200"
                      title="Delete Field"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormBuilder;
