import * as React from "react";
import imgsun from "../../assets/images/icon/sun.png";
import imgmoon from "../../assets/images/icon/moon-2.png";
import Link from "next/link";
import Image from "next/image";

const DarkMode = () => {
  const [statusDarkMode, setStatusDarkMode] = React.useState<boolean>(false);
  const [nameDarkMode, setNameDarkMode] = React.useState<string>("Dark");
  let clickedClass = "clicked";
  let body: HTMLElement;

  const lightTheme = "light";
  const darkTheme = "is_dark";
  let theme = "";

  React.useEffect(() => {
    body = document?.body;
    if (localStorage) {
      theme = localStorage.getItem("theme") ?? "";
    }
    if (theme === lightTheme || theme === darkTheme) {
      body.classList.add(theme);
    } else {
      body.classList.add(darkTheme);
    }
  });

  const switchTheme = (e: any) => {
    if (theme === darkTheme) {
      body?.classList?.replace(darkTheme, lightTheme);
      e?.target?.classList?.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
      setStatusDarkMode(false);
      setNameDarkMode("Light");
    } else {
      body?.classList?.replace(lightTheme, darkTheme);
      e?.target?.classList?.add(clickedClass);
      localStorage.setItem("theme", "is_dark");
      theme = darkTheme;
      setStatusDarkMode(true);
      setNameDarkMode("Dark");
    }
  };

  return (
    <div className="mode_switcher">
      <h6>
        {nameDarkMode} mode <strong>Available</strong>
      </h6>
      <Link href={"#"} onClick={(e) => switchTheme(e)}>
        <Image src={statusDarkMode ? imgmoon : imgsun} alt="darkmode" />
      </Link>
    </div>
  );
};

export default DarkMode;
