const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-6 min-h-screen">
      {" "}
      <div className="max-w-sm text-center">
        <div className="grid grid-cols-3 gap-4 pt-16">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-xl font-bold p-2 m-3">{title}</h2>
        <p className="text-sm text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
