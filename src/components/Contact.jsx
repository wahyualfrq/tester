import React from "react";
import { motion } from "framer-motion";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 bg-dark/30 p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
            <div>
                <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl font-bold mb-6"
                >
                    Let's Work Together
                </motion.h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Have a project in mind or just want to chat? Feel free to reach out.
                    I'm currently available for freelance projects and open to full-time opportunities.
                </p>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="p-3 bg-white/5 rounded-full"><MdEmail className="text-primary" size={24} /></div>
                        <span>contact@example.com</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                        <div className="p-3 bg-white/5 rounded-full"><MdPhone className="text-primary" size={24} /></div>
                        <span>+62 812 3456 7890</span>
                    </div>
                </div>
            </div>

            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Name" className="bg-dark/50 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-colors" />
                    <input type="email" placeholder="Email" className="bg-dark/50 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-colors" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-dark/50 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-colors" />
                <textarea rows="4" placeholder="Message" className="w-full bg-dark/50 border border-white/10 rounded-xl p-4 focus:border-primary outline-none transition-colors"></textarea>
                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/80 transition-colors shadow-lg shadow-primary/20">
                    Send Message
                </button>
            </form>
        </div>
    </section>
  );
};

export default Contact;
