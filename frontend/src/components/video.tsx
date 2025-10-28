

const Video = () => {
  return (
      <section className="relative z-10 bg-gradient-to-br from-orange-50 via-white to-amber-50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              See it in action
            </h2>
            <p className="text-gray-600 text-lg">
              Watch how easy it is to create your first menu
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              {/* Replace this div with your video */}
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-orange-600 transition-colors">
                  <svg
                    className="w-10 h-10 text-white ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-semibold">
                  Click to watch demo
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Video;
