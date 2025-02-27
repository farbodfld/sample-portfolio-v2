"use client"; // Required for client-side interactivity

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formspree_url = process.env.FORMSPREE_URL;

    try {
      const response = await axios.post(formspree_url as string, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the submission was successful
      if (response.status === 200) {
        toast.success(
          "Thank you for your message! I will get back to you soon."
        );

        setFormData({
          name: "",
          email: "",
          message: "",
        });

      } else {
        console.error("Error submitting form to Formspree:", response.data);
        toast.error("Failed to submit the form. Please try again later.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error submitting form to Formspree:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      toast.error("Failed to submit the form. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen pt-24 p-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Me</h1>
      {submitted ? (
        <p className="text-green-600 text-center">
          Thank you for your message! I will get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      )}
      <ToastContainer />
    </div>
  );
}
