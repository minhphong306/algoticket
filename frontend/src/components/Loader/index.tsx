import style from "./loader.module.scss";
export default function Loader() {
  return (
    <div className={style["lds-roller-container"]}>
      <div className={style["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
