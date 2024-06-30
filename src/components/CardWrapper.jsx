/**
 * @file CardWrapper.jsx
 * @module components/CardWrapper
 * @description Component for wrapping content in a styled card with header, content, and optional footer.
 * @author Your Name
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinkButton from "./buttons/LinkButton";

/**
 * Functional component for wrapping content in a styled card with header, content, and optional footer.
 * @param {Object} props - Component props containing box, title, label, button, href, variant, hrefLabel, buttonLabel, and buttonStyle.
 * @returns {JSX.Element} Rendered CardWrapper.
 */
const CardWrapper = (props) => {
  return (
    <Card className={props.box}>
      <CardHeader className="w-full flex flex-col items-center justify-center">
        <CardTitle className="text-4xl font-bold text-pink-500">{props.title}</CardTitle>
        <CardDescription className="text-muted-foreground text-md">
          {props.label}
        </CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      <CardFooter className="max-w-1/2 justify-center">
        {props.button == "true" ? (
          <LinkButton
            href={props.href}
            variant={props.variant}
            label={props.hrefLabel}
            buttonLabel={props.buttonLabel}
            buttonStyle={props.buttonStyle}
          />
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
