import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertComponent = (props) => {
  return (
    <Alert className={props.style}>
      {props.type == "error" ? (
        <ExclamationTriangleIcon className="h-4 w-4" />
      ) : (
        <RocketIcon className="h-4 w-4" />
      )}
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>{props.desc}</AlertDescription>
    </Alert>
  );
}

const ErrorAlert = () => {
  return (
    <AlertComponent
      type="error"
      title="Error"
      desc="Unauthorized. Please log in"
      style="border-2 border-pink-700 w-1/3 bg-transparent shadow-xl mt-10 text-pink-800 [&>svg]:text-pink-800 [&>svg]:size-7"
    />
  );
}
export { AlertComponent, ErrorAlert }