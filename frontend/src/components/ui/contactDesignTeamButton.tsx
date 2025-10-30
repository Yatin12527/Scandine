"use client";

const ContactButton = () => {
  return (
    <button
      onClick={() =>
        window.open(
          "https://mail.google.com/mail/?view=cm&fs=1&to=chhoker.yatinder123@gmail.com",
          "_blank"
        )
      }
      className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
    >
      Contact Design Team
    </button>
  );
};

export default ContactButton;
