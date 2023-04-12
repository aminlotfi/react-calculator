import { MainLayout } from "../../Layouts"
import {Calculator} from "../../Templates";

function HomePage() {
  return <MainLayout>
    <h1 className="text-6xl font-bold p-4">Calculator</h1>
    <Calculator />
    <div className="flex items-end justify-center text-xs font-light p-2">
      <span className="mr-2">Copyright © 2023 Mohammad Amin Lotfi.</span>
      <a href="https://github.com/aminlotfi/react-calculator" target="_blank">
        <img className="w-[25px] h-[25px]" src="/github-logo.svg" alt="Github Logo"/>
      </a>
    </div>
  </MainLayout>
}

export default HomePage