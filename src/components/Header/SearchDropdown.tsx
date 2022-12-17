import { Popover, Transition } from "@headlessui/react";
import Input from "shared/Input/Input";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import PesquisaBarAcompanhantes from "containers/ListingExperiencesPage/PesquisaBarResults";

const SearchDropdown = () => {
  const inputRef = React.createRef<HTMLInputElement>();
  const [searchString, setsearchString] = useState("");
  const navigate = useNavigate();

  const changeStringHandler = (e: any) => {
    console.log("value completo:" + JSON.stringify(e.target.value));
    setsearchString(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    // 👇️ redirect to /contacts
    navigate('/pesquisa/' + "?&search=" + searchString);
  };

  return (
    <React.Fragment>
      <Popover className="relative">
        {({ open }) => {
          if (open) {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          }

          return (
            <>
              <Popover.Button className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                <i className="las la-search"></i>
              </Popover.Button>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute right-0 z-10 w-screen max-w-sm mt-3"
                >
                  <form action="" method="POST" onSubmit={handleSubmit}>
                    <Input
                      ref={inputRef}
                      onChange={changeStringHandler}
                      type="search"
                      value={searchString}
                      placeholder="Escreva o nome da acompanhante.."
                    />
                    <input type="submit" hidden value=""/>
                  </form>
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </React.Fragment>
  );
};

export default SearchDropdown;
