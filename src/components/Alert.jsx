import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertComponent(props) {
  return (
    <Alert variant={props.var}>
      {props.type == "error" ? (
        <ExclamationTriangleIcon className="h-4 w-4" />
      ) : (
        <RocketIcon className="h-4 w-4" />
      )}
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>
        {props.desc}
      </AlertDescription>
    </Alert>
  );
}
