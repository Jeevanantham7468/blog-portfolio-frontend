import React, { useEffect, useState } from "react";
import Footer from "./common/Footer";

const emptyForm = { name: "", email: "", message: "" };

function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <div className="py-14">
      <h2 className="text-center text-5xl font-bold mb-10">
        Get In <span className="text-orange-400">Touch</span>
      </h2>

      <div className="max-w-xl mx-auto px-4">
        <p className="text-gray-700 mb-6 text-center">
          Have a project in mind or just want to say hi? Drop a message below.
        </p>

        {sent && (
          <p className="mb-6 px-4 py-3 rounded bg-green-50 border border-green-300 text-green-700 text-sm">
            Thanks! Your message has been sent.
          </p>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="p-2 border rounded"
            rows="5"
            required
          />
          <button
            type="submit"
            className="bg-orange-400 text-white py-2 rounded hover:bg-orange-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
