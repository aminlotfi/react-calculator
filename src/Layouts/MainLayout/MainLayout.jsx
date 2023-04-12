function MainLayout({children}) {
  return <>
    <div className="flex flex-col items-center justify-center w-full p-4 main-gradient">
      {children}
    </div>
  </>
}

export default MainLayout