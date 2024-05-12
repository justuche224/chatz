function layout({ children }) {
  return (
    <>
      <main className="h-screen w-full flex">
        <section className="h-full w-full">{children}</section>
      </main>
    </>
  );
}

export default layout;
