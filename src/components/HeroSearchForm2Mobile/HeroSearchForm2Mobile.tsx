import { Dialog, Tab, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useState } from "react";
import ButtonSubmit from "./ButtonSubmit";
import CarsSearchForm from "./CarsSearchForm";
import ExperiencesSearchForm from "./ExperiencesSearchForm";
import FlightSearchForm from "./FlightSearchForm";
import StaySearchForm from "./StaySearchForm";
import { useTimeoutFn } from "react-use";
import Select from "shared/Select/Select";

const HeroSearchForm2Mobile = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalSearch, setshowModalSearch] = useState(false);

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogSearch, setShowDialogSearch] = useState(false);
  let [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);
  let [, , resetIsShowingDialogSearch] = useTimeoutFn(() => setShowDialogSearch(true), 1);
  //
  function closeModal() {
    setShowModal(false);
  }
  function closeModalSearch() {
    setshowModalSearch(false);
  }
  function openModalSearch() {
    setshowModalSearch(true);
  }
  function openModal() {
    setShowModal(true);
  }

  const renderButtonOpenModal = () => {
    return (
      <>
        <button
          onClick={openModal}
          className="relative flex items-center w-full  px-4 py-2 pr-11 rounded-full shadow-lg"
        >
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full  dark:text-neutral-300">
            <svg
              height="32px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 32 32"
              width="32px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z"
                fill="white"
              ></path>
            </svg>
          </span>
        </button>

        <span className="absolute left-28 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-6000 dark:text-neutral-300">
          <a>logo</a>
        </span>

        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full dark:text-neutral-300">
        <Select value="PT">
            <option disabled={true} value="PT">
              PT
            </option>
          </Select>
        </span>
      </>
    );
  };

  return (
    <div className="HeroSearchForm2Mobile">
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-max"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  {showDialog && (
                    <Tab.Group manual>
                      <div className="absolute left-4 top-4">
                        <button className="" onClick={closeModal}>
                          <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                        </button>
                      </div>

                      <Tab.List className="pt-12 flex w-full justify-center font-semibold text-sm sm:text-base text-neutral-500 dark:text-neutral-400 space-x-6 sm:space-x-8">
                        {["Acompanhantes"].map((item, index) => (
                          <Tab key={index} as={Fragment}>
                            {({ selected }) => (
                              <div className="relative focus:outline-none focus-visible:ring-0 outline-none select-none">
                                <div
                                  className={`${
                                    selected ? "text-black dark:text-white" : ""
                                  }  `}
                                >
                                  {item}
                                </div>
                                {selected && (
                                  <span className="absolute inset-x-0 top-full border-b-2 border-black dark:border-white"></span>
                                )}
                              </div>
                            )}
                          </Tab>
                        ))}
                      </Tab.List>
                      <div className="flex-1 pt-3 px-1 flex overflow-hidden">
                        <Tab.Panels className="flex-1 overflow-y-auto py-4">
                          <Tab.Panel>
                            <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                              <StaySearchForm />
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </div>
                      <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                        <button
                          type="button"
                          className="underline font-semibold flex-shrink-0"
                          onClick={() => {
                            setShowDialog(false);
                            resetIsShowingDialog();
                          }}
                        >
                          Clear all
                        </button>
                        <ButtonSubmit
                          onClick={() => {
                            closeModal();
                          }}
                        />
                      </div>
                    </Tab.Group>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={showModalSearch} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-max"
          onClose={closeModalSearch}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  {showDialogSearch && (
                    <Tab.Group manual>
                      <div className="absolute left-4 top-4">
                        <button className="" onClick={closeModalSearch}>
                          <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                        </button>
                      </div>

                      <Tab.List className="pt-12 flex w-full justify-center font-semibold text-sm sm:text-base text-neutral-500 dark:text-neutral-400 space-x-6 sm:space-x-8">
                        {["Acompanhantes"].map((item, index) => (
                          <Tab key={index} as={Fragment}>
                            {({ selected }) => (
                              <div className="relative focus:outline-none focus-visible:ring-0 outline-none select-none">
                                <div
                                  className={`${
                                    selected ? "text-black dark:text-white" : ""
                                  }  `}
                                >
                                  Modal Search
                                </div>
                                {selected && (
                                  <span className="absolute inset-x-0 top-full border-b-2 border-black dark:border-white"></span>
                                )}
                              </div>
                            )}
                          </Tab>
                        ))}
                      </Tab.List>
                      <div className="flex-1 pt-3 px-1 flex overflow-hidden">
                        <Tab.Panels className="flex-1 overflow-y-auto py-4">
                          <Tab.Panel>
                            <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                              <StaySearchForm />
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </div>
                      <div className="px-4 py-3 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700 flex justify-between">
                        <button
                          type="button"
                          className="underline font-semibold flex-shrink-0"
                          onClick={() => {
                            setShowDialogSearch(false);
                            resetIsShowingDialogSearch();
                          }}
                        >
                          Clear all
                        </button>
                        <ButtonSubmit
                          onClick={() => {
                            closeModalSearch();
                          }}
                        />
                      </div>
                    </Tab.Group>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default HeroSearchForm2Mobile;
