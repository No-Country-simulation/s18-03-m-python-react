import { HeaderDropdown } from "../HeaderDropdown/HeaderDropdown";
import { HeaderTimer } from "../HeaderTimer/HeaderTimer";


interface Props {
  titlePage: string;
}

export const HeaderContainer= ({titlePage}: Props) => {
	return (
		<div className="flex flex-row w-full items-center justify-between bg-white shadow py-4 px-20 border-2 border-b-8 border-x-base-primary-200 max-lg:px-6">
      <h2 className="text-4xl font-bold text-gray-800 max-md:text-2xl">{titlePage}</h2>
        <span className="flex items-center shadow rounded-lg bg-white px-5 max-lg:px-0" >
        <HeaderTimer />
        <HeaderDropdown />
        </span>
      </div>
	);
}
