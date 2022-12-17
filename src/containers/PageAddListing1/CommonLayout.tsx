import { UserContext } from "hooks/UserContext";
import React, { useContext } from "react";
import { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface CommonLayoutProps {
  index: string;
  nextHref?: string;
  backtHref?: string;
  nextBtnText?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const CommonLayout: FC<CommonLayoutProps> = ({
  index = "00",
  children,
  nextHref,
  nextBtnText,
  backtHref,
  onClick,
}) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
      data-nc-id="PageAddListing1"
    >
      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 08
          </span>
        </div>

        {/* --------------------- */}
        <div className="listingSection__wrap ">{children}</div>

        {/* --------------------- */}
        <div className="flex justify-end space-x-5">
          <ButtonSecondary href={backtHref} >Voltar atrás</ButtonSecondary>
          <ButtonPrimary
            href={nextHref}
            onClick={onClick}
          >
            {nextBtnText || "Continuar"}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
