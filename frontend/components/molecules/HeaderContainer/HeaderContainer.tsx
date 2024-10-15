import { HeaderDropdown } from "../HeaderDropdown/HeaderDropdown";
import { HeaderTimer } from "../HeaderTimer/HeaderTimer";


interface Props {
  titlePage: string;
}

export const HeaderContainer= ({titlePage}: Props) => {
	return (
		<div className="flex flex-row items-center justify-between bg-white shadow p-4 px-20 border-2 border-b-8 border-x-base-primary-200">
      <h2 className="text-4xl font-bold text-gray-800">{titlePage}</h2>
        <span className="flex items-center shadow rounded-lg bg-white px-5">
        <HeaderTimer />
        <HeaderDropdown />
        </span>
      </div>
	);
}
