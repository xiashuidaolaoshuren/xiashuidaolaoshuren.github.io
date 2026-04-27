export function Hero() {
  return (
    <section className="py-10 text-center">
      <h1 className="text-4xl font-bold mb-4">
        <span className="inline-block bg-linear-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
          Hi, Nice to meet you!
        </span>{" "}
        <span className="text-foreground" aria-hidden>
          😊
        </span>
      </h1>
      <p className="text-xl text-muted-foreground">
        AI Student @{" "}
        <span className="font-medium text-primary">CUHK</span>
        {" "}| Computer Vision & LLM Enthusiast
      </p>
    </section>
  );
}
