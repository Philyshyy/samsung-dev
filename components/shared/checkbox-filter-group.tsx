import React from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";
import { Title } from "./title";
import { ChevronUp } from "lucide-react";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (name: string) => void;
  defoultValue?: string[];
  selected?: Set<string>;
  name?: string;
  className?: string;
}

export const CheckboxFilterGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 4,
  searchInputPlaceholder = "Search...",
  loading,
  onClickCheckbox,
  selected,
  name,
  className,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  if (loading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-4">
          <Title size="sm" text={title} />
          <ChevronUp size={21} className="self-center" />
        </div>
        {...Array(items.length)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-sm" />
          ))}
        {items.length > limit && (
          <Skeleton className="w-20 h-6 mb-4 rounded-sm" />
        )}
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchImput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <Title size="sm" text={title} />
        <ChevronUp size={21} className="self-center" />
      </div>
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={(e) => onChangeSearchImput(e)}
            placeholder={searchInputPlaceholder}
            className="rounded-md border border-foreground h-12 w-full"
          />
        </div>
      )}
      <div className="flex flex-col gap-5 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.text)}
            onCheckedChange={() => onClickCheckbox?.(item.text)}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className="mt-5 text-primary">
          {showAll && <hr className="w-full h-[1px] bg-darkgrey mb-5" />}
          <button onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "- Hide" : "+ Show All"}
          </button>
        </div>
      )}
      <hr className="w-full h-[1px] bg-darkgrey mt-5" />
    </div>
  );
};
