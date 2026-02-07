import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const formRef = useRef();
    const [formStatus, setFormStatus] = useState("idle"); // idle, sending, success, error
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        title: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus("sending");

        emailjs.sendForm(
            "service_drlv8ne", // Ganti dengan Service ID dari EmailJS
            "template_elgzppp", // Ganti dengan Template ID dari EmailJS
            formRef.current,
            "nnmrCLnFnlO9phkBh" // Ganti dengan Public Key dari EmailJS
        )
        .then((result) => {
            console.log(result.text);
            setFormStatus("success");
            setFormData({ name: "", email: "", title: "", message: "" });
            setTimeout(() => setFormStatus("idle"), 3000);
        }, (error) => {
            console.log(error.text);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 3000);
        });
    };

  return (
    <section id="contact" className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="grid md:grid-cols-2 gap-12 bg-dark/30 p-10 rounded-3xl border border-white/5 backdrop-blur-sm"
        >
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
            >
                <h2 className="text-4xl font-bold mb-6">
                    Let's Work Together
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Jika Anda memiliki proyek atau ingin berdiskusi terkait kerja sama, silakan hubungi saya. 
                    Saya terbuka untuk proyek freelance maupun posisi full time.
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="p-3 bg-white/5 rounded-full"><MdEmail className="text-primary" size={24} /></div>
                        <span>wahyudialfurqon109@gmail.com</span>
                    </div>
                </div>
            </motion.div>

            <motion.form 
                ref={formRef}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false }}
                className="space-y-4"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name" 
                        required
                        className="bg-dark/50 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-colors" 
                    />
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email" 
                        required
                        className="bg-dark/50 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-colors" 
                    />
                </div>
                <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Subject" 
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-colors" 
                />
                <textarea 
                    rows="4" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message" 
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-colors"
                ></textarea>
                <button 
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/80 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {formStatus === "sending" ? "Sending..." : "Send Message"}
                </button>
                {formStatus === "success" && (
                    <p className="text-green-400 text-sm text-center mt-2">Message sent successfully!</p>
                )}
                {formStatus === "error" && (
                    <p className="text-red-400 text-sm text-center mt-2">Failed to send message. Please try again.</p>
                )}
            </motion.form>
        </motion.div>
    </section>
  );
};

export default Contact;
