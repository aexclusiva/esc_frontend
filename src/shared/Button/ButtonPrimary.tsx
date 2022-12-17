import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps {
  whatsapp?: any;
  veranuncio?: any;
  link?: any;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  whatsapp = false,
  veranuncio = false,
  link = '',
  ...args
}) => {
  if (whatsapp) {
    return (
      <Button
      href={link}
        className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 ${className} whatsappbutton`}
        {...args}
      />
    );
  }  else if (veranuncio) {
    return (
      <Button
      href={link}
        className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-20 ${className}`}
        {...args}
      />
    );
  }
  else {
    return (
      <Button
      href={link}
        className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 ${className}`}
        {...args}
      />
    );
  }
};

export default ButtonPrimary;
