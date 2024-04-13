"use client";

import { Card, CardHeader, CardFooter, CardContent } from "../ui/card";
import BackButton from "./BackButton";
import { Header } from "./Header";

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLable,
  backButtonHref,
  showSocial,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLable}></BackButton>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
