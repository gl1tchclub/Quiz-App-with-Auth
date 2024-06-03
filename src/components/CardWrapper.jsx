import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinkButton from "./LinkButton";
import { Children } from "react";

const CardWrapper = (props) => {
  return (
    <Card className="xl:w-1/2 md:w-1/2 shadow-md flex-col">
      <CardHeader className="w-full flex flex-col items-center justify-center">
        <CardTitle className="text-4xl font-semibold">{props.title}</CardTitle>
        <CardDescription className="text-muted-foreground text-md">
          {props.label}
        </CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      <CardFooter>
        <LinkButton
          href={props.href}
          variant={props.variant}
          label={props.hrefLabel}
          buttonLabel={props.buttonLabel}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
