"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";


export function AdminDetailsModal({ open, onClose, admin }) {
  const [isEditing, setIsEditing] = useState(false);
  // For editing form state
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    access: admin?.access || false,
    transactionAccess: admin?.transactionAccess || false,
    paymentAccess: admin?.paymentAccess || false,
    supperAdmin: admin?.supperAdmin || false,
  });

  // Sync formData when admin changes
  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        access: admin.access,
        transactionAccess: admin.transactionAccess,
        paymentAccess: admin.paymentAccess,
        supperAdmin: admin.supperAdmin,
      });
      setIsEditing(false); // reset edit mode on admin change
    }
  }, [admin]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Edit button click
  const handleEditClick = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  // Handle Delete button click
  const handleDeleteClick = () => {
    // Add your delete logic here
    alert("Delete clicked for " + admin.name);
  };

  if (!admin) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Admin Details</DialogTitle>
        </DialogHeader>

        {/* Data container with border */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm border rounded-md p-5 bg-white shadow-sm">
          {/* Name */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Name</p>
            {isEditing ? (
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <p className="text-gray-900 truncate">{formData.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Email</p>
            {isEditing ? (
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <p className="text-gray-900 truncate">{formData.email}</p>
            )}
          </div>

          {/* Access */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Access</p>
            {isEditing ? (
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="access"
                  checked={formData.access}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="select-none">Allowed</span>
              </label>
            ) : (
              <Badge variant={formData.access ? "default" : "destructive"}>
                {formData.access ? "Allowed" : "Blocked"}
              </Badge>
            )}
          </div>

          {/* Transaction Access */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Transaction</p>
            {isEditing ? (
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="transactionAccess"
                  checked={formData.transactionAccess}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="select-none">Yes</span>
              </label>
            ) : (
              <Badge
                variant={formData.transactionAccess ? "default" : "secondary"}
              >
                {formData.transactionAccess ? "Yes" : "No"}
              </Badge>
            )}
          </div>

          {/* Payment Access */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Payment</p>
            {isEditing ? (
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="paymentAccess"
                  checked={formData.paymentAccess}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="select-none">Yes</span>
              </label>
            ) : (
              <Badge variant={formData.paymentAccess ? "default" : "secondary"}>
                {formData.paymentAccess ? "Yes" : "No"}
              </Badge>
            )}
          </div>

          {/* Super Admin */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Super Admin</p>
            {isEditing ? (
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="supperAdmin"
                  checked={formData.supperAdmin}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="select-none">Yes</span>
              </label>
            ) : (
              <Badge variant={formData.supperAdmin ? "default" : "secondary"}>
                {formData.supperAdmin ? "Yes" : "No"}
              </Badge>
            )}
          </div>
        </div>

        {/* Footer buttons */}
        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            variant="destructive"
            onClick={handleDeleteClick}
            className="text-white"
          >
            Delete
          </Button>
          <Button variant="default" onClick={handleEditClick}>
            {isEditing ? "Save" : "Edit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
