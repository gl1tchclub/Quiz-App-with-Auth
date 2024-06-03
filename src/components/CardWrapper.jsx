import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Children } from "react";
import PropTypes from "prop-types";

const CardWrapper = (props) => {
  return (
    <Card className="xl:w-1/4 md:w-1/2 shadow-md">
      <CardHeader className="w-full flex flex-col items-center justify-center">
        <CardTitle className="text-3xl font-semibold">{props.title}</CardTitle>
        <CardDescription className="text-muted-foreground text-md">{props.label}</CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      <CardFooter>
        <Button variant="outline">
          <Link
            to={props.backButtonHref}
            style={{ color: "black", textDecoration: "none" }}
            label={props.backButtonLabel}
          >
            {props.backButtonLabel}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
