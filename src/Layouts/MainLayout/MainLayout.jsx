function MainLayout({children}) {
  return <>
    <div className="flex items-center justify-center h-[100vh] w-full p-16 main-gradient">
      {children}
    </div>
  </>
}

export default MainLayout