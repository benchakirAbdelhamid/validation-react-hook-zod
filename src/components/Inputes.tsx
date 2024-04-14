import {  UseFormRegisterReturn } from "react-hook-form";
type InputeProps = {
    type:string;
    placeholder:string;
    register:UseFormRegisterReturn<string>;
}
const Inputes = ({ type, placeholder, register }:InputeProps) => {
  return <input type={type} placeholder={placeholder} {...register}/>;
};

export default Inputes;
